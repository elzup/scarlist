// @flow
import { connect } from 'react-redux'
import type { State as RootState } from '../../types'
import { getRoom } from '../RoomById/selectors'
import { getRoomCountToday } from '../RoomDayCountById/selectors'
import RoomInfo from '../../components/RoomInfo'
import { withWidth } from '@material-ui/core'

type Props = {
  roomId: string,
  width: string,
}

const ms = (state: RootState, op: Props) => ({
  room: getRoom(state, op.roomId),
  roomCount: getRoomCountToday(state, op.roomId),
  bp: op.width,
})

const conn = connect(
  ms,
  {},
)

export default withWidth()(conn(RoomInfo))
