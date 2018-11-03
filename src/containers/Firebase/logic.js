// @flow
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import type { ThunkAction } from '../../types'
import { firebaseDb as fdb } from '../../services/firebase'
// import * as actions from './actions'
import * as authActions from '../Auth/actions'
import { receiveData } from '../TopContainer/logic'
import { saveCounts } from '../RoomDayCountById/logic'

export function login(): ThunkAction {
  return dispatch => {
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(res => {
        const ouser = omitUser(res.user)
        const userRef = fdb.ref(`user/${ouser.uid}`)
        userRef.set(ouser)
      })
  }
}

export function logout(): ThunkAction {
  return async dispatch => {
    await firebase
      .auth()
      .signOut()
      .catch(console.error)
    dispatch(authActions.twitterLogout())
  }
}

function omitUser(user: $npm$firebase$auth$User): $Shape<any> {
  return {
    uid: user.uid,
    displayName: user.displayName || 'no name',
    photoURL: user.photoURL || '',
  }
}

export function refInit(): ThunkAction {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authActions.twitterLogin(omitUser(user)))
      } else {
        dispatch(authActions.twitterLogout())
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
    const roomsRaw = (await fdb.ref(`rooms`).once('value')).val()
    const roomIds = Object.keys(roomsRaw)
    const usersRaw = (await fdb.ref(`users`).once('value')).val()
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
