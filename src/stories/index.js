// @flow
import React from 'react'
import _ from 'lodash'

import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'
import UserTile from '../components/UserTile'
import RoomInfo from '../components/RoomInfo'
import DayHeatMap from '../components/DayHeatMap'
import type { RoomUser, Room } from '../types'

const roomUser: RoomUser = {
  lastLogLabel: '2018-10-05T18:50:10+09:00',
  lastLogFromNowLabel: '2時間前',
  user: {
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
    id: 'anozon',
    photoURL:
      'https://66.media.tumblr.com/7807fcf0fba173ede2c46318cedabd81/tumblr_p1vavmvWgZ1ttrer8o1_400.png',
    displayName: 'elzup',
    macAddrs: [],
  },
  lastLog: 1538733010283,
}

const roomUser3: RoomUser = {
  lastLogLabel: '2018-10-05T18:50:10+09:00',
  lastLogFromNowLabel: '1分前',
  user: {
    id: 'anozon',
    photoURL:
      'https://66.media.tumblr.com/7807fcf0fba173ede2c46318cedabd81/tumblr_p1vavmvWgZ1ttrer8o1_400.png',
    displayName: 'elzup',
    macAddrs: [],
  },
  lastLog: 1538733010283,
}

const room: Room = {
  id: 'planck_units',
  label: 'planck_units',
  currentUsers: [roomUser2, roomUser3],
  todayUsers: [roomUser, roomUser2, roomUser3],
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

storiesOf('RoomInfo', module).add('room1', () => (
  <RoomInfo room={room} roomCount={{ id: 'a', users: countData }} />
))

storiesOf('UserTile', module)
  .add('user', () => <UserTile roomUser={roomUser} />)
  .add('user negative', () => <UserTile roomUser={roomUser2} />)

storiesOf('DayHeatMap', module).add('day1', () => (
  <DayHeatMap data={countData} />
))
