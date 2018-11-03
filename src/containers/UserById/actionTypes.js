// @flow
import type { User } from '../../types'

export const RECEIVE_USER: 'UserById/RECEIVE_USER' = 'UserById/RECEIVE_USER'

export const Actions = {
  RECEIVE_USER,
}

export type ReceiveUser = {
  type: typeof RECEIVE_USER,
  user: User,
}

export type Action = ReceiveUser
