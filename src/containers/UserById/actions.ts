import { User } from '../../types'

import { RECEIVE_USER } from './actionTypes'
import { ReceiveUser } from './actionTypes'

export function receiveUser(user: User): ReceiveUser {
  return {
    type: RECEIVE_USER,
    user,
  }
}
