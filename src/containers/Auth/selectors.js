// @flow
import type { State } from '../../types'

export const getIsLogin = (state: State) => state.Auth.authorized
export const getUser = (state: State) => state.Auth.user
