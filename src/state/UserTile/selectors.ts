import moment from 'moment'
import { State } from '../../types'
import { getUser } from '../UserById/selectors'

export const getRoomUser = (
  state: State,
  userId: string,
  timestamp: number,
) => {
  const user = getUser(state, userId)
  const m = moment(timestamp)

  return {
    lastLogLabel: m.format(),
    lastLogFromNowLabel: m.fromNow(),
    user,
    lastLog: timestamp,
  }
}
