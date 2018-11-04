// @flow
import * as React from 'react'
import type { RoomUser } from '../../types'
import styled from 'styled-components'
import { Typography, Paper } from '@material-ui/core'

type Props = {
  roomUser: RoomUser,
  timeout?: boolean,
}

const UserTile = (props: Props) => {
  const { roomUser, timeout } = props
  const { user } = roomUser
  return (
    <Wrapper data-timeout={timeout}>
      <ImgWrapper>
        <Photo
          data-timeout={timeout}
          src={user.photoURL}
          alt={user.displayName}
        />
      </ImgWrapper>
      <div>
        <Name>{user.displayName}</Name>
        <Timeout data-timeout={timeout}>{roomUser.lastLogFromNowLabel}</Timeout>
      </div>
    </Wrapper>
  )
}

const Name = styled(Typography)`
  text-align: center;
  margin: 5px;
`

const Timeout = styled(Typography)`
  text-align: center;
  opacity: 0.3;
  margin: 5px;
  &[data-timeout='true'] {
    opacity: 1;
  }
`

const Wrapper = styled(Paper)`
  margin-top: 5px;
  width: 100%;
  padding: 10px 0;
  background: #424242;

  &[data-timeout='true'] {
    opacity: 0.8;
  }
`

const ImgWrapper = styled.div`
  width: 15vw;
  height: 15vw;
  margin: auto;
  display: flex;
  justify-content: center;
`

const Photo = styled.img`
  border-radius: 50%;
  width: 100%;
  height: auto;
  object-fit: cover;
  border: solid 4px red;
  &[data-timeout='true'] {
    border: solid 4px gray;
  }
`

export default UserTile
