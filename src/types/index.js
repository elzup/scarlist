// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { Action as _Action } from './action'
import type { State as _State } from './state'

export type State = _State
export type Action = _Action

export type GetState = () => State

type ThunkDispatch<A> = ThunkAction => A

export type Dispatch = ReduxDispatch<Action> & ThunkDispatch<Action>
export type Store = ReduxStore<State, Action, Dispatch>

export type ThunkAction = (
  dispatch: Dispatch,
  getState: GetState,
) => void | Promise<void>

export type User = {
  id: string,
  displayName: string,
  photoURL: string,
}

export type Auth = {
  user?: User,
  authorized: boolean,
}

export type Log = {
  id: string,
  timestamp: number,
}

export type UserHourCounts = {
  id: string,
  counts: {
    [hour: string]: number,
  },
}

export type DayHeatMapFields = {
  userId: string,
  /* 1: number, 1Color: string for nivo format*/
}

export type RoomDayCounts = {
  id: string,
  users: DayHeatMapFields[],
}

export type RoomUser = {
  user: User,
  lastLogLabel: string,
  lastLogFromNowLabel: string,
  lastLog: number, //timestamps
}

export type Room = {
  id: string,
  label: string,
  currentUsers: RoomUser[],
  todayUsers: RoomUser[],
}

export type UserRaw = boolean
export type RoomRaw = boolean

export type System = {
  timestamp: number,
  timestampStr: string,
}
