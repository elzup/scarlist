// @flow
import type { State } from '../../types'

export const getUser = (state: State, userId: string) => state.UserById[userId]
