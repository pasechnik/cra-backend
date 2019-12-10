import debug from 'debug'
import { fetchSettings, updateSettings } from '../routes/settings/module'
import { fReadDir } from '../modules/file'
import { dbImport } from '../modules/db'
import config from '../config'
import { checkTables } from '../modules/tables'
import { delay } from '../modules/context'

const error = debug('app:init:error')
const log = debug('app:init')

export const offlineData = async (force = false) => {
  try {
    const settings = await fetchSettings()
    log({ settings })
    if (force === true || settings.initialized !== true) {
      log('updating DB')
      // Copy applications
      const files = await fReadDir(config.offlineConfigs, /\.json$/)
      log({ files })
      await dbImport(config.offlineConfigs, files)
      // Copy clusters
      // Change settings initialized to true
      log('saving to settings updated flag')
      await updateSettings({ ...settings, initialized: true })
    }
  } catch (err) {
    throw err
  }
}

const spinoff = async (ms, f) => {
  try {
    log('Started loop')
    await delay(ms)
    log(`Waited ${ms} ms`)
    return f()
  } catch (err) {
    throw err
  }
}

let iter = 0
export const loop = async () => {
  iter += 1
  log(`do loop ${iter}`)
  return spinoff(2000, loop)
}

export const initParts = async () => {
  log('Checking tables')
  await checkTables()
  log('Checking offline data')
  await offlineData()
  log('Application initialized')
  return true
}

export const failLoop = f => async () => {
  try {
    iter += 1
    log(`doing loop ${iter}`)
    await f()
    return true
  } catch (err) {
    error(err.message)
    return spinoff(10000, failLoop(f))
  }
}

export const init = async () => {
  log('Initializing application')
  spinoff(1000, failLoop(initParts))
}

export default init
