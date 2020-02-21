import actionCreatorFactory from 'typescript-fsa'
import { Room } from '../../types'

const actionCreator = actionCreatorFactory()

export const receiveRoom = actionCreator<Room>('ACTIONS_RECEIVE_ROOM')
