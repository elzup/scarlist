// @flow
import type { User } from '../../types/'

export const LOGIN: 'Auth/LOGIN' = 'Auth/LOGIN'
export const LOGOUT: 'Auth/LOGOUT' = 'Auth/LOGOUT'
export const LOGIN_FAILED: 'Auth/LOGIN_FAILED' = 'Auth/LOGIN_FAILED'

export const Actions = {
  LOGIN,
  LOGOUT,
  LOGIN_FAILED,
}

export type Login = {
  type: typeof LOGIN,
  user: User,
}
export type Logout = {
  type: typeof LOGOUT,
}

export type LoginFailed = {
  type: typeof LOGIN_FAILED,
}

export type Action = Login | Logout | LoginFailed
