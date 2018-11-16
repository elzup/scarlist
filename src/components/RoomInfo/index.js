// @flow
import * as React from 'react'
import _ from 'lodash'
import type { Room, RoomDayCounts } from '../../types'
import UserTile from '../UserTile'
import styled from 'styled-components'

import { Typography } from '@material-ui/core'

type Bp = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type Props = {
  room: Room,
  roomCount: RoomDayCounts,
  bp: Bp,
}

const colNum = (bp: Bp, isSub: boolean) => {
  return {
    xs: [4, 4],
    sm: [5, 6],
    md: [6, 8],
    lg: [8, 10],
    xl: [10, 12],
  }[bp][isSub ? 1 : 0]
}

const RoomInfo = ({ room, roomCount, bp }: Props) => {
  const currentCount = room.currentUsers.length
  const todayCount = room.todayUsers.length
  // column num
  const cn = colNum(bp, false)
  const cnSub = colNum(bp, true)

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
        <MemberList cn={cnSub}>
          {room.todayUsers.map(user => (
            <div key={user.user.id}>
              <UserTile roomUser={user} timeout />
            </div>
          ))}
          {_.range(cnSub - (todayCount % cnSub)).map(i => (
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
