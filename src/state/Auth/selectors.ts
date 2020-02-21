import _ from 'lodash'
import { State, User } from '../../types'

export const getAuth = (state: State) => state.Auth
export const getLoading = (state: State) => state.Auth.loading
export const getUser = (state: State): User | null => {
  if (state.Auth.loading || !state.Auth.authorized) {
    return null
  }
  return state.Auth.user
}
export const getIsLogin = (state: State) =>
  !state.Auth.loading && state.Auth.authorized

export const getSetuped = (state: State) => {
  const user = getUser(state)

  return user && !!user.macAddrs
}

export const getConfirmedRooms = (state: State): false | string[] => {
  const user = getUser(state)

  if (!user || !user.loggedRooms || _.keys(user.loggedRooms).length === 0) {
    return false
  }
  return Object.keys(user.loggedRooms)
}
