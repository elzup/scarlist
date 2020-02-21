const {
  NODE_ENV,
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_SAMPLE_WEBHOOK,
} = process.env

const isDev = NODE_ENV === 'development'

const config = {
  isDev,
  tabBarHeight: 40,
  currentUserLimit: 5 * 60, // seconds
  firebase: {
    apiKey: REACT_APP_FIREBASE_API_KEY || '',
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN || '',
    databaseURL: REACT_APP_FIREBASE_DATABASE_URL || '',
    projectId: REACT_APP_FIREBASE_PROJECT_ID || '',
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
  },
  clockIntervalMs: 5000,
  webhook: REACT_APP_SAMPLE_WEBHOOK || '',
  admin: { name: '', countMax: 0 },
}

export default config
