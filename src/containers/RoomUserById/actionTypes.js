// @flow
import type { Log } from '../../types'

export const RECEIVE_LOGS: 'RoomUserById/RECEIVE_LOGS' =
  'RoomUserById/RECEIVE_LOGS'

export const Actions = {
  RECEIVE_LOGS,
}

export type ReceiveLogs = {
  type: typeof RECEIVE_LOGS,
  userId: string,
  roomId: string,
  log: Log,
}

export type Action = ReceiveLogs
