export const personalRoomData = (room, data, socket) => {
  const response = {
    type: 'socket/RESPONSE_ROOM_DATA',
    payload: { room, ...data },
  }
  return socket.emit('action', response)
}

export const personalRoomsConfigs = (data, socket) => {
  const response = {
    type: 'socket/RESPONSE_ROOMS_CONFIG',
    payload: data,
  }
  return socket.emit('action', response)
}

export const personalRoomsStates = (data, socket) => {
  const response = {
    type: 'socket/RESPONSE_ROOMS_STATES',
    payload: data,
  }
  return socket.emit('action', response)
}

export const personalRoomConfig = (room, data, socket) => {
  const response = {
    type: 'socket/RESPONSE_ROOM_CONFIG_CHANGE',
    payload: { room, ...data },
  }
  return socket.emit('action', response)
}

export const personalRoomState = (room, data, socket) => {
  const response = {
    type: 'socket/RESPONSE_ROOM_STATE_CHANGE',
    payload: { room, ...data },
  }
  return socket.emit('action', response)
}

export const roomConfig = (data, io) => {
  const response = {
    type: 'socket/RESPONSE_ROOMS_CONFIG',
    payload: data,
  }
  return io.to('CONFIG_ROOMS').emit('action', response)
}

export const roomStates = (data, io) => {
  const response = {
    type: 'socket/RESPONSE_ROOMS_STATES',
    payload: data,
  }
  return io.to('CONFIG_ROOMS').emit('action', response)
}

export const roomData = (room, data, io) => {
  const response = {
    type: 'socket/RESPONSE_ROOM_DATA',
    payload: { room, ...data },
  }
  return io.to(room).emit('action', response)
}

export const emits = {
  roomData,
  roomConfig,
  roomStates,
  personalRoomData,
  personalRoomConfig,
  personalRoomsConfigs,
  personalRoomState,
  personalRoomsStates,
}
export default emits
