import { obj } from 'the-utils'
import uuid from 'uuid'

import debug from 'debug'

const error = debug('app:engine:error')
const log = debug('app:engine')
log.log = console.log.bind(console)

export class Engine {
  constructor(room, namespace) {
    this.data = {}
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      try {
        const id = obj.has(value, '_id') ? value._id : uuid()
        const item = {
          ...value,
          id,
          _id: id,
        }

        this.data[key] = item
        delete item.id
        resolve({ numAffected: 1, affectedDocuments: item, upsert: true })
          // resolve(1, item, true)
      } catch (e) {
        reject(e.message)
      }
    }
    )
  }

  get(key, def = null) {
    return new Promise((resolve, reject) => {
      try {
        const value = obj.get(this.data, key, def)
        if (value !== null) {
          const result = {
            ...value,
            _id: obj.has(value, 'id') ? value.id : uuid(),
          }
          delete result.id
          resolve(result)
        } else {
          resolve(value)
        }
      } catch (e) {
        reject(e.message)
      }
    })
  }

  getAll(q) {
    return new Promise((resolve, reject) => {
      try {
        resolve(
          q !== undefined && q.length ? obj.toArrayFilter(this.data, new RegExp(q))
            : obj.toArray(this.data)
        )
      } catch (e) {
        reject(e.message)
      }
    })
  }

  clear() {
    return new Promise((resolve, reject) => {
      try {
        const numRemoved = Object.keys(this.data).length
        this.data = {}
        resolve(numRemoved)
      } catch (e) {
        reject(e.message)
      }
    })
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      try {
        delete this.data[key]
        resolve(1)
      } catch (e) {
        reject(e.message)
      }
    })
  }

  has(key) {
    return new Promise((resolve, reject) => {
      try {
        resolve(obj.has(this.data, key))
      } catch (e) {
        reject(e.message)
      }
    })
  }

  count(q) {
    return new Promise((resolve, reject) => {
      try {
        resolve(
          q !== undefined && q.length ? obj.toArrayFilter(this.data, new RegExp(q)).length
            : obj.toArray(this.data).length
        )
      } catch (e) {
        reject(e.message)
      }
    })
  }
}

// export const engine = new Engine()
export default Engine
