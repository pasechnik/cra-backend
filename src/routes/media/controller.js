import { cast, patch, output } from '../../models/application'
import { getEngine, runCheckTable } from './module'
import { runFunction, runOutput } from '../common/module'
import { dbGetAll, dbCreate, dbGetOne, dbUpdate, dbPatch, dbDelete, dbClear } from '../common/module.db'

const routeKey = 'application'
const routeKeys = `${routeKey}s`

export const checkTable = () => runFunction(routeKey, runCheckTable)
export const getApplications = () => runOutput(routeKeys, dbGetAll(getEngine(), output))
export const createApplication = () => runOutput(routeKey, dbCreate(getEngine(), cast, output))
export const getApplication = () => runOutput(routeKey, dbGetOne(getEngine(), cast, output))
export const updateApplication = () => runOutput(routeKey, dbUpdate(getEngine(), cast, output))
export const patchApplication = () => runOutput(routeKey, dbPatch(getEngine(), cast, output, patch))
export const deleteApplication = () => runOutput(routeKey, dbDelete(getEngine(), cast, output))
export const clearData = () => runOutput(routeKeys, dbClear(getEngine(), cast))
