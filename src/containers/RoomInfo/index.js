// @flow
import { connect } from 'react-redux'
import type { State as RootState } from '../../types'
import { getRoom } from '../RoomById/selectors'
import { getRoomCountToday } from '../RoomDayCountById/selectors'
import RoomInfo from '../../components/RoomInfo'

type Props = {
  roomId: string,
}

const ms = (state: RootState, op: Props) => ({
  room: getRoom(state, op.roomId),
  roomCount: getRoomCountToday(state, op.roomId),
})

const conn = connect(
  ms,
  {},
)

export default conn(RoomInfo)
