import debug from 'debug'
import cassandra from 'cassandra-driver'
import { obj } from 'the-utils'
import config from '../config'

const error = debug('lib:cassandra:error')
const log = debug('lib:cassandra:module')

log('using cassandra at', config.cassandra)
let connections = {}
const connect = keyspace => new cassandra.Client({ ...config.cassandra, keyspace })

/**
 * Returns a promise of a `db` object. Subsequent calls to this function returns
 * the **same** promise, so it can be called any number of times without setting
 * up a new connection every time.
 */
const connection = (keyspace) => {
  if (!obj.has(connections, keyspace)) {
    connections = obj.set(connections, keyspace, connect(keyspace))
  }

  return obj.get(connections, keyspace)
}

// const get = keyspace => obj.get(connections, keyspace)
export default connection

/**
 * Usage:
 *
 *   (await getCollection('users')).find().toArray().then( ... )
 */

// export const getCollection = keyspace => connection(keyspace)
