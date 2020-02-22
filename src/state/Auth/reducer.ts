import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Auth } from '../../types'
import * as actions from './actions'

export type State = Auth

export const initialState = {
  loading: true,
} as State

export default reducerWithInitialState(initialState)
  .case(actions.login, (state, user) => {
    return {
      loading: false,
      user,
      authorized: true,
    }
  })
  .case(actions.logout, () => {
    return {
      loading: false,
      authorized: false,
    }
  })
  .case(actions.loginFailed, () => {
    return {
      loading: false,
      authorized: false,
    }
  })
