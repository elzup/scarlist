// @flow
import type { Log } from '../../types'

import { RECEIVE_LOGS } from './actionTypes'
import type { ReceiveLogs } from './actionTypes'

export function receiveLogs(
  userId: string,
  roomId: string,
  logs: Log[],
): ReceiveLogs {
  return {
    type: RECEIVE_LOGS,
    userId,
    roomId,
    logs,
  }
}
