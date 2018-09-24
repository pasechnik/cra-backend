import { arr, obj } from 'the-utils'
import debug from 'debug'
import json from 'json-promise'

const error = debug('app:module:context:error')
const log = debug('app:module:context')

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const isFunction = functionToCheck => functionToCheck
  && {}.toString.call(functionToCheck) === '[object Function]'

export const retError = message => ({ type: 'error', message })
export const retInfo = message => ({ type: 'info', message })
export const retSuccess = message => ({ type: 'success', message })

export const parseJson = async txt => json.parse(txt)

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

export const map = (from, c) => async (key, ctx) => {
  const getBodyParam = getCtxParam(ctx, 'body')
  const item = getBodyParam(from, [])
    .map(t => c(t))

  // log('item')
  // log({ item, key })
  return {
    [key]: item,
  }
}

export const bodyFilter = (src, subj, callback) => async (key, ctx) => {
  const getBodyParam = getCtxParam(ctx, 'body')

  const subject = isFunction(subj) ? subj(key, ctx, '0') : getBodyParam(subj, {})
  const items = getBodyParam(key, [])

  log({ key, subject, items })
  const result = items.filter(callback(subject))

  return {
    [key]: result,
    notifications: [],
  }
}

export const bodyFind = (src, subj, callback) => async (key, ctx) => {
  const getBodyParam = getCtxParam(ctx, 'body')

  const subject = isFunction(subj) ? subj(key, ctx, '0') : getBodyParam(subj, {})
  const items = getBodyParam(src, [])

  log({ subject, items })

  const result = items.find(callback(subject))

  log({ key, result })
  return {
    [key]: result,
    // [key]: result !== undefined ? result : null,
    notifications: [],
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

export const concatOutput = (key, f) => async (ctx, next) => {
  const getBodyParam = getCtxParam(ctx, 'body')
  try {
    const result = await f(key, ctx)
    const previous = getBodyParam(key, [])
    const be = obj.get(result, key, [])
    // log({ result, previous, be })
    ctx.body = { ...ctx.body, ...result, [key]: [...previous, ...be] }
  } catch (err) {
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

export const spreadResults = key => async (ctx, next) => {
  try {
    const getBodyParam = getCtxParam(ctx, 'body')
    const results = getBodyParam(key, null)
    const notifications = getBodyParam('notifications', [])
    ctx.body = { ...results, notifications }
  } catch (err) {
    ctx.throw(422, err.message)
  }
  if (next) {
    return next()
  }

  return ctx
}

export const spreadArrayResults = key => async (ctx, next) => {
  try {
    const getBodyParam = getCtxParam(ctx, 'body')
    const results = getBodyParam(key, null)
    ctx.body = [...results]
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
