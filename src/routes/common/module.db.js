import debug from 'debug'
import uuid from 'uuid'
import { obj } from 'the-utils'
import { arr, str } from 'the-utils'
import config from '../../config'
import { Engine } from '../../app/engine-cassandra-async'

const error = debug('app:module:error')
const log = debug('app:module')

let engines = {}

export const retError = message => ({ type: 'error', message })
export const retInfo = message => ({ type: 'info', message })

export const getCtxParam = (ctx, body) => (param, def) => {
  const names = []
  if (arr.isArray(body)) {
    names.push(...body)
  } else {
    names.push(body)
  }
  if (arr.isArray(param)) {
    names.push(...param)
  } else {
    names.push(param)
  }

  return obj.deep(ctx, names, def)
}

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

export const getPostAll = target => async (key, ctx) => {
  const getRequestParam = getCtxParam(ctx, 'request')
  const item = getRequestParam('body', {})

  return {
    [target || 'post']: item,
  }
}

export const getPost = target => async (key, ctx) => {
  const getRequestParam = getCtxParam(ctx, ['request', 'body'])
  const item = getRequestParam(key, {})

  return {
    [target || 'post']: item,
  }
}

export const mvKey = oldkey => async (key, ctx) => {
  const getBodyParam = getCtxParam(ctx, 'body')
  const items = getBodyParam(key, [])
  const item = getBodyParam(oldkey, {})
  return {
    [key]: [...items, item],
  }
}

export const map = (from, c) => async (key, ctx) => {
  const getBodyParam = getCtxParam(ctx, 'body')
  const item = getBodyParam(from, [])
    .map(t => c(t))

  log('item')
  log({ item, key })
  return {
    [key]: item,
  }
}

export const bodyFilter = (src, subj, callback) => async (key, ctx) => {
  const getBodyParam = getCtxParam(ctx, 'body')

  const subject = getBodyParam(subj, {})
  const items = getBodyParam(key, [])

  const result = items.filter(callback(subject))

  return {
    [key]: result,
    notifications: [],
  }
}

export const bodyFind = (src, subj, callback) => async (key, ctx) => {
  const getBodyParam = getCtxParam(ctx, 'body')

  const subject = getBodyParam(subj, {})
  const items = getBodyParam(src, [])

  const result = items.find(callback(subject))

  return {
    [key]: result,
    // [key]: result !== undefined ? result : null,
    notifications: [],
  }
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

export const dbFilterItemsByApp = (e, c, o) => async (key, ctx) => {
  const getBodyParam = getCtxParam(ctx, 'body')
  const application = getBodyParam('application', null)

  if (application === null) {
    throw new Error('can\'t find the application ')
  }

  const appitems = getBodyParam(key, [])
    .filter(b => b.applicationId === application.id)

  return {
    [key]: appitems,
  }

}

export const runFunction = (key, f) => async (ctx, next) => {
  try {
    await f(key, ctx)
  } catch (err) {
    // throw err
    const getBodyParam = getCtxParam(ctx, 'body')
    const notifications = getBodyParam('notifications', [])
    ctx.body = { ...ctx.body, notifications: [...notifications, retError(err.message)] }
    // ctx.throw(422, err.message)
  }

  if (next) {
    return next()
  }

  return ctx
}

export const runOutput = (key, f) => async (ctx, next) => {
  try {
    const r = await f(key, ctx)
    ctx.body = { ...ctx.body, ...r }
  } catch (err) {
    const getBodyParam = getCtxParam(ctx, 'body')
    const notifications = getBodyParam('notifications', [])
    ctx.body = { ...ctx.body, notifications: [...notifications, retError(err.message)] }

    return ctx
    // ctx.throw(422, err.message)
  }

  if (next !== undefined) {
    return next()
  }

  return ctx
}

