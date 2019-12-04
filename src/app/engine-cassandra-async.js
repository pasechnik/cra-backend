import uuid from 'uuid'
import debug from 'debug'
import json from 'json-promise'
import { str, obj } from 'the-utils'
import getConnection from './db-cassandra-async'

const error = debug('app:engine:error')
const log = debug('app:engine')

export class Engine {
  constructor(room, namespace) {
    this.namespace = namespace === undefined || !namespace.length ? 'user' : namespace
    this.room = room === undefined || !room.length ? uuid() : room
    this.queries = {
      count: `SELECT count(*) FROM ${this.room} limit 1000000 `,
      countWhere: `SELECT count(*) FROM ${this.room} WHERE id = ? limit 1000000 `,
      selectOne: `SELECT id, value FROM ${this.room} WHERE id = ? limit 1 `,
      selectWhere: `SELECT id , value FROM ${this.room} WHERE id = ?`,
      select: `SELECT id , value FROM ${this.room}`,
      insert: `INSERT INTO ${this.room} (id , value) VALUES (?, ?)`,
      update: `UPDATE ${this.room} SET value = ? WHERE id = ?`,
      clear: `TRUNCATE ${this.room}`,
      remove: `DELETE FROM ${this.room} WHERE id = ?`,
      removeByParam: str.template`DELETE FROM ${'room'} WHERE ${'param'} = ?`,
      checkTable: 'SELECT count(*) FROM system_schema.tables WHERE keyspace_name=? and table_name = ?',
      checkTableCount: `SELECT count(*) FROM ${'room'}`,
      createTable: `CREATE TABLE IF NOT EXISTS 
        ${this.namespace}.${this.room} 
        ( id uuid, value varchar, PRIMARY KEY (id) )`,
      createKeyspace: `CREATE KEYSPACE IF NOT EXISTS ${this.namespace} WITH replication = {'class': 'SimpleStrategy',
                        'replication_factor' : 3}`,
    }
    this.isTable = false
  }

  async createKeyspace() {
    try {
      const collection = getConnection('system_schema')
      await collection.execute(this.getQuery('createKeyspace'))
    } catch (err) {
      // error('')s
    }
  }

  async createTable() {
    try {
      const collection = getConnection('system_schema')
      // await collection.execute(this.getQuery('createKeyspace'))
      await collection.execute(this.getQuery('createTable'))
    } catch (err) {
      // error('')s
    }
  }

  /**
   * connects to a cassandra keyspace
   * @returns {Promise}
   */
  getCollection() {
    return getConnection(this.namespace)
  }

  /**
   * uses queries map
   * @param type
   * @returns {Promise.<void>}
   */
  getQuery(type) {
    return obj.get(this.queries, type, '')
  }

  /**
   * counts all records in the room table
   * @param q
   * @returns {Promise.<*>}
   */
  async count(q) {
    try {
      const type = q !== undefined && q.length ? 'countWhere' : 'count'
      const params = q !== undefined && q.length ? [q] : undefined
      const collection = this.getCollection()
      const r = await collection.execute(this.getQuery(type), params)
      const row = r.rows[0]
      return row.count.toNumber()
    } catch (e) {
      throw e
    }
  }

  /**
   * verifies that key exists in the storage
   * @param key
   * @returns {Promise.<boolean>}
   */
  async has(key) {
    try {
      const collection = this.getCollection()
      const r = await collection.execute(this.getQuery('selectOne'), [key])
      return r.rowLength > 0
      // const r = await collection.execute(this.getQuery('countWhere'), [key])
      // const c = r.rows[0].count.toNumber()
      // return c > 0
    } catch (e) {
      throw e
    }
  }

  /**
   * return values by the key
   * @param key
   * @param def
   * @returns {Promise.<*>}
   */
  async get(key, def = null) {
    try {
      const collection = this.getCollection()
      const r = await collection.execute(this.getQuery('selectOne'), [key])
      if (r.rowLength === 0) {
        return def
      }

      return JSON.parse(r.rows[0].value)
    } catch (e) {
      throw e
    }
  }

  /**
   * stores data
   * @param key
   * @param data
   * @returns {Promise.<{numAffected, affectedDocuments: *, upsert: *}>}
   */
  async set(key, data) {
    try {
      if (this.has(key)) {
        return this.update(key, data)
      }
      return this.create(key, data)
    } catch (e) {
      throw e
    }
  }

  /**
   * stores data
   * @param key
   * @param data
   * @returns {Promise.<{numAffected, affectedDocuments: *, upsert: *}>}
   */
  async create(key, data) {
    try {
      const d = { ...data, id: key }
      const collection = this.getCollection()

      const value = await json.stringify(d)
      await collection.execute(this.getQuery('insert'), [key, value])
      return d
    } catch (e) {
      throw e
    }
  }

  /**
   * stores data
   * @param key
   * @param data
   * @returns {Promise.<{numAffected, affectedDocuments: *, upsert: *}>}
   */
  async update(key, data) {
    try {
      const d = { ...data, id: key }
      const collection = this.getCollection()

      const value = await json.stringify(d)
      await collection.execute(this.getQuery('update'), [value, key])
      return d
    } catch (e) {
      throw e
    }
  }

  /**
   * fetches all data
   * @param q
   * @returns {Promise.<*>}
   */
  async getAll(q) {
    try {
      const type = q !== undefined && q.length ? 'selectWhere' : 'select'
      const params = q !== undefined && q.length ? [q] : undefined
      const collection = this.getCollection()
      const r = await collection.execute(await this.getQuery(type), params)

      // return r.rows.map(t => ({ ...t, value: (t.type === 'object' ? JSON.parse(t.value) : t.value) }))
      return r.rows.map(t => JSON.parse(t.value))
    } catch (e) {
      throw e
    }
  }

  /**
   * fetches all data
   * @param q
   * @returns {Promise.<*>}
   */
  async removeByParam(q) {
    try {
      if (obj.isEmpty(q)) {
        return 0
      }
      const param = Object.keys(q).shift()

      const items = (await this.getAll()).filter(i => i[param] === q[param])

      await Promise.all(items.map(i => this.delete(i.id)))
      return items.length
    } catch (e) {
      throw e
    }
  }

  /**
   * removes all data
   * @returns {Promise.<boolean>}
   */
  async clear() {
    try {
      const collection = this.getCollection()
      await collection.execute(this.getQuery('clear'))
      return true
    } catch (e) {
      throw e
    }
  }

  /**
   * Deletes rows with the name
   * @param key
   * @returns {Promise.<number>}
   */
  async delete(key) {
    try {
      const collection = this.getCollection()
      await collection.execute(this.getQuery('remove'), [key])
      return 1
    } catch (e) {
      throw e
    }
  }
}

export default Engine
