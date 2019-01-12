import React from 'react'
import _ from 'lodash'

import { storiesOf, addDecorator } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'
import UserTile from '../components/UserTile/'
import { RoomUser, Room, User } from '../types/'
import { GlobalStyle } from '../components/index'
import CssBaseline from '@material-ui/core/CssBaseline'

const user0: User = {
  id: '',
  photoURL: '',
  displayName: '',
  name: '',
  macAddrs: [],
  loggedRooms: {},
}

const roomUser: RoomUser = {
  lastLogLabel: '2018-10-05T18:50:10+09:00',
  lastLogFromNowLabel: '2時間前',
  user: {
    ...user0,
    id: 'elzup',
    photoURL:
      'https://66.media.tumblr.com/7807fcf0fba173ede2c46318cedabd81/tumblr_p1vavmvWgZ1ttrer8o1_400.png',
    displayName: 'elzup',
    macAddrs: [],
  },
  lastLog: 1538733010283,
}

const roomUser2: RoomUser = {
  lastLogLabel: '2018-10-05T18:50:10+09:00',
  lastLogFromNowLabel: '5分前',
  user: {
    ...user0,
    id: 'anozon',
    photoURL:
      'https://66.media.tumblr.com/7807fcf0fba173ede2c46318cedabd81/tumblr_p1vavmvWgZ1ttrer8o1_400.png',
    displayName: 'elzup',
    macAddrs: [],
  },
  lastLog: 1538733010283,
}

const keys24 = _.range(24).map(v => _.padStart(`${v}`, 2, '0'))

const rollDice = () =>
  _.zipObject(keys24, _.range(24).map(v => _.random(0, 60, false)))
const rollDiceSmall = () =>
  _.zipObject(keys24, _.range(24).map(v => _.random(0, 1, false)))

const countData = [
  {
    userId: 'toshino',
    ...rollDice(),
  },
  {
    userId: 'hunami',
    ...rollDice(),
  },
  {
    userId: 'akari',
    ...rollDiceSmall(),
  },
]

addDecorator(storyFn => (
  <div>
    <GlobalStyle />
    <CssBaseline />
    {storyFn()}
  </div>
))

storiesOf('UserTile', module)
  .add('user', () => <UserTile roomUser={roomUser} />)
  .add('user negative', () => <UserTile roomUser={roomUser2} />)
