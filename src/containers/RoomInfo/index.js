// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import type { State as RootState, Room, RoomDayCounts } from '../../types'
import { getRoom } from '../RoomById/selectors'
import { getRoomCountToday } from '../RoomDayCountById/selectors'
import { withWidth } from '@material-ui/core'
import _ from 'lodash'

import UserTile from '../UserTile'
import styled from 'styled-components'

import { Typography } from '@material-ui/core'

type Bp = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type OProps = {
  roomId: string,
  width: string,
}

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
            <div key={user.id}>
              <UserTile userId={user.id} timestamp={user.timestamp} />
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
            <div key={user.id}>
              <UserTile userId={user.id} timestamp={user.timestamp} timeout />
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

const ms = (state: RootState, op: OProps) => ({
  room: getRoom(state, op.roomId),
  roomCount: getRoomCountToday(state, op.roomId),
  bp: op.width,
})

const conn = connect(
  ms,
  {},
)

export default withWidth()(conn(RoomInfo))
