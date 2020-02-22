import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { System } from '../../types'

import * as actions from './actions'

export type State = System

const initialState: State = {
  loadingData: false,
  timestamp: 0,
  timestampStr: '---',
}

export default reducerWithInitialState(initialState).case(
  actions.updateSystem,
  (state, system) => {
    return system
  },
)
