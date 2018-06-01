import debug from 'debug'
import json from 'json-promise'
import { obj } from 'the-utils'
import {
  personalRoomsConfigs as emitPersonalRoomsConfigs,
  personalRoomsStates as emitPersonalRoomsStates,
  roomConfig as ioRoomConfig,
  roomStates as ioRoomStates,
} from './emit'

const error = debug('app:io:error')
const log = debug('app:io')
// set this namespace to log via console.log
// don't forget to bind to console!
// log.log = console.log.bind(console)

const socketsFunctions = (io, cache) => {
  io.on('connection', (socket) => {
    log('got connection', socket.id)

    socket.on('action', async (action) => {
      try {
        const inAction = typeof action === 'string' ? await json.parse(action) : action
        log(inAction)
        const room = obj.deepGet(inAction, ['payload', 'room'], 'default')
        const type = obj.deepGet(inAction, ['type'], 'default')
        const config = obj.deepGet(inAction, ['payload', 'config'], {})

        switch (type) {
          case 'socket/REQUEST_JOIN_ROOM_CONFIGS': {
            (async () => {
              log('request room configs')
              socket.join('CONFIG_ROOMS')
              const data = await cache.joinRoomConfigs()
              // to sender
              emitPersonalRoomsConfigs(data.configs, socket)
              emitPersonalRoomsStates(data.states, socket)
            })()
            break
          }
          case 'socket/REQUEST_LEAVE_ROOM_CONFIGS': {
            (async () => {
              log('leave room configs')
              socket.leave('CONFIG_ROOMS')
              await cache.leaveRoomConfigs(room)
            })()
            break
          }
          case 'socket/REQUEST_ROOM_CONFIG_CHANGE': {
            (async () => {
              log('request room config change')
              socket.join('CONFIG_ROOMS')
              const data = await cache.changeRoomConfig(room, config)
              ioRoomConfig(data.configs, io)
              ioRoomStates(data.states, io)
              // emitPersonalRoomsConfigs(data.configs, socket)
              // emitPersonalRoomsStates(data.states, socket)
            })()
            break
          }
          case 'socket/REQUEST_ROOM_CONFIG': {
            (async () => {
              log('request room config')
              socket.join('CONFIG_ROOMS')
              const data = await cache.joinRoomConfigs()
              // to sender
              emitPersonalRoomsConfigs(data.configs, socket)
              // emitPersonalRoomsStates(data.states, socket)
            })()
            break
          }
          case 'socket/REQUEST_ROOM_STATE': {
            (async () => {
              log('request room config')
              socket.join('CONFIG_ROOMS')
              const data = await cache.joinRoomConfigs()
              // to sender
              // emitPersonalRoomsConfigs(data.configs, socket)
              emitPersonalRoomsStates(data.states, socket)
            })()
            break
          }
          case 'socket/REQUEST_ROOM_TASK_START': {
            (async () => {
              log('request room config')
              socket.join('CONFIG_ROOMS')
              const startData = await cache.turnOn(room)
              // to sender
              ioRoomStates(startData, io)
              // emitPersonalRoomsStates(startData, socket)
            })()
            break
          }
          case 'socket/REQUEST_ROOM_TASK_STOP': {
            (async () => {
              log('request room config')
              socket.join('CONFIG_ROOMS')
              const stopData = await cache.turnOff(room)
              // to sender
              ioRoomStates(stopData, io)
              // emitPersonalRoomsStates(stopData, socket)
            })()
            break
          }
          case 'socket/REQUEST_JOIN_ROOM':
          case 'socket/REQUEST_LEAVE_ROOM':
          case 'socket/REQUEST_ROOM_DATA':
            break
          default:
            log('unknown action:', type, room)
        }
      } catch (e) { error(e) }
    })

    socket.on('disconnect', async () => {

      // for (let room in rooms) {
      //   socket.leave(room)
      // }
    })
  })
}

export default socketsFunctions
