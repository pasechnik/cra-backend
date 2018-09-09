import path from 'path'
import { cast, patch, output } from '../../models/application'
import { getEngine, runCheckTable } from './module'
import {
  runFunction, runOutput, parseJson,
  bodyFind, getCtxParam,
} from '../../modules/context'
import { fReadFile2 } from '../../modules/file'
import { dbGetAll, dbCreate, dbGetOne, dbUpdate, dbPatch, dbDelete, dbClear } from '../../modules/db'
import config from '../../config'

const routeKey = 'application'
const routeKeys = `${routeKey}s`

export const checkTable = () => runFunction(routeKey, runCheckTable)
export const getApplications = () => runOutput(routeKeys, dbGetAll(getEngine, output))
export const createApplication = () => runOutput(routeKey, dbCreate(getEngine, cast, output))
export const getApplication = () => runOutput(routeKey, dbGetOne(getEngine, cast, output))
export const updateApplication = () => runOutput(routeKey, dbUpdate(getEngine, cast, output))
export const patchApplication = () => runOutput(routeKey, dbPatch(getEngine, cast, output, patch))
export const deleteApplication = () => runOutput(routeKey, dbDelete(getEngine, cast, output))
export const clearData = () => runOutput(routeKeys, dbClear(getEngine, cast))
// (src, subj, callback) => async (key, ctx)
export const findApp = () => runOutput(routeKey, bodyFind(
  routeKeys,
  (key, ctx, def) => getCtxParam(ctx, 'params')('id', def),
  id => t => t.id === id
))
export const getLocalApplications = () => runOutput(routeKeys, fReadFile2(
  'applications',
  () => path.resolve(process.cwd(), config.applications),
  [],
  parseJson
))
