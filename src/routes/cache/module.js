import { mCheckTable, mGetEngine } from '../common/module'

export const getEngine = () => mGetEngine('cache')
export const runCheckTable = async () => mCheckTable('cache')

// import debug from 'debug'
// const error = debug('app:cache:module:error')
// const log = debug('app:cache:module')
