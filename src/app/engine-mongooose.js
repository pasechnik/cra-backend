import mongoose from 'mongoose'
import { obj } from 'the-utils'
import uuid from 'uuid'
import { Room } from '../models/mongo/room'
import debug from 'debug'

const error = debug('app:engine:error')
const log = debug('app:engine')
log.log = console.log.bind(console)

mongoose.Promise = global.Promise

export class Engine {
  constructor(room, namespace) {
    if (namespace == undefined || !namespace.length) {
      namespace = 'back'
    }
    if (room == undefined || !room.length) {
      room = uuid()
    }
    this.db = Room(room)
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      this.db.findOneAndUpdate(
          { name: key },
          { ...value, name: key },
          { upsert: true },
          (err, doc) => {
            if (err !== null) {
              return reject(err)
            }
            return resolve({ numAffected: 1, affectedDocuments: { ...value, name: key, _id: 1 }, upsert: true })
          }
        )
    }
    )
  }

  get(key, def = null) {
    return new Promise((resolve, reject) => {
      this.db.findOne(
        { name: key },
        '',
        (err, it) => {
          log('it', err, it)
          console.log(it)
          if (err !== null) {
            return reject(err)
          }
          return it === null ? resolve(def) : resolve({ ...it })
        })
    })
  }

  getAll(q) {
    const query = q !== undefined && q.length ? { name: new RegExp(q) } : {}
    return new Promise((resolve, reject) => {
      this.db.find(
        query,
        (err, docs) => {
          if (err !== null) {
            return reject(err)
          }
          return resolve(docs)
        })
    })
  }

  clear() {
    return new Promise((resolve, reject) => {
      this.db.remove({}, (err) => {
        if (err !== null) {
          return reject(err)
        }
        return resolve(1)
      })
    })
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      this.db.remove({ name: key }, {}, (err) => {
        if (err !== null) {
          return reject(err)
        }
        return resolve(1)
      })
    })
  }

  has(key) {
    return new Promise((resolve, reject) => {
      this.db.findOne(
        { name: key },
        (err, doc) => {
          if (err !== null) {
            return reject(err)
          }
          return doc === null ? resolve(false) : resolve(true)
        })
    })
  }

  count(q) {
    const query = q !== undefined && q.length ? { name: new RegExp(q) } : {}
    return new Promise((resolve, reject) => {
      // Count all documents in the datastore
      this.db.count(query, (err, count) => {
        if (err !== null) {
          return reject(err)
        }
        return resolve(count)
      })
    })
  }
}

// export const engine = new Engine()
export default Engine
