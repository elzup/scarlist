// @flow

import _ from 'lodash'
import moment from 'moment'
import config from '../../config'
import type {
  ThunkAction,
  User,
  Room,
  UserRaw,
  RoomRaw,
  RoomUser,
} from '../../types'
import * as roomActions from '../RoomById/actions'
import * as roomListActions from '../RoomListContainer/actions'
import * as userActions from '../UserById/actions'
import { requestData } from '../Firebase/logic'

export function loadData(): ThunkAction {
  return async (dispatch, getState) => {
    dispatch(requestData())
  }
}

function toUser(user: UserRaw, userId: string): User {
  return { id: userId, label: userId }
}

type RoomUserLogs = {
  [roomId: string]: {
    [userId: string]: { [logId: string]: { timestamp: number } },
  },
}

const todayStart = moment().startOf('day')
const currentStart = moment().subtract(config.currentUserLimit, 'seconds')

function toRoom(
  room: RoomRaw,
  roomId: string,
  users: User[],
  roomUserLogs: RoomUserLogs,
): Room {
  const roomLogs = roomUserLogs[roomId]
  const roomUsers: RoomUser[] = users
    .filter((user: User) => !!roomLogs[user.id])
    .map((user: User) => {
      const lastLog = _.findLast(roomLogs[user.id])
      const lastLogTime = moment(lastLog.timestamp)
      return {
        lastLogLabel: lastLogTime.format(),
        lastLogFromNowLabel: lastLogTime.fromNow(),
        user,
        lastLog: lastLog.timestamp,
      }
    })
  const currentUsers = roomUsers.filter(user =>
    currentStart.isBefore(user.lastLog),
  )
  const todayUsers = roomUsers.filter(user => todayStart.isBefore(user.lastLog))

  return { id: roomId, label: roomId, currentUsers, todayUsers }
}

export function receiveData({
  roomsRaw,
  usersRaw,
  roomUserLogs,
}: {
  roomsRaw: { [id: string]: RoomRaw },
  usersRaw: { [id: string]: UserRaw },
  roomUserLogs: RoomUserLogs,
}): ThunkAction {
  return async (dispatch, getState) => {
    const users = _.map(usersRaw, toUser)
    console.log(roomUserLogs)

    const rooms = _.map(roomsRaw, (roomRaw, roomId) =>
      toRoom(roomRaw, roomId, users, roomUserLogs),
    )

    users.map(user => dispatch(userActions.receiveUser(user)))
    rooms.map(room => dispatch(roomActions.receiveRoom(room)))
    dispatch(roomListActions.receiveRoomList(Object.keys(roomsRaw)))
    console.log(users)
    console.log(rooms)
    // make user, room, roomUser
  }
}
