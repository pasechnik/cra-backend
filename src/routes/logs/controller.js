import uuid from 'uuid'
import debug from 'debug'
import { obj } from 'the-utils'
import { cast, patch, output } from '../../models/log'
import { cast as settingsCast } from '../../models/settings'
import {
  getCtxParam,
  runFunction,
  runOutput,
} from '../../modules/context'
import { mCheckTable, dbGetAll, dbCreate, dbGetOne, dbUpdate, dbPatch, dbDelete, dbClear } from '../../modules/db'

import { runCheckTable, getEngine } from './module'

const error = debug('app:logs:controller:error')
const log = debug('app:logs:controller')
const routeKey = 'log'
const routeKeys = `${routeKey}s`

export const checkTable = () => runFunction(routeKey, runCheckTable)
export const getLogs = () => runOutput(routeKeys, dbGetAll(getEngine, output))
export const getLog = () => runOutput(routeKey, dbGetOne(getEngine, cast, output))
export const createLog = () => runOutput(routeKey, dbCreate(getEngine, cast, output))
export const updateLog = () => runOutput(routeKey, dbUpdate(getEngine, cast, output))
export const patchLog = () => runOutput(routeKey, dbPatch(getEngine, cast, output, patch))
export const deleteLog = () => runOutput(routeKey, dbDelete(getEngine, cast, output))
export const clearData = () => runOutput(routeKeys, dbClear(getEngine, cast))

export const deleteLogs = async (ctx, next) => {
  log('deleting logs entries from db')
  try {
    await mCheckTable('logs')
    const e = getEngine('logs')
    await e.clear()
    ctx.status = 200
    ctx.body = {
      ...ctx.body,
      success: true,
    }
  } catch (err) {
    ctx.throw(422, err.message)
  }
  if (next) {
    return next()
  }
  return ctx
}

export const clearLogsOutdated = async (ctx, next) => {
  try {
    log('deleting logs entries from db')
    await mCheckTable('logs')
    const e = getEngine('logs')
    // const time = parseInt(ctx.request.body.time, 10)

    const getBodyParam = getCtxParam(ctx, 'body')
    const settings = getBodyParam('settings', settingsCast({}))

    const time = (new Date()).getTime()
    const logs = (await e.getAll()).map(t => output(t))

    if (settings.clearLogsInterval !== 0) {
      await Promise.all(logs.filter(t => t.date < time - settings.clearLogsInterval)
        .map(async t => e.delete(t.id)), )
    }
    ctx.body = {
      ...ctx.body,
      cleared: settings.clearLogsInterval !== 0,
    }
  } catch (err) {
    ctx.throw(422, err.message)
  }

  if (next) {
    return next()
  }
  return ctx
}

export const deleteLogsByTime = async (ctx, next) => {
  try {
    // log(logs.filter(t => t.date < time).map(async t => e.delete(t.id)))
    log('deleting logs entries from db')
    await mCheckTable('logs')
    const e = getEngine('logs')
    const time = parseInt(ctx.request.body.time, 10)
    const logs = obj.deepGet(ctx, ['body', 'logs'], [])

    // log({ time })
    await Promise.all(logs.filter(t => t.date < time)
      .map(async t => e.delete(t.id)), )

    delete ctx.body.logs

    ctx.status = 200
    ctx.body = {
      ...ctx.body,
      success: true,
    }
  } catch (err) {
    ctx.throw(422, err.message)
  }

  if (next) {
    return next()
  }
  return ctx
}

export const createLog0 = async (ctx, next) => {
  log('creating log entry in db')
  let logItem = cast(ctx.request.body.log)
  try {
    await mCheckTable('logs')
    const e = getEngine('logs')
    if (logItem.id === 0) {
      logItem.id = uuid()
    }
    logItem = await e.set(logItem.id, logItem)
  } catch (err) {
    error(`error creating log entry in db ${err}`)
    ctx.throw(422, err.message)
  }
  ctx.body = {
    ...ctx.body,
    log: logItem,
  }
  if (next) {
    return next()
  }
  return ctx
}

export const logAction = async (ctx, next) => {
  let result = ''
  try {
    await mCheckTable('logs')
    const e = getEngine('logs')
    // const d = new Date()
    const d = (new Date()).getTime()

    const logItem = cast({})
    const server = obj.deepGet(ctx, ['body', 'server'], null)
    logItem.parameters = ctx.request.body.server
    logItem.serverId = server.id
    logItem.server = server.namespace
    logItem.username = ''
    logItem.status = 'info'
    logItem.action = 'Deploy'
    logItem.date = d
    // logItem.date = d.toUTCString()
    logItem.description = 'Server is deployed'

    log(logItem)
    if (logItem.id === 0) {
      logItem.id = uuid()
    }
    result = await e.set(logItem.id, logItem)
  } catch (err) {
    ctx.throw(422, err.message)
  }

  ctx.body = {
    result,
  }

  if (next) {
    return next()
  }

  return ctx
}
