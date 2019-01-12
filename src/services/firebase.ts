import firebase from 'firebase/app'
import config from '../config'

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebase)
  }
}
