// @flow
import * as React from 'react'
import type { RoomUser } from '../../types'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

type Props = {
  roomUser: RoomUser,
}

const Wrapper = styled.div`
  margin: 5px;
  border: solid 2px;
  border-radius: 3px;
`

const UserTile = (props: Props) => {
  const { roomUser } = props
  return (
    <Wrapper>
      <Typography variant="body1">{roomUser.user.label}</Typography>
      <Typography variant="body2">{roomUser.lastLogFromNowLabel}</Typography>
    </Wrapper>
  )
}

export default UserTile
