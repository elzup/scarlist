import { ThunkAction as _ThunkAction } from 'redux-thunk'
import { AnyAction } from 'typescript-fsa'
import { State as _State } from './state'

export type State = _State

export type GetState = () => State

export type ThunkAction = _ThunkAction<
  void | Promise<void>,
  State,
  undefined,
  AnyAction
>

export type User = {
  id: string
  displayName: string
  name: string // 自分で設定したもの
  photoURL: string
  macAddrs: string[]
  loggedRooms: { [key: string]: true }
}

export type Auth =
  | { loading: true }
  | {
      loading: false
      authorized: false
    }
  | {
      loading: false
      authorized: true
      user: User
    }

export type Log = {
  id: string
  timestamp: number
}

export type UserHourCounts = {
  id: string
  counts: {
    [hour: string]: number
  }
}

export type DayHeatMapFields = {
  [key: string]: number | string
  /* 1: number, 1Color: string for nivo format*/
}

export type RoomDayCounts = {
  id: string
  users: DayHeatMapFields[]
}

export type RoomUser = {
  user?: User
  lastLogLabel: string
  lastLogFromNowLabel: string
  lastLog: number //timestamps
}

export type Room = {
  id: string
  label: string
  currentUsers: { id: string; timestamp: number }[]
  todayUsers: { id: string; timestamp: number }[]
}

export type RoomRaw = {
  label: string
  userLast: { [id: string]: number }
}

export type System = {
  loadingData: boolean
  timestamp: number
  timestampStr: string
}
