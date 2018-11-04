// @flow

import _ from 'lodash'

import type { ThunkAction, RoomDayCounts } from '../../types'
import * as actions from './actions'

type CountRaw = {
  [roomId: string]: {
    [userId: string]: {
      month: { [ym: string]: 2 },
      day: { [ym: string]: { [d: string]: number } },
      hour: { [ym: string]: { [d: string]: { [h: string]: number } } },
    },
  },
}

const countToColor = count => {
  // 0 =>
  // 1-19 =>
  // 20-49 =>
  // over 50 => orange
  return `hsl(240, 70%, 50%)`
}

export function saveCounts(counts: CountRaw): ThunkAction {
  return async (dispatch, getState) => {
    const roomDayCounts: { [id: string]: RoomDayCounts } = {}
    _.each(counts, (room, roomId) => {
      _.each(room, (user, userId) => {
        _.each(user.hour, (days, ym) => {
          _.each(days, (hours, d) => {
            const roomDayId = `${roomId}-${ym}-${d}`
            if (!roomDayCounts[roomDayId]) {
              roomDayCounts[roomDayId] = {
                id: roomDayId,
                users: [],
              }
            }
            const userDay = { userId }
            _.range(0, 24).forEach(hour => {
              const count = hours[String(hour).padStart(2, '0')]
              const hs = `${hour}`.padStart(2, '0')
              userDay[hs] = count || 0
              userDay[`${hs}Color`] = countToColor(count)
            })
            roomDayCounts[roomDayId].users.push(userDay)
          })
        })
      })
    })
    dispatch(actions.receiveCounts(roomDayCounts))
  }
}
