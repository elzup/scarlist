import { connect } from 'react-redux'
import { State as RootState } from '../../types'
// import * as selectors from './selectors'
import UserTile from '../../components/UserTile'
import { getRoomUser } from './selectors'

type OProps = {
  userId: string
  timestamp: number
  timeout?: boolean
}

const ms = (state: RootState, op: OProps) => ({
  roomUser: getRoomUser(state, op.userId, op.timestamp),
})

const conn = connect(
  ms,
  {},
)

export default conn(UserTile)
