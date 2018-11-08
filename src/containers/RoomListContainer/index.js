// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import type { State as RootState } from '../../types'
import * as selectors from './selectors'
import RoomInfo from '../RoomInfo'

type Props = {
  roomIds: string[],
}

class RoomListContainer extends React.Component<Props> {
  render() {
    const { props } = this
    return (
      <section>
        <div>
          {props.roomIds.map(roomId => (
            <RoomInfo key={roomId} roomId={roomId} />
          ))}
        </div>
      </section>
    )
  }
}

const ms = (state: RootState) => ({
  roomIds: selectors.getRoomIds(state),
})

const conn = connect(
  ms,
  {},
)

export default conn(RoomListContainer)
