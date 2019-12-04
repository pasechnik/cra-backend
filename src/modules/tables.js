import { mCheckKeyspace, mCheckTable } from './db'
import config from '../config'

const tables = ['applications', 'cache', 'logs', 'models', 'settings', 'tests', 'users']

export const checkTables = async () => {
  // const settings = await fetchSettings()
  await mCheckKeyspace(config.cassandra.keyspace)
  await Promise.all(tables.map(t => mCheckTable(t)))
}

export default { tables, checkTables }
