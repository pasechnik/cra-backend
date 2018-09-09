import debug from 'debug'
import { cast, patch, output } from '../../models/model'
import { getEngine, runCheckTable } from './module'
import { runFunction, runOutput } from '../../modules/context'
import { dbGetAll, dbCreate, dbGetOne, dbUpdate, dbPatch, dbDelete, dbClear } from '../../modules/db'

const error = debug('app:models:controller:error')
const log = debug('app:models:controller')
const routeKey = 'model'
const routeKeys = `${routeKey}s`

export const checkTable = () => runFunction(routeKey, runCheckTable)
export const getModels = () => runOutput(routeKeys, dbGetAll(getEngine, output))
export const createModel = () => runOutput(routeKey, dbCreate(getEngine, cast, output))
export const getModel = () => runOutput(routeKey, dbGetOne(getEngine, cast, output))
export const updateModel = () => runOutput(routeKey, dbUpdate(getEngine, cast, output))
export const patchModel = () => runOutput(routeKey, dbPatch(getEngine, cast, output, patch))
export const deleteModel = () => runOutput(routeKey, dbDelete(getEngine, cast, output))
export const clearData = () => runOutput(routeKeys, dbClear(getEngine, cast))
