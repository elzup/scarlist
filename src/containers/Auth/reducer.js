// @flow
import type { Action, Auth } from '../../types'
import { Actions } from './actionTypes'

export type State = Auth

export const initialState: State = {
  authorized: false,
}

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Actions.LOGIN:
      return {
        user: { ...initialState.user, ...action.user },
        authorized: true,
      }

    case Actions.LOGOUT:
      return initialState

    default:
      return state
  }
}
