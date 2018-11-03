// @flow
import type { RoomDayCounts } from '../../types'

export const RECEIVE_COUNT: 'RoomDayCountById/RECEIVE_COUNT' =
  'RoomDayCountById/RECEIVE_COUNT'
export const RECEIVE_COUNTS: 'RoomDayCountById/RECEIVE_COUNTS' =
  'RoomDayCountById/RECEIVE_COUNTS'

export const Actions = {
  RECEIVE_COUNT,
  RECEIVE_COUNTS,
}

export type ReceiveCount = {
  type: typeof RECEIVE_COUNT,
  count: RoomDayCounts,
}

export type ReceiveCounts = {
  type: typeof RECEIVE_COUNTS,
  counts: { [id: string]: RoomDayCounts },
}

export type Action = ReceiveCount | ReceiveCounts
