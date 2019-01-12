import { RoomDayCounts } from '../../types'

import actionCreatorFactory from 'typescript-fsa'
const actionCreator = actionCreatorFactory()

export const receiveCount = actionCreator<RoomDayCounts>(
  'ACTIONS_RECEIVE_COUNT',
)
export const receiveCounts = actionCreator<{ [id: string]: RoomDayCounts }>(
  'ACTIONS_RECEIVE_COUNTS',
)
