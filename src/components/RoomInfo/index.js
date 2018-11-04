// @flow
import * as React from 'react'
import type { Room, RoomDayCounts } from '../../types'
import UserTile from '../UserTile'
import DayHeatMap from '../DayHeatMap'

import { List, ListItem, Typography } from '@material-ui/core'

type Props = {
  room: Room,
  roomCount: RoomDayCounts,
}

const RoomInfo = ({ room, roomCount }: Props) => {
  return (
    <section>
      <header>
        <Typography variant="h4">{room.id}</Typography>
      </header>
      <section>
        <header>
          <Typography variant="h5">今いる人</Typography>
        </header>
        <List>
          {room.currentUsers.length === 0 && <span>none</span>}
          {room.currentUsers.map(user => (
            <ListItem key={user.user.id}>
              <UserTile roomUser={user} />
            </ListItem>
          ))}
        </List>
      </section>
      <section>
        <header>
          <Typography variant="h5">今日いた人</Typography>
        </header>
        <List style={{ opacity: '0.5' }}>
          {room.todayUsers.length === 0 && <span>none</span>}
          {room.todayUsers.map(user => (
            <ListItem key={user.user.id}>
              <UserTile roomUser={user} />
            </ListItem>
          ))}
        </List>
      </section>
    </section>
  )
}

export default RoomInfo
