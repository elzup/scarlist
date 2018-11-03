// @flow
import { RECEIVE_ROOM_LIST } from './actionTypes'
import type { ReceiveRoomList } from './actionTypes'

export function receiveRoomList(roomIds: string[]): ReceiveRoomList {
  return {
    type: RECEIVE_ROOM_LIST,
    roomIds,
  }
}
