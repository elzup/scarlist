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
import * as userFormActions from '../UserForm/actions'
import { getConfirmedRooms } from '../Auth/selectors'

export function login(): ThunkAction {
  return dispatch => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async res => {
        const user = await omitUser(res.user)
        const userRef = fdb.ref(`user/${user.id}`)
        userRef.set(user)
        dispatch(authActions.login(user))
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
  return async (dispatch, getState) => {
    await dispatch(userFormActions.updateState({ loading: true }))
    await fdb.ref(`user/${user.id}`).update(user)
    if (user.macAddrs) {
      user.macAddrs.forEach(ma => {
        fdb.ref(`macaddr-user/${ma}`).set(user.id)
      })
    }
    await dispatch(userFormActions.updateState({ loading: false }))
  }
}

async function omitUser(user: any): Promise<User> {
  const userOldSnap = await fdb.ref(`user/${user.uid}`).once('value')
  const userOld = userOldSnap.exists() ? userOldSnap.val() : user

  const macs = (await fdb.ref(`macaddr-user`).once('value')).val()
  const macAddrs = macs ? _.keys(_.pickBy(macs, v => v === user.uid)) : []
  // 基本DBにあるユーザ情報優先
  const displayName = userOld.displayName || user.displayName || 'no name'
  const name = userOld.name || user.name || displayName
  const photoURL = user.photoURL || userOld.photoURL || ''
  const loggedRooms = userOld.loggedRooms || {}
  return {
    id: user.uid,
    displayName,
    photoURL,
    macAddrs,
    name,
    loggedRooms,
  }
}

export function refInit(): ThunkAction {
  return async dispatch => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const userFull = (await fdb.ref(`user/${user.uid}`).once('value')).val()
        if (userFull) {
          dispatch(authActions.login(userFull))
        } else {
          dispatch(authActions.loginFailed())
        }
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
  return async (dispatch, getState) => {
    const confirmedRoomIds = getConfirmedRooms(getState())
    if (!confirmedRoomIds) {
      return
    }
    const usersRaw = (await fdb.ref(`user`).once('value')).val()
    const roomsRawAll = (await fdb.ref(`room`).once('value')).val()
    const roomsRaw = _.pickBy(
      roomsRawAll,
      (v, k) => confirmedRoomIds.indexOf(k) !== -1,
    )
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
