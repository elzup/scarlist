// @flow
import * as React from 'react'
import type { RoomUser } from '../../types'
import styled from 'styled-components'

import { Typography } from '@material-ui/core'

type Props = {
  roomUser: RoomUser,
}

const UserTile = (props: Props) => {
  const { roomUser } = props
  const { user } = roomUser
  return (
    <Wrapper>
      <ImgWrapper>
        <Photo src={user.photoURL} alt={user.displayName} />
      </ImgWrapper>
      <div>
        <Name>{user.displayName}</Name>
      </div>
    </Wrapper>
  )
}

const Name = styled(Typography)`
  text-align: center;
`

const Wrapper = styled.section`
  margin-top: 5px;
  width: 100%;
  padding-top: 10px;
  background: #484848;
  border-radius: 10px;
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
`

export default UserTile
