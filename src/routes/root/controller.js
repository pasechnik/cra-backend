import debug from 'debug'
import { obj } from 'the-utils'
import { cast, patch, output } from '../../models/application'
import { getEngine, runCheckTable } from './module'
import {
  runFunction, runOutput, mvKey,
  dbGetAll, dbCreate, dbGetOne, dbUpdate, dbPatch, dbDelete, dbClear,
} from '../common/module'

const error = debug('app:applications:controller:error')
const log = debug('app:applications:controller')
const routeKey = 'application'
const routeKeys = `${routeKey}s`

export const checkTable = () => runFunction(routeKey, runCheckTable)
export const getApplications = () => runOutput(routeKeys, dbGetAll(getEngine(), output))
export const createApplication = () => runOutput(routeKey, dbCreate(getEngine(), cast, output))
export const moveApplication = () => runOutput(routeKeys, mvKey(routeKey))
export const getApplication = () => runOutput(routeKey, dbGetOne(getEngine(), cast, output))
export const updateApplication = () => runOutput(routeKey, dbUpdate(getEngine(), cast, output))
export const patchApplication = () => runOutput(routeKey, dbPatch(getEngine(), cast, output, patch))
export const deleteApplication = () => runOutput(routeKey, dbDelete(getEngine(), cast, output))
export const clearData = () => runOutput(routeKeys, dbClear(getEngine(), cast))

export const getServerApplication = async (ctx, next) => {
  try {
    const e = getEngine()
    const server = obj.deepGet(ctx, ['body', 'server'], null)
    if (server === null) {
      ctx.throw(404, 'server is not found')
    }

    const application = await e.get(server.applicationId, false)
    if (!application) {
      ctx.throw(404, 'application is not found')
    }

    ctx.body = { ...ctx.body, application: cast(application) }
    // ctx.body = { application: cast(application), }
  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404, 'application is not found')
    }
  }
  if (next) {
    return next()
  }
  return ctx
}
