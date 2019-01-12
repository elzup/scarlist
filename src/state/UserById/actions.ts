import { User } from '../../types'
import { actionCreatorFactory } from 'typescript-fsa'
const actionCreator = actionCreatorFactory()

export const receiveUser = actionCreator<User>('ACTIONS_RECEIVE_USER')
