import Datastore from 'nedb'
import uuid from 'uuid'
import debug from 'debug'
import { obj } from 'the-utils'

const error = debug('app:engine:error')
const log = debug('app:engine')

export class Engine {
  constructor(room, namespace) {
    this.namespace = namespace === undefined || !namespace.length ? `${process.cwd()}/db/` : namespace
    this.room = room === undefined || !room.length ? uuid() : room
    log({ filename: `${this.namespace}${this.room}.nedb` })
    this.db = new Datastore({ filename: `${this.namespace}${this.room}.nedb`, autoload: true })
    this.db.ensureIndex({ fieldName: 'id', unique: true }, () => {})
  }

  count(q) {
    const query = q !== undefined && q.length ? { id: new RegExp(q) } : {}
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

  set(key, value) {
    return new Promise(
      (resolve, reject) => this.db.update(
        { id: key },
        { ...value, id: key },
        { upsert: true },
        (err, numAffected, affectedDocuments, upsert) => {
          if (err !== null) {
            return reject(err)
          }
          // Using a unique constraint with the index
          return resolve({ numAffected, affectedDocuments, upsert })
        }
      )
    )
    // this.db.update({id: key}, value, {upsert: true}, (err, numAffected, affectedDocuments, upsert)=> { retrun })
    // this.data[key] = value
    // return true
  }

  get(key, def = null) {
    return new Promise((resolve, reject) => {
      this.db.findOne(
        { id: key },
        (err, doc) => {
          if (err !== null) {
            return reject(err)
          }
          return doc === null ? resolve(def) : resolve(doc)
        })
    })
  }

  getAll(q) {
    const query = q !== undefined && q.length ? { id: new RegExp(q) } : {}
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
      this.db.remove({}, { multi: true }, (err, numRemoved) => {
        if (err !== null) {
          return reject(err)
        }
        return resolve(numRemoved)
      })
    })
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      this.db.remove({ id: key }, { multi: true }, (err, numRemoved) => {
        if (err !== null) {
          return reject(err)
        }
        return resolve(numRemoved)
      })
    })
  }

  has(key) {
    return new Promise((resolve, reject) => {
      this.db.findOne(
        { id: key },
        (err, doc) => {
          if (err !== null) {
            return reject(err)
          }
          return doc === null ? resolve(false) : resolve(true)
        })
    })
  }

}

// export const engine = new Engine()
export default Engine
