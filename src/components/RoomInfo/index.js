// @flow
import * as React from 'react'
import _ from 'lodash'
import type { Room, RoomDayCounts } from '../../types'
import UserTile from '../UserTile'

import { Typography } from '@material-ui/core'
import './style.css'

type Props = {
  room: Room,
  roomCount: RoomDayCounts,
}

const RoomInfo = ({ room, roomCount }: Props) => {
  const currentCount = room.currentUsers.length
  const todayCount = room.todayUsers.length
  return (
    <section>
      <header>
        <Typography variant="h4">{room.id}</Typography>
      </header>
      <section>
        <Typography variant="h5">now</Typography>
        {currentCount === 0 && <Typography>none</Typography>}
        <div className="member-list">
          {room.currentUsers.map(user => (
            <div key={user.user.id}>
              <UserTile roomUser={user} />
            </div>
          ))}
          {_.range(4 - (currentCount % 4)).map(i => (
            <div key={i} />
          ))}
        </div>
        <Typography variant="h5">leaved</Typography>
        {todayCount === 0 && <Typography>none</Typography>}
        <div className="member-list">
          {room.todayUsers.map(user => (
            <div key={user.user.id}>
              <UserTile roomUser={user} timeout />
            </div>
          ))}
          {_.range(4 - (todayCount % 4)).map(i => (
            <div key={i} />
          ))}
        </div>
      </section>
    </section>
  )
}

export default RoomInfo
