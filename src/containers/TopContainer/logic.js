// @flow

import _ from 'lodash'
import moment from 'moment'
import config from '../../config'
import type { ThunkAction, User, Room, RoomRaw, RoomUser } from '../../types'
import * as roomActions from '../RoomById/actions'
import * as roomListActions from '../RoomListContainer/actions'
import * as userActions from '../UserById/actions'
import { requestData } from '../Firebase/logic'
import { dataLoadingStart, dataLoadingEnd } from '../System/logic'

export function loadData(): ThunkAction {
  return async (dispatch, getState) => {
    dispatch(dataLoadingStart())
    await dispatch(requestData())
    dispatch(dataLoadingEnd())
  }
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
  if (!roomUserLogs) {
    return { ...room, id: roomId, currentUsers: [], todayUsers: [] }
  }
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
  const todayUsers = roomUsers.filter(
    user =>
      todayStart.isBefore(user.lastLog) && currentStart.isAfter(user.lastLog),
  )

  return { ...room, id: roomId, currentUsers, todayUsers }
}

export function receiveData({
  roomsRaw,
  usersRaw,
  roomUserLogs,
}: {
  roomsRaw: { [id: string]: RoomRaw },
  usersRaw: { [id: string]: User },
  roomUserLogs: RoomUserLogs,
}): ThunkAction {
  return async (dispatch, getState) => {
    const users = _.values(usersRaw)
    const rooms = _.map(roomsRaw, (roomRaw, roomId) =>
      toRoom(roomRaw, roomId, users, roomUserLogs),
    )

    users.map(user => dispatch(userActions.receiveUser(user)))
    rooms.map(room => dispatch(roomActions.receiveRoom(room)))
    dispatch(roomListActions.receiveRoomList(Object.keys(roomsRaw)))
    // make user, room, roomUser
  }
}
