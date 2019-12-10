import debug from 'debug'
import { str } from 'the-utils'
import { getCtxParam, retError, retInfo } from '../../modules/context'
import { mCheckTable, mGetEngine } from '../../modules/db'
import { id, cast } from '../../models/settings'

const error = debug('app:settings:module:error')
const log = debug('app:settings:module')

export const getEngine = () => mGetEngine('settings')
export const runCheckTable = async () => mCheckTable('settings')

export const fetchSettings = async () => cast(await getEngine().get(id, {}))

export const updateSettings = async s => {
  const model = cast(s)
  await getEngine().set(id, model)
  return model
}

export const dbGetSettings = (e, c, o) => async (key, ctx) => {
  log('selecting settings from db')
  return { [key]: o(await fetchSettings()) }
}

export const dbCreateSettings = (e, c, o) => async (key, ctx) => {
  const engine = e()
  const getBodyParam = getCtxParam(ctx, 'request')
  const item = c(getBodyParam(['body', key], {}))
  try {
    item.id = id
    const result = await engine.set(item.id, item)
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
  const engine = e()
  const getBodyParam = getCtxParam(ctx, 'request')

  const item = c(getBodyParam(['body', key], {}))
  item.id = id
  const result = await engine.set(id, item)

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
    const engine = e()
    const result = await engine.set(item.id, item)
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
    const engine = e()
    await engine.delete(item.id)
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
