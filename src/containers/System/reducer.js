// @flow
import type { Action, System } from '../../types'
import { Actions } from './actionTypes'

export type State = System

const initialState: State = {
  timestamp: 0,
  timestampStr: '---',
}

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Actions.UPDATE_SYSTEM:
      return action.system
    default:
      return state
  }
}
