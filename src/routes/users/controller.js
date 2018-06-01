// import debug from 'debug'
import {
  dbGetAll, dbCreate, dbGetOne,
  dbUpdate, dbPatch, dbDelete,
  runFunction, runOutput,
} from '../common/module'
import { runCheckTable, getEngine, dbAddFirstUser } from './module'
import { cast, output, patch } from '../../models/user'

// const error = debug('app:users:controller:error')
// const log = debug('app:users:controller')
const routeKey = 'user'
const routeKeys = `${routeKey}s`

export const checkTable = () => runFunction(routeKey, runCheckTable)
export const addFirstUser = () => runFunction(routeKey, dbAddFirstUser)
export const getUsers = () => runOutput(routeKeys, dbGetAll(getEngine(), cast))
export const createUser = () => runOutput(routeKey, dbCreate(getEngine(), cast, output))
export const getUser = () => runOutput(routeKey, dbGetOne(getEngine(), cast, output))
export const updateUser = () => runOutput(routeKey, dbUpdate(getEngine(), cast, output))
export const patchUser = () => runOutput(routeKey, dbPatch(getEngine(), cast, output, patch))
export const deleteUser = () => runOutput(routeKey, dbDelete(getEngine(), cast, output))
