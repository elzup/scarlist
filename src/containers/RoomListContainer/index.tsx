import * as React from 'react'
import { useSelector } from 'react-redux'
import { CircularProgress, Typography } from '@material-ui/core'
import { getRoomIds } from '../../state/RoomListContainer/selectors'
import RoomInfo from '../RoomInfo'
import { getLoadingData } from '../../state/System/selectors'
import { getConfirmedRooms, getSetuped } from '../../state/Auth/selectors'

function RoomListContainer() {
  const roomIds = useSelector(getRoomIds)
  const confirmedRooms = useSelector(getConfirmedRooms)
  const isSetuped = useSelector(getSetuped)
  const isLoading = useSelector(getLoadingData)

  if (isLoading) {
    return (
      <div style={{ margin: '1em' }}>
        <CircularProgress color="secondary" />
      </div>
    )
  }
  if (!confirmedRooms) {
    return (
      <>
        <Typography color={isSetuped ? 'initial' : 'secondary'}>
          1. 右上の設定ボタンからMACアドレスの設定を行ってください。
        </Typography>
        <Typography color="secondary">
          2.
          在室者を閲覧するには各アクセスポイントで1度以上ログを残す必要があります。
        </Typography>
      </>
    )
  }
  return (
    <section>
      <div>
        {roomIds.map(roomId => (
          <RoomInfo key={roomId} roomId={roomId} />
        ))}
      </div>
    </section>
  )
}

export default RoomListContainer
