import { combineReducers } from 'redux'
import Auth from './state/Auth/reducer'
import RoomById from './state/RoomById/reducer'
import RoomDayCountById from './state/RoomDayCountById/reducer'
import RoomListContainer from './state/RoomListContainer/reducer'
import System from './state/System/reducer'
import UserById from './state/UserById/reducer'
import UserForm from './state/UserForm/reducer'
import { State } from './types'

export default combineReducers<State>({
  Auth,
  RoomById,
  RoomDayCountById,
  RoomListContainer,
  System,
  UserById,
  UserForm,
})
