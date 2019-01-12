import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { User } from '../../types'
import * as actions from './actions'

export type State = { [id: string]: User }

const initialState: State = {}

export default reducerWithInitialState(initialState).case(
  actions.receiveUser,
  (state, user) => {
    return {
      ...state,
      [user.id]: user,
    }
  },
)
