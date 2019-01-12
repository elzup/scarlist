import moment from 'moment'
import { State, RoomDayCounts } from '../../types'

export function getRoomCountToday(state: State, roomId: string): RoomDayCounts {
  const today = moment().format(`YYYY-MM-DD`)
  const id = `${roomId}-${today}`
  return state.RoomDayCountById[id] || { id, users: [] }
}
