import { runFunction, runOutput } from '../../modules/context'
import { dbGetAll, dbCreate, dbGetOne, dbUpdate, dbPatch, dbDelete, dbClear } from '../../modules/db'
import { runCheckTable, getEngine, dbAddFirstUser } from './module'
import { cast, output, patch, input } from '../../models/user'

const routeKey = 'user'
const routeKeys = `${routeKey}s`

export const checkTable = () => runFunction(routeKey, runCheckTable)
export const addFirstUser = () => runFunction(routeKey, dbAddFirstUser)
export const getUsers = () => runOutput(routeKeys, dbGetAll(getEngine, output))
export const createUser = () => runOutput(routeKey, dbCreate(getEngine, input, output))
export const getUser = () => runOutput(routeKey, dbGetOne(getEngine, output, output))
export const updateUser = () => runOutput(routeKey, dbUpdate(getEngine, input, output))
export const patchUser = () => runOutput(routeKey, dbPatch(getEngine, cast, output, patch))
export const deleteUser = () => runOutput(routeKey, dbDelete(getEngine, cast, output))
export const clearData = () => runOutput(routeKeys, dbClear(getEngine, cast))
