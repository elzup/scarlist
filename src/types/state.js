// @flow
import type { State as Auth } from '../containers/Auth/reducer'
import type { State as RoomById } from '../containers/RoomById/reducer'
import type { State as RoomDayCountById } from '../containers/RoomDayCountById/reducer'
import type { State as RoomListContainer } from '../containers/RoomListContainer/reducer'
import type { State as System } from '../containers/System/reducer'
import type { State as UserById } from '../containers/UserById/reducer'

export type State = {
  Auth: Auth,
  RoomById: RoomById,
  RoomDayCountById: RoomDayCountById,
  RoomListContainer: RoomListContainer,
  System: System,
  UserById: UserById,
}
