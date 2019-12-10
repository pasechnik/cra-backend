import uuid from 'uuid'
import debug from 'debug'
import { obj } from 'the-utils'

const error = debug('app:engine:error')
const log = debug('app:engine')

export class Engine {
  constructor(room, namespace) {
    this.data = {}
  }

  async count(q) {
    try {
      return q !== undefined && q.length
        ? obj.toArrayFilter(this.data, new RegExp(q)).length
        : obj.toArray(this.data).length
    } catch (e) {
      throw e
    }
  }

  async has(key) {
    try {
      return obj.has(this.data, key)
    } catch (e) {
      throw e
    }
  }

  async get(key, def = null) {
    try {
      const value = obj.get(this.data, key, def)
      return value
      // if (value !== null) {
      //   const result = {
      //     ...value,
      //    // _id: obj.has(value, 'id') ? value.id : uuid(),
      //   }
      //  // delete result.id
      //  return result
      // }
      // return value
    } catch (e) {
      throw e
    }
  }

  async set(key, data) {
    try {
      const item = {
        ...data,
        id: key,
      }
      this.data[key] = item
      return { numAffected: 1, affectedDocuments: item, upsert: true }
    } catch (e) {
      throw e
    }
  }

  async getAll(q) {
    try {
      return q !== undefined && q.length ? obj.toArrayFilter(this.data, new RegExp(q)) : obj.toArray(this.data)
    } catch (e) {
      throw e
    }
  }

  async clear() {
    try {
      const numRemoved = Object.keys(this.data).length
      this.data = {}
      return numRemoved
    } catch (e) {
      throw e
    }
  }

  async delete(key) {
    try {
      if (typeof key === 'string') {
        delete this.data[key]
        return 1
      } else if (typeof key === 'object') {
        const length = Object.keys(this.data).length
        this.data = obj.filterKeys(this.data, new RegExp(key))
        return length - Object.keys(this.data).length
        // log(length, Object.keys(this.data).length, this.data)
      }
      return 0
    } catch (e) {
      throw e
    }
  }
}

// export const engine = new Engine()
export default Engine
