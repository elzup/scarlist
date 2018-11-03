// @flow
import type { User } from '../../types'

import { RECEIVE_USER } from './actionTypes'
import type { ReceiveUser } from './actionTypes'

export function receiveUser(user: User): ReceiveUser {
  return {
    type: RECEIVE_USER,
    user,
  }
}
