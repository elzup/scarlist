// @flow
import type { User } from '../../types/'

export const LOGIN: 'Auth/LOGIN' = 'Auth/LOGIN'
export const LOGOUT: 'Auth/LOGOUT' = 'Auth/LOGOUT'

export const Actions = {
  LOGIN,
  LOGOUT,
}

export type Login = {
  type: typeof LOGIN,
  user: User,
}
export type Logout = {
  type: typeof LOGOUT,
}

export type Action = Login | Logout
