import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from './actions'
import { RoomDayCounts } from '../../types/'

export type State = { [id: string]: RoomDayCounts }

export const initialState = {} as State

export default reducerWithInitialState(initialState)
  .case(actions.receiveCount, (state, count) => {
    return { ...state, [count.id]: count }
  })
  .case(actions.receiveCounts, (state, counts) => {
    return { ...state, ...counts }
  })
