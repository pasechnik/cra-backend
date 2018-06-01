import debug from 'debug'
import { obj } from 'the-utils'
import { getCtxParam, runFunction } from './module'

const error = debug('app:common:controller:error')
const log = debug('app:common:controller')

export const checkTable = f => runFunction(f)

export const cutResults = (key, newkey) => async (ctx, next) => {
  try {
    const getBodyParam = getCtxParam(ctx, 'body')
    const results = getBodyParam(key, null)
    const notifications = getBodyParam('notifications', [])
    const name = newkey === undefined ? key : newkey
    ctx.body = { [name]: results, notifications }
  } catch (err) {
    ctx.throw(422, err.message)
  }
  if (next) {
    return next()
  }

  return ctx
}

export const getSimple = (key, def) => async (ctx, next) => {
  ctx.body = { ...ctx.body, [key]: def }

  if (next) {
    return next()
  }

  return ctx
}
