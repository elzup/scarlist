import { User } from '../../types/'

import actionCreatorFactory from 'typescript-fsa'
const actionCreator = actionCreatorFactory()

export const login = actionCreator<User>('ACTIONS_LOGIN')
export const logout = actionCreator('ACTIONS_LOGOUT')
export const loginFailed = actionCreator('ACTIONS_LOGIN_FAILED')
