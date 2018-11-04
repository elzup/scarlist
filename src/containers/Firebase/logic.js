// @flow
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import _ from 'lodash'

import type { ThunkAction, User } from '../../types'
import { firebaseDb as fdb } from '../../services/firebase'
// import * as actions from './actions'
import * as authActions from '../Auth/actions'
import { receiveData } from '../TopContainer/logic'
import { saveCounts } from '../RoomDayCountById/logic'

export function login(): ThunkAction {
  return dispatch => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async res => {
        const user = await omitUser(res.user)
        const userRef = fdb.ref(`user/${user.id}`)
        userRef.update(user)
      })
  }
}

export function logout(): ThunkAction {
  return async dispatch => {
    await firebase
      .auth()
      .signOut()
      .catch(console.error)
    dispatch(authActions.logout())
  }
}

export function updateUser(user: User): ThunkAction {
  return (dispatch, getState) => {
    fdb.ref(`user/${user.id}`).update(user)
    user.macAddrs.forEach(ma => {
      fdb.ref(`macaddr-user/${ma}`).set(user.id)
    })
  }
}

async function omitUser(user: any): Promise<User> {
  const macs = (await fdb.ref(`macaddr-user`).once('value')).val()
  const macAddrs = macs ? _.keys(_.pickBy(macs, v => v === user.uid)) : []
  return {
    id: user.uid,
    name: user.name,
    displayName: user.displayName || 'no name',
    photoURL: user.photoURL || '',
    macAddrs,
  }
}

export function refInit(): ThunkAction {
  return async dispatch => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const userFull = (await fdb.ref(`user/${user.uid}`).once('value')).val()
        dispatch(authActions.login(userFull))
      } else {
        dispatch(authActions.loginFailed())
      }
    })
  }
}

type RoomUserLogs = {
  [roomId: string]: {
    [userId: string]: { [logId: string]: { timestamp: number } },
  },
}

export function requestData(): ThunkAction {
  return async dispatch => {
    const roomsRaw = (await fdb.ref(`room`).once('value')).val()
    const usersRaw = (await fdb.ref(`user`).once('value')).val()
    if (!roomsRaw || !usersRaw) {
      return
    }
    const roomIds = Object.keys(roomsRaw)
    const userIds = Object.keys(usersRaw)
    const counts = (await fdb.ref(`room-user-count`).once('value')).val()
    dispatch(saveCounts(counts))

    const roomUserLogs: RoomUserLogs = {}
    for (const roomId of roomIds) {
      roomUserLogs[roomId] = {}
      for (const userId of userIds) {
        const logs = (await fdb
          .ref(`room-user-log/${roomId}/${userId}`)
          .limitToLast(5)
          .once('value')).val()
        if (!logs) {
          continue
        }
        roomUserLogs[roomId][userId] = logs
      }
    }

    dispatch(receiveData({ roomsRaw, usersRaw, roomUserLogs }))
  }
}
