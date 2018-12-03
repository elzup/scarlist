// @flow
import moment from 'moment'

import type { ThunkAction, RoomRaw, Room } from '../../types'
import * as actions from './actions'
import config from '../../config'
import _ from 'lodash'

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

  const currentUsers = []
  const todayUsers = []

  _.each(room.userLast, (timestamp, id) => {
    if (timestamp >= todayStart) {
      todayUsers.push({ id, timestamp })
    } else if (timestamp >= currentStart) {
      currentUsers.push({ id, timestamp })
    }
  })

  return { label: room.label, id, currentUsers, todayUsers }
}
