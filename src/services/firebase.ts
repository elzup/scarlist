
import firebase from 'firebase/app'
import config from '../config'

let instance: ?{ app: any } = null

class FirebaseService {
  app: any
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
