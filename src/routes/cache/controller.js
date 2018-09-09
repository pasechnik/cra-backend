import cache from '../../app/webCache'
import { obj } from 'the-utils'
import { getEngine } from './module'

export async function getCache(ctx, next) {
  const cache = {}
  cache.serverGroups = cache.cachedData
  ctx.body = {
    cache,
  }

  if (next) {
    return next()
  }

  return ctx
}

export async function initCache(ctx, next) {
  cache.getAllInfo()
  ctx.body = {
    status: 'init cache',
  }

  if (next) {
    return next()
  }

  return ctx
}

export async function getCachedServers(ctx, next) {
  const servers = obj.deepGet(cache, ['cachedData', 'servers'], [])
  ctx.body = {
    servers,
  }

  if (next) {
    return next()
  }

  return ctx
}
