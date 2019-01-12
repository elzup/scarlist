import { Room } from '../../types'

export const RECEIVE_ROOM: 'RoomById/RECEIVE_ROOM' = 'RoomById/RECEIVE_ROOM'

export const Actions = {
  RECEIVE_ROOM,
}

export type ReceiveRoom = {
  type: typeof RECEIVE_ROOM
  room: Room
}

export type Action = ReceiveRoom
