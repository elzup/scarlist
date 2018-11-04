// @flow
import type { User } from '../../types/'

import { LOGIN, LOGOUT, LOGIN_FAILED } from './actionTypes'
import type { Login, Logout, LoginFailed } from './actionTypes'

export function login(user: User): Login {
  return {
    type: LOGIN,
    user,
  }
}
export function logout(): Logout {
  return {
    type: LOGOUT,
  }
}
export function loginFailed(): LoginFailed {
  return {
    type: LOGIN_FAILED,
  }
}
