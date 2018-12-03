// @flow
import moment from 'moment'

import type { ThunkAction, User, RoomRaw, Room } from '../../types'
import * as actions from './actions'
import * as selectors from './selectors'
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
  console.log({ todayStart, currentStart, room })
  _.each(room.userLast, (v, k) => {
    if (todayStart >= v) {
      todayUsers.push(k)
    } else if (currentStart >= v) {
      currentUsers.push(k)
    }
  })

  return { label: room.label, id, currentUsers, todayUsers }
}
