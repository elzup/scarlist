// @flow

import firebase from 'firebase/app'
import config from '../config'

let instance: ?{ app: $npm$firebase$App } = null

class FirebaseService {
  app: $npm$firebase$App
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
