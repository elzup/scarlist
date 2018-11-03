// @flow
import type { User } from '../../types/'

import { LOGIN, LOGOUT } from './actionTypes'
import type { Login, Logout } from './actionTypes'

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
