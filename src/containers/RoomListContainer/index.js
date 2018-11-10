// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import type { State as RootState } from '../../types'
import * as selectors from './selectors'
import RoomInfo from '../RoomInfo'
import { getLoadingData } from '../System/selectors'
import { LinearProgress } from '@material-ui/core'

type Props = {
  roomIds: string[],
  isLoading: boolean,
}

class RoomListContainer extends React.Component<Props> {
  render() {
    const { props } = this
    if (props.isLoading) {
      return <LinearProgress color="secondary" />
    }
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
  isLoading: getLoadingData(state),
})

const conn = connect(
  ms,
  {},
)

export default conn(RoomListContainer)
