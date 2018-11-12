// @flow
import * as React from 'react'
import _ from 'lodash'
import type { Room, RoomDayCounts } from '../../types'
import UserTile from '../UserTile'
import styled from 'styled-components'

import { Typography } from '@material-ui/core'

type Props = {
  room: Room,
  roomCount: RoomDayCounts,
  lg: boolean,
}

const RoomInfo = ({ room, roomCount, lg }: Props) => {
  const currentCount = room.currentUsers.length
  const todayCount = room.todayUsers.length
  // column num
  const cn = lg ? 6 : 4

  return (
    <section>
      <header>
        <Typography variant="h4">{room.label}</Typography>
      </header>
      <section>
        <Typography variant="h5">now</Typography>
        {currentCount === 0 && <Typography>none</Typography>}
        <MemberList cn={cn}>
          {room.currentUsers.map(user => (
            <div key={user.user.id}>
              <UserTile roomUser={user} />
            </div>
          ))}
          {_.range(cn - (currentCount % cn)).map(i => (
            <div key={i} />
          ))}
        </MemberList>
        <Typography variant="h5">leaved</Typography>
        {todayCount === 0 && <Typography>none</Typography>}
        <MemberList cn={cn}>
          {room.todayUsers.map(user => (
            <div key={user.user.id}>
              <UserTile roomUser={user} timeout />
            </div>
          ))}
          {_.range(cn - (todayCount % cn)).map(i => (
            <div key={i} />
          ))}
        </MemberList>
      </section>
    </section>
  )
}

const MemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > div {
    width: ${p => 100 / p.cn - 2}%;
  }
`

export default RoomInfo
