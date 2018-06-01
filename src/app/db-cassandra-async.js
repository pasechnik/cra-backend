import debug from 'debug'
import cassandra from 'cassandra-driver'
import config from '../config'
import { obj } from 'the-utils'

const error = debug('lib:cassandra:error')
const log = debug('lib:cassandra:module')

// const client = new cassandra.Client(config.cassandra)
// const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'user' })

// const query = 'SELECT name, email FROM users WHERE key = ?'
// client.execute(query, ['someone'])
//   .then(result => console.log('User with email %s', result.rows[0].email))

log('using cassandra at', config.cassandra)
let connections = {}
const connect = keyspace => new cassandra.Client({ ...config.cassandra, keyspace })
// const connect = keyspace => {
//   console.log(config.cassandra)
//   return new cassandra.Client({ ...config.cassandra, keyspace })
// }

/**
 * Returns a promise of a `db` object. Subsequent calls to this function returns
 * the **same** promise, so it can be called any number of times without setting
 * up a new connection every time.
 */
export const connection = (keyspace) => {
  if (!obj.has(connections, keyspace)) {
    connections = obj.set(connections, keyspace, connect(keyspace))
  }

  return obj.get(connections, keyspace)
}

export const get = keyspace => obj.get(connections, keyspace)
export default connection

/**
 * Usage:
 *
 *   (await getCollection('users')).find().toArray().then( ... )
 */

export const getCollection = keyspace => connection(keyspace)
