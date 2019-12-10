import uuid from 'uuid'
import debug from 'debug'
import path from 'path'
import { obj, str } from 'the-utils'
import { getCtxParam, parseJson, retError, retInfo } from './context'
import { fReadFile } from './file'
import { Engine } from '../app/engine-cassandra-async'
import config from '../config'

const error = debug('app:module:db:error')
const log = debug('app:module:db')

export const mGetEngine = table => {
  log(`Creating db engine ${config.cassandra.keyspace}.${table}`)
  return new Engine(table, config.cassandra.keyspace)
  // if (obj.get(engines, table, null) === null) {
  //   log(`Creating new db engine ${config.cassandra.keyspace}.${table}`)
  //   engines = obj.set(engines, table, new Engine(table, config.cassandra.keyspace))
  // }
  // return obj.get(engines, table, null)
}

export const mCheckTable = async table => {
  log(`checking table - ${table}`)
  const e = mGetEngine(table)
  const r = await e.createTable()

  return r
}

export const mCheckKeyspace = async table => {
  log('checking keyspace')
  const e = mGetEngine(table)
  const r = await e.createKeyspace()

  return r
}

export const dbGetAll = (e, c, o) => async (key, ctx) => {
  const engine = e()
  const all = await engine.getAll()
  return { [key]: all.map(t => c(t)) }
}

export const dbGetOne = (e, c, o) => async (key, ctx) => {
  const engine = e()
  const getRouteParam = getCtxParam(ctx, 'params')
  const id = getRouteParam('id', 0)
  const item = await engine.get(id, false)
  if (item) {
    return { [key]: c(item) }
  }

  throw new Error(`${str.ucFirst(key)} id ${id} is not found`)
}

export const dbCreate = (e, c, o) => async (key, ctx) => {
  const engine = e()
  const getBodyRequestParam = getCtxParam(ctx, ['request', 'body'])
  const item = c(getBodyRequestParam(key, {}))
  log({ item })
  try {
    if (item.id === 0) {
      item.id = uuid()
    }
    const result = await engine.set(item.id, item)
    return {
      [key]: o(result),
      notifications: [retInfo(`${str.ucFirst(key)} ${item.name} is created`)],
    }
  } catch (err) {
    return {
      notifications: [retError(`Error while creating ${key} ${item.name}`)],
    }
  }
}

export const dbUpdate = (e, c, o) => async (key, ctx) => {
  const engine = e()
  const getRouteParam = getCtxParam(ctx, 'params')
  const getBodyRequestParam = getCtxParam(ctx, ['request', 'body'])
  const id = getRouteParam('id', '0')
  if (id === '0') {
    throw new Error(`${str.ucFirst(key)} id is 0`)
  }

  const item = c(getBodyRequestParam(key, {}))
  item.id = id
  const result = await engine.set(id, item)

  return {
    [key]: o(result),
    notifications: [retInfo(`${str.ucFirst(key)} ${item.name} is updated`)],
  }
}

export const dbPatch = (e, c, o, p) => async (key, ctx) => {
  const engine = e()
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
    const result = await engine.set(item.id, item)
    return {
      [key]: o(result),
      notifications: [retInfo(`${str.ucFirst(key)} ${item.name} is updated`)],
    }
  } catch (err) {
    return {
      notifications: [retError(`Error while updating ${key} ${item.name}`)],
    }
  }
}

export const dbDelete = (e, c, o) => async (key, ctx) => {
  const engine = e()
  const getBodyParam = getCtxParam(ctx, 'body')
  const item = c(getBodyParam([key], null))
  if (item.id === 0) {
    throw new Error(`${str.ucFirst(key)} is not found`)
  }

  try {
    await engine.delete(item.id)
    return {
      [key]: o(item),
      id: item.id,
      success: true,
      notifications: [retInfo(`${str.ucFirst(key)} ${item.name} is removed`)],
    }
  } catch (err) {
    return {
      notifications: [retError(`Error while deleting ${key} ${item.name}. ${err.message}`)],
    }
  }
}

export const dbClear = (e, c) => async (key, ctx) => {
  try {
    const engine = e()
    await engine.clear()
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

export const dbImportArray = async (name, items) => {
  const engine = mGetEngine(name)
  return items.map(t => engine.set(obj.get(t, 'id', uuid()), t))
}

export const dbImportFile = async (folder, name, file) => {
  log({ folder, name, file })
  const items = await fReadFile(name, () => path.resolve(process.cwd(), folder, file), [], parseJson)
  log({ items })
  return dbImportArray(name, items)
}

export const dbImport = async (folder, files) => files.map(t => dbImportFile(folder, t.replace(/\.[^/.]+$/, ''), t))

// export const dbExport = async (folder, )
