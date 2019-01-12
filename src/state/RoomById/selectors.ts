import { State } from '../../types'

export const getRoom = (state: State, id: string) => {
  return state.RoomById[id]
}
