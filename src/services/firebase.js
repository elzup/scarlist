// @flow

import firebase, { type App as FirebaseApp } from 'firebase/app'
import config from '../config'

let instance: ?{ app: FirebaseApp } = null

class FirebaseService {
  app: FirebaseApp
  constructor() {
    if (!instance) {
      this.app = firebase.initializeApp(config.firebase)
      instance = this
    }
    return instance
  }
}

export const firebaseApp = new FirebaseService().app
export const firebaseDb = firebaseApp.database()
