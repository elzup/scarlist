import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from './actions'
import { Room } from '../../types'

export type State = { [id: string]: Room }

const initialState: State = {}

export default reducerWithInitialState(initialState).case(
  actions.receiveRoom,
  (state, room) => {
    return {
      ...state,
      [room.id]: room,
    }
  },
)
