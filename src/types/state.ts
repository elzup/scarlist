import { State as Auth } from '../state/Auth/reducer'
import { State as RoomById } from '../state/RoomById/reducer'
import { State as RoomDayCountById } from '../state/RoomDayCountById/reducer'
import { State as RoomListContainer } from '../state/RoomListContainer/reducer'
import { State as System } from '../state/System/reducer'
import { State as UserById } from '../state/UserById/reducer'
import { State as UserForm } from '../state/UserForm/reducer'

export type State = {
  Auth: Auth
  RoomById: RoomById
  RoomDayCountById: RoomDayCountById
  RoomListContainer: RoomListContainer
  System: System
  UserById: UserById
  UserForm: UserForm
}
