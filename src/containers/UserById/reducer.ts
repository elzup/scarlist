import { Action, User } from '../../types'
import { Actions } from './actionTypes'

export type State = { [id: string]: User }

const initialState: State = {}

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Actions.RECEIVE_USER:
      return {
        ...state,
        [action.user.id]: action.user,
      }
    default:
      return state
  }
}
