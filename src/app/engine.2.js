import { obj } from 'the-utils'

import debug from 'debug'

const error = debug('app:engine:error')
const log = debug('app:engine')
log.log = console.log.bind(console)

export class Engine {
  constructor() {
    this.data = {}
  }

  set(key, value) {
    this.data[key] = value
    return true
  }

  get(key, def = null) {
    return obj.get(this.data, key, def)
  }

  delete(key) {
    delete this.data[key]
  }

  has(key) {
    return obj.has(this.data, key)
  }
}

export const engine = new Engine()
export default engine
