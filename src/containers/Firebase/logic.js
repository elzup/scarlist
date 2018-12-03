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
import * as userFormActions from '../UserForm/actions'
import { getConfirmedRooms } from '../Auth/selectors'
import { receiveUser } from '../UserById/actions'
import { receiveRoomList } from '../RoomListContainer/actions'
import { saveRoom } from '../RoomById/logic'

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

export function requestData(): ThunkAction {
  return async (dispatch, getState) => {
    const confirmedRoomIds = getConfirmedRooms(getState())
    if (!confirmedRoomIds) {
      return
    }

    dispatch(receiveRoomList(confirmedRoomIds))

    const roomRef = fdb.ref(`room`)
    const userRef = fdb.ref(`user`)
    const userIds = []
    await Promise.all(
      confirmedRoomIds.map(async roomId => {
        const roomRaw = (await roomRef.child(roomId).once('value')).val()
        if (roomRaw.userLast) {
          Object.keys(roomRaw.userLast).forEach(k => userIds.push(k))
        }
        dispatch(saveRoom(roomId, roomRaw))
        roomRef.child(roomId).on('child_changed', snap => {})
      }),
    )

    _.uniq(userIds).forEach(async userId => {
      const userRaw = (await userRef.child(userId).once('value')).val()
      dispatch(receiveUser({ ...userRaw, id: userId }))
    })
  }
}
