// @flow
import type { RoomDayCounts } from '../../types'

import { RECEIVE_COUNT, RECEIVE_COUNTS } from './actionTypes'
import type { ReceiveCount, ReceiveCounts } from './actionTypes'

export function receiveCount(count: RoomDayCounts): ReceiveCount {
  return {
    type: RECEIVE_COUNT,
    count,
  }
}
export function receiveCounts(counts: {
  [id: string]: RoomDayCounts,
}): ReceiveCounts {
  return {
    type: RECEIVE_COUNTS,
    counts,
  }
}
