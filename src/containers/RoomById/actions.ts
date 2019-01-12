import { Room } from '../../types'

import { RECEIVE_ROOM } from './actionTypes'
import { ReceiveRoom } from './actionTypes'

export function receiveRoom(room: Room): ReceiveRoom {
  return {
    type: RECEIVE_ROOM,
    room,
  }
}
