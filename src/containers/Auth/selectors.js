// @flow
import type { State } from '../../types'

export const getAuth = (state: State) => state.Auth
export const getIsLogin = (state: State) =>
  !state.Auth.loading && state.Auth.authorized
