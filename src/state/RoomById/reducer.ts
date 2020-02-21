import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Room } from '../../types'
import * as actions from './actions'

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
