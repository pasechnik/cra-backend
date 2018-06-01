import debug from 'debug'
import fs from 'fs'
import path from 'path'
import { getCtxParam, mCheckTable, mGetEngine, retError, retInfo } from '../common/module'
import { id, output, cast } from '../../models/settings'
import { str } from 'the-utils'

const error = debug('app:settings:module:error')
const log = debug('app:settings:module')

export const getEngine = () => mGetEngine('settings')
export const runCheckTable = async () => mCheckTable('settings')

export const fetchSettings = async () => cast(await getEngine()
  .get(id, {}))

export const dbGetSettings = (e, c, o) => async (key, ctx) => {
  log('selecting settings from db')
  return { [key]: o(await fetchSettings()) }
}

export const dbCreateSettings = (e, c, o) => async (key, ctx) => {
  const getBodyParam = getCtxParam(ctx, 'request')
  const item = c(getBodyParam(['body', key], {}))
  try {
    item.id = id
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

export const dbUpdateSettings = (e, c, o) => async (key, ctx) => {
  const getBodyParam = getCtxParam(ctx, 'request')

  const item = c(getBodyParam(['body', key], {}))
  item.id = id
  const result = await e.set(id, item)

  return {
    [key]: result,
    notifications: [retInfo(`${str.ucFirst(key)} ${item.name} is created`)],
  }
}

export const dbPatchSettings = (e, c, o, p) => async (key, ctx) => {
  const getRequestParam = getCtxParam(ctx, 'request')
  const getBodyParam = getCtxParam(ctx, 'body')

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

export const dbDeleteSettings = (e, c, o) => async (key, ctx) => {
  const getBodyParam = getCtxParam(ctx, 'body')
  const item = c(getBodyParam([key], null))

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

export const readVersionFile = (key, ctx) => {
  const file = path.resolve(process.cwd(), 'VERSION')
  log(file)
  if (fs.existsSync(file)) {
    return {
      [key]: fs.readFileSync(file, 'utf8')
        .trim(),
    }
  }
  return ''
}

