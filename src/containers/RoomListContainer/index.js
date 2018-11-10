// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import type { State as RootState } from '../../types'
import * as selectors from './selectors'
import RoomInfo from '../RoomInfo'
import { getLoadingData } from '../System/selectors'
import { getConfirmedRooms, getAuth, getSetuped } from '../Auth/selectors'
import { LinearProgress, Typography } from '@material-ui/core'

type Props = {
  roomIds: string[],
  isLoading: boolean,
  isSetuped: boolean,
  confirmedRooms: false | string[],
}

class RoomListContainer extends React.Component<Props> {
  render() {
    const { props } = this
    if (props.isLoading) {
      return <LinearProgress color="secondary" />
    }
    if (!props.confirmedRooms) {
      return (
        <>
          <Typography color={props.isSetuped ? 'defualt' : 'secondary'}>
            1. 右上の設定ボタンからMACアドレスの設定を行ってください。
          </Typography>
          <Typography color="secondary">
            2. 在室者を閲覧するには1度以上ログが確認される必要があります。
          </Typography>
        </>
      )
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
  confirmedRooms: getConfirmedRooms(state),
  isSetuped: getSetuped(state),
  isLoading: getLoadingData(state),
})

const conn = connect(
  ms,
  {},
)

export default conn(RoomListContainer)
