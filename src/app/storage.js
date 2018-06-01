import debug from 'debug'
import { Engine } from './engine-object-async'
import { obj } from 'the-utils'
import emit from '../sockets/emit'
import { roomConfig as RoomConfig, room as Room, roomState as RoomState } from '../models'

const error = debug('app:storage:error')
const log = debug('app:storage')
log.log = console.log.bind(console)

export class Storage {
  constructor(name) {
    this.io = null
    this.cache = null
    const Name = (name === undefined ? 'rooms' : name)
    this.roomConfigTemplate = RoomConfig.cast({})
    this.roomTemplate = Room.cast({})
    this.roomStateTemplate = RoomState.cast({})
    this.engine = new Engine(Name)
  }

  /**
   *
   * @param io
   */
  setIO(io) {
    this.io = io
    return this.io
  }

  /**
   *
   * @param room
   * @param data
   * @returns {*}
   */
  emitData(room, data) {
    if (this.io !== null) {
      emit.roomData(`DATA_${room}`, data, this.io)
    }

    return data
  }

  /**
   *
   * @param data
   * @returns {*}
   */
  emitConfig(data) {
    if (this.io !== null) {
      emit.roomConfig(data, this.io)
    }
    return data
  }

  /**
   *
   * @param data
   * @returns {*}
   */
  emitState(data) {
    if (this.io !== null) {
      emit.roomStates(data, this.io)
    }
    return data
  }

  /**
   *
   * @param cache
   */
  setCache(cache) {
    this.cache = cache
    this.cache.setStorage(this)
  }

  /**
   *
   * @param room
   * @returns {Promise.<{fields: Array}>}
   */
  async prepareRoomData(room) {
    try {
      const data = await this.getRoom(room)
      const config = await this.getRoomConfig(room)
      // const state = await this.getRoomState(room)

      return { ...data, fields: config.selectedFields }
    } catch (e) { error(e) }
  }

  /**
   * Sets join room and returns data
   * - test created
   *
   * @param room Room Name
   * @returns Promise
   */
  async joinRoom(room) {
    try {
      log('get room data', room)
      const data = await this.prepareRoomData(room)
      return data
    } catch (e) { error(e) }
  }

  /**
   *
   * @param room
   * @returns {Promise.<boolean>}
   */
  async leaveRoom(room) {
    // clear room data ??
    // decrease room subscribers ?
    // if (this.isRoomEmpty(room)) {
    //   this.clearRoomCache(room)
    // }

    return true
  }

  /**
   *
   * @param room
   * @returns {Promise.<*>}
   */
  async getRoomConfig(room) {
    if (this.cache !== null) {
      return this.cache.getRoomConfig(room)
    }

    return { ...this.roomCacheTemplate, name: room }
  }

  /**
   *
   * @param room
   * @returns {*}
   */
  async getRoomState(room) {
    if (this.cache !== null) {
      return this.cache.getRoomState(room)
    }

    return { ...this.roomStateTemplate, name: room }
  }

  /**
   *
   * @param room
   * @returns {Promise.<*>}
   */
  async hasRoom(room) {
    return this.engine.has(room)
  }

  /**
   *
   * @param room
   */
  async verifyRoomExistence(room) {
    const exist = await this.hasRoom(room)
    if (!exist) {
      await this.initRoom(room)
    }
    const data = await this.engine.get(room, { ...this.roomTemplate, name: room })
    return data
  }

  /**
   *
   * @param room
   * @param data
   * @returns {*}
   */
  async setRoom(room, data = {}) {
    return this.engine.set(room, { ...data, name: room })
  }

  /**
   * Returns room data
   * @param room
   * @returns {*}
   */
  async getRoom(room) {
    return this.verifyRoomExistence(room)
  }

  /**
   * Returns room data
   * @param room
   * @returns {*}
   */
  async getRoomData(room) {
    const r = await this.verifyRoomExistence(room)
    return r.data
  }

  /**
   *
   * @param room
   * @param data
   */
  async modifyRoom(room, data) {
    const olddata = await this.getRoom(room)
    const mergeddata = { ...olddata, ...data }
    const r = await this.setRoom(room, mergeddata)

    const result = await this.prepareRoomData(room)
    this.emitData(room, result)
    return result
  }

  /**
   *
   * @param room
   * @returns {*}
   */
  async initRoom(room) {
    return this.setRoom(room, this.roomTemplate)
  }

  /**
   *
   * @param room
   * @returns {boolean}
   */
  isRoomEmpty(room) {
    if (this.io !== null) {
      return !this.io.sockets.adapter.rooms[room]
    }

    return true
  }

}

export default Storage
