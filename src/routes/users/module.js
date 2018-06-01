import { mCheckTable, mGetEngine } from '../common/module'
import { cast, defaults, id } from '../../models/user'

// import debug from 'debug'
// const error = debug('app:users:module:error')
// const log = debug('app:users:module')

export const getEngine = () => mGetEngine('users')
export const runCheckTable = async () => mCheckTable('users')

export const dbAddFirstUser = async () => {
  const e = getEngine()
  const N = await e.count()
  if (N === 0) {
    await e.set(id, cast(defaults))
  }
}
