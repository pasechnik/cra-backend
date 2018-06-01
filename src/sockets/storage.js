import debug from 'debug'
import json from 'json-promise'
import { obj } from 'the-utils'
import {
  personalRoomData as emitPersonalRoomData,
} from './emit'

const error = debug('app:io:error')
const log = debug('app:io')
// set this namespace to log via console.log
// don't forget to bind to console!
// log.log = console.log.bind(console)

const socketFunctions = (io, storage) => {
  io.on('connection', (socket) => {
    log('got connection', socket.id)

    socket.on('action', async (action) => {
      try {
        // socket.handshake.headers.referer // page URL
        const inAction = typeof action === 'string' ? await json.parse(action) : action

        log(inAction)
        const room = obj.deepGet(inAction, ['payload', 'room'], 'default')
        const type = obj.deepGet(inAction, ['type'], 'default')

        switch (type) {
          case 'socket/REQUEST_JOIN_ROOM': {
            log('join room:', room)
            socket.join(`DATA_${room}`)
            const joinData = await storage.joinRoom(room)
            // to sender
            emitPersonalRoomData(room, joinData, socket)
            break
          }
          case 'socket/REQUEST_LEAVE_ROOM': {
            log('leave room:', room)
            socket.leave(`DATA_${room}`)
            await storage.leaveRoom(room)
            break
          }
          case 'socket/REQUEST_ROOM_DATA': {
            log('refresh room:', room)
            const refreshData = await storage.joinRoom(room)
            // to sender
            emitPersonalRoomData(room, refreshData, socket)
            break
          }
          case 'socket/REQUEST_JOIN_ROOM_CONFIGS':
          case 'socket/REQUEST_LEAVE_ROOM_CONFIGS':
          case 'socket/REQUEST_ROOM_CONFIG_CHANGE':
          case 'socket/REQUEST_ROOM_CONFIG':
          case 'socket/REQUEST_ROOM_TASK_START':
          case 'socket/REQUEST_ROOM_TASK_STOP':
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
export default socketFunctions
