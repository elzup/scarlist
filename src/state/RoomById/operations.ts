import moment from 'moment'

import _ from 'lodash'
import { ThunkAction, RoomRaw, Room } from '../../types/index'
import config from '../../config/index'
import * as actions from './actions'

export const saveRoom = (id: string, room: RoomRaw): ThunkAction => {
  return async (dispatch, getState) => {
    dispatch(actions.receiveRoom(toRoom(id, room)))
  }
}

function toRoom(id: string, room: RoomRaw): Room {
  if (!room.userLast) {
    return { id, label: room.label, currentUsers: [], todayUsers: [] }
  }
  const todayStart =
    moment()
      .startOf('day')
      .unix() * 1000
  const currentStart =
    moment()
      .subtract(config.currentUserLimit, 'seconds')
      .unix() * 1000

  const currentUsers = [] as { id: string; timestamp: number }[]
  const todayUsers = [] as { id: string; timestamp: number }[]

  _.each(room.userLast, (timestamp, id) => {
    if (timestamp >= currentStart) {
      currentUsers.push({ id, timestamp })
    } else if (timestamp >= todayStart) {
      todayUsers.push({ id, timestamp })
    }
  })

  return { label: room.label, id, currentUsers, todayUsers }
}
