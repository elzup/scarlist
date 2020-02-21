import { actionCreatorFactory } from 'typescript-fsa'
import { User } from '../../types'

const actionCreator = actionCreatorFactory()

export const receiveUser = actionCreator<User>('ACTIONS_RECEIVE_USER')
