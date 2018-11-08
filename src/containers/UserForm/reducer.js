// @flow
import type { Action } from '../../types'
import { Actions } from './actionTypes'

export type State = {
  loading: boolean,
}

export const initialState: State = {
  loading: false,
}

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Actions.UPDATE_STATE:
      return action.state
    default:
      return state
  }
}
