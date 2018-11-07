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
  const total = room.currentUsers.length + room.todayUsers.length
  return (
    <section>
      <header>
        <Typography variant="h4">{room.id}</Typography>
      </header>
      <section>
        <div className="member-list">
          {total === 0 && <Typography>none</Typography>}
          {room.currentUsers.map(user => (
            <div key={user.user.id}>
              <UserTile roomUser={user} />
            </div>
          ))}
          {room.todayUsers.map(user => (
            <div key={user.user.id}>
              <UserTile roomUser={user} timeout />
            </div>
          ))}
          {_.range(4 - (total % 4)).map(i => (
            <div key={i} />
          ))}
        </div>
      </section>
    </section>
  )
}

export default RoomInfo
