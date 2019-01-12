import { State } from './reducer'

export const UPDATE_STATE: 'UserForm/UPDATE_STATE' = 'UserForm/UPDATE_STATE'

export const Actions = {
  UPDATE_STATE,
}

export type UpdateState = {
  type: typeof UPDATE_STATE
  state: State
}

export type Action = UpdateState
