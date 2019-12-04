import debug from 'debug'
import uuid from 'uuid'
import { obj } from 'the-utils'
import { cast } from '../../models/log'
import { runFunction } from '../../modules/context'
import { mGetEngine, mCheckTable } from '../../modules/db'

const error = debug('app:logs:module:error')
const log = debug('app:logs:module')

export const getEngine = () => mGetEngine('logs')
export const runCheckTable = async () => mCheckTable('logs')
const checkTable = () => runFunction('logs', runCheckTable)

export const logAction = async props => {
  let result = ''

  try {
    await checkTable()
    const e = getEngine()
    await e.createTable()

    const d = new Date().getTime()

    const logItem = cast(props)
    logItem.date = d

    if (logItem.id === 0) {
      logItem.id = uuid()
    }
    result = await e.set(logItem.id, logItem)
  } catch (err) {
    error(`Error saving log entry ${err.message}`)
  }

  return result
}

export const logError = async ({ action, server, params, message }) =>
  logAction({
    action,
    status: 'error',
    username: 'admin',
    server: obj.get(server, 'namespace', ''),
    parameters: params,
    serverId: obj.get(server, 'id', ''),
    description: message,
  })
