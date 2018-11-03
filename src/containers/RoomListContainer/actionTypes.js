// @flow
export const RECEIVE_ROOM_LIST: 'RoomListContainer/RECEIVE_ROOM_LIST' =
  'RoomListContainer/RECEIVE_ROOM_LIST'

export const Actions = {
  RECEIVE_ROOM_LIST,
}

export type ReceiveRoomList = {
  type: typeof RECEIVE_ROOM_LIST,
  roomIds: string[],
}

export type Action = ReceiveRoomList
