import config from '../../config'
import { cast, patch, output } from '../../models/settings'
import { dbClear } from '../../modules/db'
import { readFile } from '../../modules/file'
import { runFunction, runOutput, parseJson } from '../../modules/context'
import { offlineData, init } from '../../app/init'
import {
  getEngine,
  runCheckTable,
  dbGetSettings,
  dbPatchSettings,
  dbDeleteSettings,
  dbCreateSettings,
  dbUpdateSettings,
} from './module'

const routeKey = 'setting'
const routeKeys = `${routeKey}s`

export const fImportOffline = () => async key => {
  await init()
  await offlineData(true)
  return {
    [key]: 'result',
  }
}

export const checkTable = () => runFunction(routeKey, runCheckTable)
export const getVersion = () => runOutput(routeKeys, readFile(config.VERSION, '0.0.0'))
export const getDashboard = () => runOutput('dashboard', readFile(config.dashboard, [], parseJson))
export const getSettings = () => runOutput(routeKeys, dbGetSettings(getEngine, cast, output))
export const getSetting = () => runOutput(routeKeys, dbGetSettings(getEngine, cast, output))
export const patchSetting = () => runOutput(routeKeys, dbPatchSettings(getEngine, cast, output, patch))
export const deleteSetting = () => runOutput(routeKeys, dbDeleteSettings(getEngine, cast, output))
export const createSetting = () => runOutput(routeKeys, dbCreateSettings(getEngine, cast, output))
export const updateSetting = () => runOutput(routeKeys, dbUpdateSettings(getEngine, cast, output))
export const clearData = () => runOutput(routeKeys, dbClear(getEngine, cast))
export const importOffline = () => runOutput(routeKeys, fImportOffline())
