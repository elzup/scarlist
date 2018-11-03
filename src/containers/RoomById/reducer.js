// @flow
import type { Action, Room } from '../../types'
import { Actions } from './actionTypes'

export type State = { [id: string]: Room }

const initialState: State = {}

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Actions.RECEIVE_ROOM:
      return {
        ...state,
        [action.room.id]: action.room,
      }
    default:
      return state
  }
}
