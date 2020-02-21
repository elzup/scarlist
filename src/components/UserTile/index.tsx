import * as React from 'react'
import styled from 'styled-components'
import { Typography, Paper } from '@material-ui/core'
import { RoomUser } from '../../types'

type Props = {
  roomUser: RoomUser
  timeout?: boolean
}

const UserTile: React.SFC<Props> = props => {
  const { roomUser, timeout } = props
  const { user } = roomUser

  if (!user) {
    return <p>...</p>
  }
  return (
    <Wrapper data-timeout={timeout}>
      <ImgWrapper>
        <Photo
          data-timeout={timeout}
          src={user.photoURL}
          alt={user.name || user.displayName}
        />
      </ImgWrapper>
      <div>
        <Name>{user.name || user.displayName}</Name>
        <Timeout data-timeout={timeout}>{roomUser.lastLogFromNowLabel}</Timeout>
      </div>
    </Wrapper>
  )
}

UserTile.defaultProps = {
  timeout: false,
}

const Name = styled<unknown>(Typography)`
  text-align: center;
  margin: 5px;
`

const Timeout = styled<unknown>(Typography)`
  text-align: center;
  opacity: 0.3;
  margin: 5px;
  &[data-timeout='true'] {
    opacity: 1;
  }
`

const Wrapper = styled<unknown>(Paper)`
  margin-top: 5px;
  width: 100%;
  padding: 10px 0;
  background: #424242;

  &[data-timeout='true'] {
    opacity: 0.8;
  }
`

export const ImgWrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
`

export const Photo = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-position: center center;
  object-fit: cover;

  border: solid 4px green;
  &[data-timeout='true'] {
    border: solid 4px gray;
  }
`

export default UserTile
