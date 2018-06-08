import debug from 'debug'
import { obj, arr } from 'the-utils'

const error = debug('app:common:module:error')
const log = debug('app:common:module')

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

