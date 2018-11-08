// @flow
import type { State } from './reducer'

import { UPDATE_STATE } from './actionTypes'
import type { UpdateState } from './actionTypes'

export function updateState(state: State): UpdateState {
  return {
    type: UPDATE_STATE,
    state,
  }
}
