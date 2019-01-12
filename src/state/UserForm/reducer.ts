import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from './actions'

export type State = {
  loading: boolean
}

export const initialState: State = {
  loading: false,
}

export default reducerWithInitialState(initialState).case(
  actions.updateState,
  (state, newState) => {
    return newState
  },
)
