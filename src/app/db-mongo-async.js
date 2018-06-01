import { MongoClient } from 'mongodb'
import promisify from 'es6-promisify'


import config from '../config'

let _connection
const connect = url => promisify(MongoClient.connect)(url)

/**
 * Returns a promise of a `db` object. Subsequent calls to this function returns
 * the **same** promise, so it can be called any number of times without setting
 * up a new connection every time.
 */
export const connection = (url) => {
  if (!_connection) {
    _connection = connect(url)
  }

  return _connection
}

export const get = () => _connection
export default connection

/**
 * Returns a ready-to-use `collection` object from MongoDB.
 *
 * Usage:
 *
 *   (await getCollection('users')).find().toArray().then( ... )
 */

export const getCollection = async (collectionName) => {
  const db = await connection(config.database)
  return db.collection(collectionName)
}

/*
export async function getCollection (collectionName) {
  const db = await connection(config.database)
  return db.collection(collectionName)
}
*/

export const db = async url => await MongoClient.connect(url)

export const connectnn = (url) => {
  try {
    if (!_connection) {
      _connection = connect(url)
    }
    _connection = db(url)
    console.log('state.db', _connection)
    return _connection
  } catch (e) {
    throw e
  }
}


export const close = async function () {
  try {
    if (_connection) {
      await _connection.close()
      _connection = null
    }
  } catch (e) {
    throw e
  }
}
