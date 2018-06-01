import uuid from 'uuid'
import debug from 'debug'
import { getCollection } from './db-mongo-async'

const error = debug('app:engine:error')
const log = debug('app:engine')
log.log = console.log.bind(console)

export class Engine {
  constructor(room, namespace) {
    this.namespace = namespace === undefined || !namespace.length ? 'back' : namespace
    this.room = room === undefined || !room.length ? uuid() : room
  }

  getCollection() {
    return getCollection(this.room)
  }

  async count(q) {
    try {
      const query = q !== undefined && q.length ? { name: new RegExp(q) } : {}
      const collection = await this.getCollection()
      const r = await collection.count(query)
      return r
    } catch (e) {
      throw e
    }
  }

  async has(key) {
    try {
      const collection = await this.getCollection()
      const r = await collection.findOne({ name: key })
      return r != null
      // log(r)
    } catch (e) {
      throw e
    }
  }

  async get(key, def = null) {
    try {
      const collection = await this.getCollection()
      const r = await collection.findOne({ name: key })
      return r == null ? def : r
    } catch (e) {
      throw e
    }
  }

  async set(key, data) {
    try {
      const collection = await this.getCollection()
      const r = await collection.findOneAndReplace(
        { name: key },
        { ...data, name: key },
        { upsert: true, returnNewDocument: true },
      )

      if (r.value == null) {
        r.value = await this.get(key)
      }

      return { numAffected: r.lastErrorObject.n, affectedDocuments: r.value, upsert: r.lastErrorObject.updatedExisting }
    } catch (e) {
      throw e
    }
  }

  async getAll(q) {
    try {
      const query = q !== undefined && q.length ? { name: new RegExp(q) } : {}
      const collection = await this.getCollection()
      const r = await collection.find(query)
      const items = await r.toArray()
      return items
      // log(items)
    } catch (e) {
      throw e
    }
  }

  async clear() {
    try {
      const collection = await this.getCollection()
      const { result } = await collection.remove({})
      return result.n
      // log(result)
    } catch (e) {
      throw e
    }
  }

  async delete(key) {
    try {
      const collection = await this.getCollection()
      const { result } = await collection.remove({ name: key })
      return result.n
      // log(result)
    } catch (e) {
      throw e
    }
  }

}

export default Engine
