import { cast, patch, output } from '../../models/settings'
import {
  getEngine,
  runCheckTable,
  readVersionFile,
  dbGetSettings,
  dbPatchSettings,
  dbDeleteSettings,
  dbCreateSettings,
  dbUpdateSettings,
} from './module'

import {
  dbClear,
  runFunction,
  runOutput,
} from '../common/module'

const routeKey = 'setting'
const routeKeys = `${routeKey}s`

export const checkTable = () => runFunction(routeKey, runCheckTable)
export const getVersion = () => runOutput(routeKeys, readVersionFile)
export const getSettings = () => runOutput(routeKeys, dbGetSettings(getEngine(), cast, output))
export const getSetting = () => runOutput(routeKeys, dbGetSettings(getEngine(), cast, output))
export const patchSetting = () => runOutput(routeKeys, dbPatchSettings(getEngine(), cast, output, patch))
export const deleteSetting = () => runOutput(routeKeys, dbDeleteSettings(getEngine(), cast, output))
export const createSetting = () => runOutput(routeKeys, dbCreateSettings(getEngine(), cast, output))
export const updateSetting = () => runOutput(routeKeys, dbUpdateSettings(getEngine(), cast, output))
export const clearData = () => runOutput(routeKeys, dbClear(getEngine(), cast))
