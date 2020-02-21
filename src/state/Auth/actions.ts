import actionCreatorFactory from 'typescript-fsa'
import { User } from '../../types/'

const actionCreator = actionCreatorFactory()

export const login = actionCreator<User>('ACTIONS_LOGIN')
export const logout = actionCreator('ACTIONS_LOGOUT')
export const loginFailed = actionCreator('ACTIONS_LOGIN_FAILED')
