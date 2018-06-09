import debug from 'debug'
import uuid from 'uuid'
import { obj, str } from 'the-utils'
import config from '../../config'
import { Engine } from '../../app/engine-cassandra-async'
import { getCtxParam } from './module'

const error = debug('app:module:error')
const log = debug('app:module')

let engines = {}

export const retError = message => ({ type: 'error', message })
export const retInfo = message => ({ type: 'info', message })

export const mGetEngine = (table) => {
  if (obj.get(engines, table, null) === null) {
    log(`Creating new db engine ${config.cassandra.keyspace}.${table}`)
    engines = obj.set(engines, table, new Engine(table, config.cassandra.keyspace))
  }
  return obj.get(engines, table, null)
}

export const mCheckTable = async (table) => {
  const e = mGetEngine(table)
  let r = null
  try {
    await e.count()
    return r
  } catch (err) {
    r = true
  }

  if (r === true) {
    await e.createTable()
  }

  return r
}

export const dbGetAll = (e, c, o) => async (key, ctx) => {
  const all = await e.getAll()
  return { [key]: all.map(t => c(t)) }
}

export const dbGetOne = (e, c, o) => async (key, ctx) => {
  const getRouteParam = getCtxParam(ctx, 'params')
  const id = getRouteParam('id', 0)
  const item = await e.get(id, false)
  if (item) {
    return { [key]: c(item) }
  }

  throw new Error(`${str.ucFirst(key)} id ${id} is not found`)
}

export const dbCreate = (e, c) => async (key, ctx) => {
  const getBodyRequestParam = getCtxParam(ctx, ['request', 'body'])
  const item = c(getBodyRequestParam(key, {}))
  log({ item })
  try {
    if (item.id === 0) {
      item.id = uuid()
    }
    const result = await e.set(item.id, item)
    return {
      [key]: result,
      notifications: [retInfo(`${str.ucFirst(key)} ${item.name} is created`)],
    }
  } catch (err) {
    return {
      notifications: [retError(`Error while creating ${key} ${item.name}`)],
    }
  }
}

export const dbUpdate = (e, c, o) => async (key, ctx) => {
  const getRouteParam = getCtxParam(ctx, 'params')
  const getBodyRequestParam = getCtxParam(ctx, ['request', 'body'])
  const id = getRouteParam('id', '0')
  if (id === '0') {
    throw new Error(`${str.ucFirst(key)} id is 0`)
  }

  const item = c(getBodyRequestParam(key, {}))
  item.id = id
  const result = await e.set(id, item)

  return {
    [key]: result,
    notifications: [retInfo(`${str.ucFirst(key)} ${item.name} is updated`)],
  }
}

export const dbPatch = (e, c, o, p) => async (key, ctx) => {
  const getRouteParam = getCtxParam(ctx, 'params')
  const getRequestParam = getCtxParam(ctx, 'request')
  const getBodyParam = getCtxParam(ctx, 'body')
  const id = getRouteParam('id', '0')
  if (id === '0') {
    throw new Error(`${str.ucFirst(key)} id is 0`)
  }

  const current = c(getBodyParam([key], {}))
  const updated = getRequestParam(['body', key], {})

  const item = c(p(current, updated))
  item.id = id

  try {
    const result = await e.set(item.id, item)
    return {
      [key]: result,
      notifications: [retInfo(`${str.ucFirst(key)} ${item.name} is updated`)],
    }
  } catch (err) {
    return {
      notifications: [retError(`Error while updating ${key} ${item.name}`)],
    }
  }
}

export const dbDelete = (e, c, o) => async (key, ctx) => {
  const getBodyParam = getCtxParam(ctx, 'body')
  const item = c(getBodyParam([key], null))
  if (item.id === 0) {
    throw new Error(`${str.ucFirst(key)} is not found`)
  }

  try {
    await e.delete(item.id)
    return {
      [key]: o(item),
      id: item.id,
      success: true,
      notifications: [retInfo(`${str.ucFirst(key)} ${item.name} is removed`)],
    }
  } catch (err) {
    return {
      notifications: [retError(`Error while deleting ${key} ${item.name}`)],
    }
  }
}

export const dbClear = (e, c) => async (key, ctx) => {
  try {
    await e.clear()
    return {
      [key]: true,
      notifications: [retInfo(`${str.ucFirst(key)} cleared`)],
    }
  } catch (err) {
    return {
      notifications: [retError(`Error while clearing ${key}`)],
    }
  }
}
