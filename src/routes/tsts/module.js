import { mCheckTable, mGetEngine } from '../common/module'

// import debug from 'debug'
// const error = debug('app:tests:module:error')
// const log = debug('app:tests:module')

export const getEngine = () => mGetEngine('tests')
export const runCheckTable = async () => mCheckTable('tests')
