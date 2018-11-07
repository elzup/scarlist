// @flow

import type { State, User } from '../../types'

export const getAuth = (state: State) => state.Auth
export const getLoading = (state: State) => state.Auth.loading
export const getUser = (state: State): ?User => {
  if (state.Auth.loading || !state.Auth.authorized) {
    return null
  }
  return state.Auth.user
}
export const getIsLogin = (state: State) =>
  !state.Auth.loading && state.Auth.authorized
