import uuid from 'uuid'
import { mCheckTable, mGetEngine } from '../../modules/db'
import { cast, defaults } from '../../models/user'
// id

// import debug from 'debug'
// const error = debug('app:users:module:error')
// const log = debug('app:users:module')

export const getEngine = () => mGetEngine('users')
export const runCheckTable = async () => mCheckTable('users')

export const dbAddFirstUser = async () => {
  const e = getEngine()
  const N = await e.count()
  if (N === 0) {
    await e.set(uuid(), cast(defaults))
  }
}
