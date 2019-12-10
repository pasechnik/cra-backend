import { mCheckTable, mGetEngine } from '../../modules/db'

// import debug from 'debug'
// const error = debug('app:models:module:error')
// const log = debug('app:models:module')

export const getEngine = () => mGetEngine('models')
export const runCheckTable = async (key, ctx) => mCheckTable('models')
