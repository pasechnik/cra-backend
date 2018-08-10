import { mCheckTable, mGetEngine } from '../common/module.db'

// import debug from 'debug'
// const error = debug('app:applications:module:error')
// const log = debug('app:applications:module')

export const getEngine = () => mGetEngine('medias')
export const runCheckTable = async (key, ctx) => mCheckTable('medias')
