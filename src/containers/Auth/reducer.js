// @flow
import type { Action, Auth } from '../../types'
import { Actions } from './actionTypes'

export type State = Auth

export const initialState: State = {
  loading: true,
}

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Actions.LOGIN:
      return {
        loading: false,
        user: action.user,
        authorized: true,
      }

    case Actions.LOGIN_FAILED:
      return {
        loading: false,
        authorized: false,
      }

    case Actions.LOGOUT:
      return initialState

    default:
      return state
  }
}
