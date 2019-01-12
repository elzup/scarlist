import * as React from 'react'
import { connect } from 'react-redux'
import { State as RootState, Room } from '../../types'
import { getRoom } from '../../state/RoomById/selectors'
import _ from 'lodash'

import UserTile from '../UserTile'
import styled from 'styled-components'

import { Typography, withWidth } from '@material-ui/core'

export type Bp = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type OProps = {
  roomId: string
  width: string
}

type Props = {
  room: Room
  bp: Bp
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

const RoomInfo: React.SFC<Props> = ({ room, bp }) => {
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

const MemberList = styled.div<{ cn: number }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > div {
    width: ${p => 100 / p.cn - 2}%;
  }
`

const ms = (state: RootState, op: OProps) => ({
  room: getRoom(state, op.roomId),
  bp: op.width as Bp,
})

const conn = connect(
  ms,
  {},
)

export default withWidth()(conn(RoomInfo))
