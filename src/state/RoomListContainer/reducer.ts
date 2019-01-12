import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { User } from '../../types'
import * as actions from './actions'

export type State = string[]

export const initialState: State = []

export default reducerWithInitialState(initialState).case(
  actions.receiveRoomList,
  (state, roomIds) => {
    return roomIds
  },
)
