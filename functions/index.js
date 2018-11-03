import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp()

const getTimes = () => {
  const date = Date.now()
  // ex 2018-01
  const dateJP = new Date(date + 1000 * 60 * 60 * 9)
  // ex 2018-01
  const y = dateJP.getFullYear()
  const m = `${dateJP.getMonth() + 1}`.padStart(2, 0)
  const ym = `${y}-${m}`
  const d = `${dateJP.getDate()}`.padStart(2, 0)
  const h = `${dateJP.getHours()}`.padStart(2, 0)
  const timePath = `${ym}/${d}/${h}`

  return { ym, d, h, timePath, timestamp: date }
}

const safeAdd = (v, n) => (v || 0) + n
const uniq = a => Array.from(new Set(a))

const auth = content => {
  return content !== functions.config().api.token
}

exports.log = functions.https.onRequest(async (req, res) => {
  if (auth(req.headers.authorization)) {
    return res.status(401).end()
  }
  if (req.method === 'POST') {
    const { room_id, user_id, mac_addrs } = req.body
    if (room_id && user_id) {
      insertLogs(room_id, user_id)
      res.status(200).end()
    } else if (room_id && mac_addrs) {
      insertLogsByMac(room_id, mac_addrs)
      res.status(200).end()
    } else {
      res
        .status(422)
        .end('parameter missing [room_id, user_id] or [room_id, mac_addrs]')
    }
  } else if (req.method === 'GET') {
    const { room_id } = req.query
    const logs = await getLogs(room_id)
    res.status(200).send(logs)
  } else {
    res.status(403).send('Forbidden!')
  }
})

exports.mac_addrs = functions.https.onRequest(async (req, res) => {
  if (auth(req.headers.authorization)) {
    return res.status(401).end()
  }
  if (req.method === 'GET') {
    const macAddrs = await getMacAddrs()
    res.status(200).send(macAddrs)
  } else {
    res.status(403).send('Forbidden!')
  }
})

exports.count = functions.https.onRequest(async (req, res) => {
  if (auth(req.headers.authorization)) {
    return res.status(401).end()
  }
  if (req.method === 'GET') {
    const { room_id } = req.query
    const counts = await getCounts(room_id)
    res.status(200).send(counts)
  } else {
    res.status(403).send('Forbidden!')
  }
})

async function insertLogsByMac(roomId, macAddrs) {
  admin
    .database()
    .ref(`/rooms/${roomId}`)
    .set(true) // TODO: remove
  admin
    .database()
    .ref(`/room/${roomId}`)
    .set({ label: roomId })

  const { ym, d, h, timestamp } = getTimes()

  const macaUserSnap = await admin
    .database()
    .ref(`/macaddr-user`)
    .once('value')
  const macaToUser = macaUserSnap.val()
  const userIds = uniq(macAddrs.map(v => macaToUser[v]).filter(v => !!v))

  userIds.forEach(userId => {
    registerLog(roomId, userId, ym, d, h, timestamp)
  })
}

function registerLog(roomId, userId, ym, d, h, timestamp) {
  const roomUserRef = admin.database().ref(`/room-user-log/${roomId}/${userId}`)
  const countRef = admin.database().ref(`/room-user-count/${roomId}/${userId}`)
  countRef.child(`month/${ym}`).transaction(v => safeAdd(v, 1))
  countRef.child(`day/${ym}/${d}`).transaction(v => safeAdd(v, 1))
  countRef.child(`hour/${ym}/${d}/${h}`).transaction(v => safeAdd(v, 1))

  roomUserRef.push().set({ timestamp })
}

function insertLogs(roomId, userId) {
  admin
    .database()
    .ref(`/rooms/${roomId}`)
    .set(true)
  admin
    .database()
    .ref(`/users/${userId}`)
    .set(true)
  // TODO: register api に分離, 認証に置き換え
  const { ym, d, h, timestamp } = getTimes()

  registerLog(roomId, userId, ym, d, h, timestamp)
}

async function getLogs(roomId) {
  const usersSnap = await admin
    .database()
    .ref(`/users`)
    .once('value')
  console.log(usersSnap)
  const users = usersSnap.val()
  console.log(users)
  const roomRef = admin.database().ref(`/room-user-log/${roomId}`)
  return await Promise.all(
    Object.keys(users).map(async userId => {
      const logsSnap = await roomRef
        .child(userId)
        .limitToLast(5)
        .once('value')
      return { userId, logs: logsSnap.val() }
    })
  )
}

async function getCounts(roomId) {
  const countsSnap = await admin
    .database()
    .ref(`/room-user-count/${roomId}`)
    .once('value')
  return countsSnap.val()
}

async function getMacAddrs() {
  const macAddrSnap = await admin
    .database()
    .ref(`/macaddr-user`)
    .once('value')
  return macAddrSnap.val()
}
