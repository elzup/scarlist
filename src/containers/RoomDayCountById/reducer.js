// @flow
import type { Action } from '../../types'
import { Actions } from './actionTypes'

export type State = {}

export const initialState: State = {}

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Actions.RECEIVE_COUNT:
      return { ...state, [action.count.id]: action.count }
    case Actions.RECEIVE_COUNTS:
      return {
        ...state,
        ...action.counts,
      }
    default:
      return state
  }
}
