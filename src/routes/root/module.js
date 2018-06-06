import { mCheckTable, mGetEngine } from '../common/module'

// import debug from 'debug'
// const error = debug('app:applications:module:error')
// const log = debug('app:applications:module')

export const getEngine = () => mGetEngine('applications')
export const runCheckTable = async (key, ctx) => mCheckTable('applications')


