import uuid from 'uuid'
import axios from 'axios'
import debug from 'debug'
import { obj } from 'the-utils'
import { Engine as CassEngine } from './engine-cassandra-async'
import { Engine as Memory } from './engine-object-async'
import { roomConfig as modelRoomConfig, room as modelRoom, roomState as modelRoomState } from '../models'

const dbGates = new CassEngine('gates', 'user')

const error = debug('app:cache:error')
const log = debug('app:cache')

export class Cache {
  constructor(name) {
    this.storage = null

    if (name !== undefined) {
      this.memory = new Memory(`${name}-mem`)
    } else {
      this.memory = new Memory('roomStates')
    }

    this.roomConfigTemplate = modelRoomConfig.cast({})
    this.roomTemplate = modelRoom.cast({})
    this.roomStateTemplate = modelRoomState.cast({})
  }

  /**
   *
   * @param storage
   * @returns {*|null}
   */
  setStorage(storage) {
    this.storage = storage
    return this.storage
  }

  /**
   *
   * @returns {Promise.<void>}
   */
  async autostart() {
    try {
      const configs = await this.getAllRoomConfigs()
      const states = await Promise.all(
        configs.map(c => {
          if (c.autostart === true) {
            return this.startOn(c)
          }
          return this.getRoomState(c.name)
        }),
      )
      return states
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @param data
   * @returns {*}
   */
  async emitConfig(data) {
    try {
      if (this.storage !== null) {
        this.storage.emitConfig(data)
      }
      return data
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @param data
   * @returns {*}
   */
  async emitState(data) {
    try {
      if (this.storage !== null) {
        this.storage.emitState(data)
      }
      return data
    } catch (err) {
      throw err
    }
  }

  // working with data
  /**
   *
   * @param room
   * @param data
   * @returns {Promise.<*>}
   */
  async modifyRoom(room, data) {
    try {
      if (this.storage !== null) {
        return this.storage.modifyRoom(room, data)
      }

      return { ...data, id: room, _id: obj.has(data, '_id') ? data._id : uuid() }
    } catch (err) {
      throw err
    }
  }

  /**
   * Gets data from the room
   * - test created
   *
   * @param room Room Name
   * @returns {Promise}
   */
  async getRoom(room) {
    try {
      if (this.storage !== null) {
        return this.storage.getRoom(room)
      }

      return { ...this.roomTemplate, id: room, _id: uuid() }
    } catch (err) {
      throw err
    }
  }

  /**
   * Gets data from the room and starts cache
   * - test created
   *
   * @param room Room Name
   * @returns {Promise}
   */
  async getRoomData(room) {
    try {
      if (this.storage !== null) {
        return this.storage.getRoomData(room)
      }

      log('using template')
      return []
    } catch (err) {
      throw err
    }
  }

  // working with room cache config
  /**
   * Checks if engine has room config
   * - test created
   *
   * @param room
   * @returns {Promise}
   */
  async hasRoomConfig(room) {
    try {
      return this.engine.has(room)
    } catch (err) {
      throw err
    }
  }

  /**
   * Checks if engine has room state
   * - test created
   *
   * @param room
   * @returns {Promise}
   */
  async hasRoomState(room) {
    try {
      return this.memory.has(room)
    } catch (err) {
      throw err
    }
  }

  /**
   * Gets config non empty data
   * - test created
   *
   * @param room
   * @returns {Promise}
   */
  async verifyRoomConfigExistence(room) {
    try {
      const r = await this.hasRoomConfig(room)
      if (r === false) {
        await this.initRoomConfig(room)
      }
      const d = await this.engine.get(room, { ...this.roomConfigTemplate, id: room })
      return modelRoomConfig.cast(d)
    } catch (err) {
      throw err
    }
  }

  /**
   * Gets config non empty data
   * - test created
   *
   * @param room
   * @returns {Promise}
   */
  async verifyRoomStateExistence(room) {
    try {
      const r = await this.hasRoomState(room)
      if (r === false) {
        await this.initRoomState(room)
      }
      const d = await this.memory.get(room, { ...this.roomStateTemplate, id: room })
      return modelRoomState.cast(d)
    } catch (err) {
      throw err
    }
  }

  /**
   * Sets config data
   * - test created
   *
   * @param room
   * @param data
   * @returns {Promise}
   */
  async setRoomConfig(room, data = {}) {
    try {
      return this.engine.set(room, modelRoomConfig.cast({ ...data, id: room }))
    } catch (err) {
      throw err
    }
  }

  /**
   * Sets state data
   * - test created
   *
   * @param room
   * @param data
   * @returns {Promise}
   */
  async setRoomState(room, data = {}) {
    try {
      return this.memory.set(room, modelRoomState.cast({ ...data, id: room }))
    } catch (err) {
      throw err
    }
  }

  /**
   * Gets config data
   * - test created
   *
   * @param room
   * @returns {Promise}
   */
  async getRoomConfig(room) {
    try {
      return this.verifyRoomConfigExistence(room)
    } catch (err) {
      throw err
    }
  }

  /**
   * Gets config data
   * - test created
   *
   * @param room
   * @returns {Promise}
   */
  async getRoomState(room) {
    try {
      return this.verifyRoomStateExistence(room)
    } catch (err) {
      throw err
    }
  }

  /**
   * Initialize config data
   * - test created
   *
   * @param room
   * @returns {Promise}
   */
  async initRoomConfig(room) {
    try {
      return this.setRoomConfig(room, { ...this.roomConfigTemplate, id: room })
    } catch (err) {
      throw err
    }
  }

  /**
   * Initialize config data
   * - test created
   *
   * @param room
   * @returns {Promise}
   */
  async initRoomState(room) {
    try {
      return this.setRoomState(room, { ...this.roomStateTemplate, id: room })
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @returns {Promise.<>}
   */
  async joinRoomConfigs() {
    try {
      const configs = await this.getAllRoomConfigs()
      const states = await Promise.all(configs.map(t => this.getRoomState(t.name)))
      return { configs, states }
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @returns {Promise.<boolean>}
   */
  async leaveRoomConfigs() {
    return true
  }

  /**
   *
   * @param room
   * @param data
   * @returns {Promise.<>}
   */
  async changeRoomConfig(room, data) {
    try {
      await this.modifyRoomConfig(room, data)
      const configs = await this.getAllRoomConfigs()
      const states = await Promise.all(configs.map(c => this.getRoomState(c.name)))
      return { configs, states }
    } catch (err) {
      throw err
    }
  }

  /**
   * Returns fetcher promise
   * - test created
   *
   * @param room
   * @param parent
   * @returns {Promise}
   */
  async actionSelector(room, parent = []) {
    try {
      log('action', room)

      const gates = await dbGates.getAll()
      const gateObject = gates.find(t => t.active === true)
      const gate = gateObject === undefined ? 'http://172.22.16.87:9000/gate' : gateObject.address
      const config = await this.getRoomConfig(room)
      if (config.func !== null) {
        return new Function('axios, log, param, gate', config.func)(axios, log, parent, gate)
      }

      return []
    } catch (err) {
      throw err
    }
  }

  /**
   * Modifies config data
   * - test created
   *
   * @param room
   * @param data
   * @returns {Promise}
   */
  async modifyRoomConfig(room, data) {
    try {
      const config = await this.getRoomConfig(room)
      const newConfig = modelRoomConfig.cast({ ...config, ...data, id: room })
      await this.setRoomConfig(room, newConfig)
      return newConfig
    } catch (err) {
      throw err
    }
  }

  /**
   * Modifies config state
   * - test created
   *
   * @param room
   * @param data
   * @returns {Promise}
   */
  async modifyRoomState(room, data) {
    try {
      const state = await this.getRoomState(room)
      const newState = modelRoomState.cast({ ...state, ...data, id: room })
      await this.setRoomState(room, newState)

      const states = await this.getAllRoomStates()
      this.storage.emitState(states)
      // this.storage
      return newState
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @param room
   * @returns {Promise}
   */
  async turnOn(room) {
    try {
      log('turnOn', room)
      const config = await this.getRoomConfig(room)
      let state = await this.getRoomState(room)

      if (state.started !== true && config.enabled === true && config.valid === true) {
        log('start cache', room)
        this.spinoff(10, room)
        state = await this.modifyRoomState(room, { started: true })
        // log('modified', state)
        return state
      }

      state = await this.getRoomState(config.id)
      return state
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @param config
   * @returns {Promise}
   */
  async startOn(config) {
    try {
      let state = await this.getRoomState(config.id)
      if (config.enabled === true && config.valid === true) {
        log('start cache', config.id)
        this.spinoff(10, config.id)

        state = await this.modifyRoomState(config.id, { started: true })
        return state
      }

      state = await this.getRoomState(config.id)
      return state
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @param room
   * @returns {Promise}
   */
  async turnOff(room) {
    try {
      // const state = await this.getRoomState(room)
      log('turn off', room)
      return this.modifyRoomState(room, { started: false })
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @param config
   * @returns {Promise}
   */
  async executeTaskConfig(config) {
    try {
      const room = config.id
      log('executeTaskConfig', room)
      const parentData = await this.getCachedData(config.parent)

      return this.makeFetch(room, parentData)
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @param room
   * @returns {Promise.<*>}
   */
  async getCachedData(room) {
    try {
      log('getCachedData', room)
      // empty data
      if (room === null) {
        log('empty data', room)
        return []
      }

      // current state
      const state = await this.getRoomState(room)

      // task is executed -> return data
      if (state.executed) {
        log('using cached data', room)
        return this.getRoomData(room)
      }

      // -> execute task
      // get config
      const config = await this.getRoomConfig(room)

      // get data
      const data = await this.executeTaskConfig(config)

      // run autoupdater
      this.autoUpdater(room)

      return data
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @param room
   * @param parentData
   * @returns {Promise}
   */
  async makeFetch(room, parentData) {
    try {
      log('makeFetch', room)
      await this.modifyRoom(room, { refreshing: true })
      let data = []
      try {
        data = await this.actionSelector(room, parentData)
      } catch (err) {
        error(err)
        data = []
      }
      log('data', room, data)
      await this.modifyRoom(room, { refreshing: false, data })

      return data
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @param room
   */
  async runTask(room) {
    try {
      log('runTask', room)
      const config = await this.getRoomConfig(room)
      let state = await this.getRoomState(room)

      if (state.started === false) {
        log('should be stopped', room)
        return state
      }

      if (config.valid === false) {
        log('task is not valid', room)
        state = await this.modifyRoomState(room, { started: false })
        return state
      }

      if (config.enabled === false) {
        log('task is disabled', room)
        state = await this.modifyRoomState(room, { started: false })
        return state
      }

      await this.executeTaskConfig(config)
      await this.modifyRoomState(room, { executed: true })

      return this.autoUpdater(room)
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @param ms
   * @returns {Promise}
   */
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   *
   * @param ms
   * @param room
   * @returns {Promise.<*>}
   */
  async spinoff(ms, room) {
    try {
      log('spinoff', room)
      await this.delay(ms)
      return this.runTask(room)
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @param room
   * @returns {*|Promise.roomConfig}
   */
  async autoUpdater(room) {
    try {
      let state = await this.getRoomState(room)
      const config = await this.getRoomConfig(room)

      if (state.idTimeOut !== null) {
        clearTimeout(state.idTimeOut)
        state.idTimeOut = null
      }

      if (config.valid === false) {
        log('task in not valid', room)
        state = await this.modifyRoomState(room, { idTimeOut: null, started: false })
        return state
      }
      if (config.enabled === false) {
        log('task is not enabled', room)
        state = await this.modifyRoomState(room, { idTimeOut: null, started: false })
        return state
      }

      if (config.autoupdate === true && state.started === true) {
        log('create timeout', room)
        const updateTimeOut = parseInt(config.updateTimeOut, 10)
        this.spinoff(updateTimeOut, room)
      } else if (state.started === true) {
        log('switching off', room)
        state.started = false
      }

      state = await this.modifyRoomState(room, state)
      return state
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @returns {Promise.<*>}
   */
  async getAllRoomConfigs() {
    try {
      return this.engine.getAll()
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @returns {Promise.<*>}
   */
  async getAllRoomStates() {
    try {
      return this.memory.getAll()
    } catch (err) {
      throw err
    }
  }
}

// export const cache = new Cache()
export default Cache
