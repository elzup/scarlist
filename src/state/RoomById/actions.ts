import { Room } from '../../types'

import actionCreatorFactory from 'typescript-fsa'
const actionCreator = actionCreatorFactory()

export const receiveRoom = actionCreator<Room>('ACTIONS_RECEIVE_ROOM')
