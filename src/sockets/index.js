import json from 'json-promise'
import emit from './emit'
import { obj } from 'the-utils'

import debug from 'debug'

const error = debug('app:io:error')
const log = debug('app:io')
// set this namespace to log via console.log
// don't forget to bind to console!
log.log = console.log.bind(console)

const socket = (io, storage) => {
  io.on('connection', (socket) => {
    log('got connection', socket.id)

    socket.on('action', async (action) => {
      try {
        if (typeof action === 'string') {
          log('get action:', typeof action, action)
          action = await json.parse(action)
        }
        if (action.type === 'socket/REQUEST_JOIN_ROOM') { // DID MOUNT
          const room = obj.deepGet(action, ['payload', 'room'], 'default')
          log('join room:', room)
          socket.join(`DATA_${room}`)
          storage.getRoomData(room)
            .then(data => emit.personalRoomData(room, data, socket))
            .catch(err => error(err))
          // only to sender
          // socket.handshake.headers.referer // page URL
        } else if (action.type === 'socket/REQUEST_LEAVE_ROOM') { // WILL UNMOUNT
          const room = obj.deepGet(action, ['payload', 'room'], 'default')
          log('leave room:', room)
          socket.leave(`DATA_${room}`)
          storage.leaveRoom(room)
        } else if (action.type === 'socket/REQUEST_REFRESH_ROOM') {
          const room = obj.deepGet(action, ['payload', 'room'], 'default')
          log('refresh room:', room)
          storage.refreshRoom(room)
            .catch(err => error(err))
          // only to sender
          // emit.personalRoomData(room, data, socket)
          // storage.refreshRoom(io, socket, room)
          // start cache room action.room rebuild
        } else if (action.type === 'socket/REQUEST_ROOM_DATA') { // refresh frond data
          const room = obj.deepGet(action, ['payload', 'room'], 'default')
          log('fetch room:', room)
          const data = storage.returnRoomData(room)
            .then(data => emit.personalRoomData(room, data, socket))
            .catch(err => error(err))
          // only to sender
          // socket.handshake.headers.referer // page URL
        }
      } catch (e) {

      }
    })

    socket.on('action', (action) => {
      if (typeof action === 'string') {
        log('get action:', typeof action, action)
        action = JSON.parse(action)
      }
      if (action.type === 'socket/REQUEST_ROOMS_CONFIG') { // DID MOUNT
        log('request rooms config')
        socket.join('CONFIG_ROOMS')
        storage.getRoomsConfigs()
          .then(data => emit.personalRoomsConfigs(data, socket))
          .catch(err => error(err))
        // only to sender
        // socket.handshake.headers.referer // page URL
      }
    })

    socket.on('action', (action) => {
      if (typeof action === 'string') {
        log('get action:', typeof action, action)
        action = JSON.parse(action)
      }
      if (action.type === 'socket/REQUEST_ROOM_CONFIG_CHANGE') { // DID MOUNT
        const room = obj.deepGet(action, ['payload', 'room'], 'default')
        const config = obj.deepGet(action, ['payload', 'config'], {})
        log('request rooms config')
        socket.join('CONFIG_ROOMS')
        storage.changeRoomConfig(room, config)
          .then(data => emit.personalRoomConfig(room, data, socket))
          .catch(err => error(err))
        // only to sender
        // socket.handshake.headers.referer // page URL
      }
    })

    socket.on('action', (action) => {
      if (typeof action === 'string') {
        log('get action:', typeof action, action)
        action = JSON.parse(action)
      }
      if (action.type === 'socket/REQUEST_ROOM_TASK_START') { // DID MOUNT
        const room = obj.deepGet(action, ['payload', 'room'], 'default')
        log('request rooms task start ', room)
        storage.requestCache(room)
          .then(data => emit.personalRoomConfig(room, data, socket))
          .catch(err => error(err))
        // only to sender
        // socket.handshake.headers.referer // page URL
      }
    })

    socket.on('action', (action) => {
      if (typeof action === 'string') {
        log('get action:', typeof action, action)
        action = JSON.parse(action)
      }
      if (action.type === 'socket/REQUEST_ROOM_TASK_STOP') { // DID MOUNT
        const room = obj.deepGet(action, ['payload', 'room'], 'default')
        log('request rooms task start')
        storage.clearRoomCache(room)
          .then(data => emit.personalRoomConfig(room, data, socket))
          .catch(err => error(err))
        // only to sender
        // socket.handshake.headers.referer // page URL
      }
    })

    socket.on('disconnect', () => {

      // for (let room in rooms) {
      //   socket.leave(room)
      // }
    })
  })
}
export default socket
