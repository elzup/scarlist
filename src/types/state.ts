import { State as Auth } from '../containers/Auth/reducer'
import { State as RoomById } from '../containers/RoomById/reducer'
import { State as RoomDayCountById } from '../containers/RoomDayCountById/reducer'
import { State as RoomListContainer } from '../containers/RoomListContainer/reducer'
import { State as System } from '../containers/System/reducer'
import { State as UserById } from '../containers/UserById/reducer'
import { State as UserForm } from '../containers/UserForm/reducer'

export type State = {
  Auth: Auth
  RoomById: RoomById
  RoomDayCountById: RoomDayCountById
  RoomListContainer: RoomListContainer
  System: System
  UserById: UserById
  UserForm: UserForm
}
