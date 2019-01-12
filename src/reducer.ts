import { combineReducers } from 'redux'
import Auth from './containers/Auth/reducer'
import RoomById from './containers/RoomById/reducer'
import RoomDayCountById from './containers/RoomDayCountById/reducer'
import RoomListContainer from './containers/RoomListContainer/reducer'
import System from './containers/System/reducer'
import UserById from './containers/UserById/reducer'
import UserForm from './containers/UserForm/reducer'

export default combineReducers({
  Auth,
  RoomById,
  RoomDayCountById,
  RoomListContainer,
  System,
  UserById,
  UserForm,
})
