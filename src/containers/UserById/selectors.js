// @flow
import type { State } from '../../types'

export const getUsers = (state: State, userId: string) => state.UserById[userId]
