// @flow
import type { Action as AuthAction } from '../containers/Auth/actionTypes'
import type { Action as RoomByIdAction } from '../containers/RoomById/actionTypes'
import type { Action as RoomDayCountByIdAction } from '../containers/RoomDayCountById/actionTypes'
import type { Action as RoomListContainerAction } from '../containers/RoomListContainer/actionTypes'
import type { Action as RoomUserByIdAction } from '../containers/RoomUserById/actionTypes'
import type { Action as SystemAction } from '../containers/System/actionTypes'
import type { Action as UserByIdAction } from '../containers/UserById/actionTypes'

export type ReduxInitAction = {
  type: '@@INIT',
}

export type Action =
  | ReduxInitAction
  | AuthAction
  | RoomByIdAction
  | RoomDayCountByIdAction
  | RoomListContainerAction
  | RoomUserByIdAction
  | SystemAction
  | UserByIdAction
