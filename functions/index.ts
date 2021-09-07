/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
import crypto from 'crypto'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

const token: string = functions.config()?.api?.token || ''

const sha256 = crypto.createHash('sha256')
const makeHash = (s: string) => {
  sha256.update(s)
  return sha256.digest('hex')
}

admin.initializeApp()
const fdb = admin.database()

const getTimes = () => {
  const date = Date.now()
  // ex 2018-01
  const dateJP = new Date(date + 1000 * 60 * 60 * 9)
  // ex 2018-01
  const y = dateJP.getFullYear()
  const m = `${dateJP.getMonth() + 1}`.padStart(2, '0')
  const ym = `${y}-${m}`
  const d = `${dateJP.getDate()}`.padStart(2, '0')
  const h = `${dateJP.getHours()}`.padStart(2, '0')
  const timePath = `${ym}/${d}/${h}`

  return { ym, d, h, timePath, timestamp: date }
}

const safeAdd = (v: number | undefined, n: number) => (v || 0) + n
const uniq = <T>(a: T[]) => Array.from(new Set(a))

const auth = (content?: string) => {
  return content !== token
}

const auth2 = (roomId: string, content?: string) => {
  return content !== makeHash(token + roomId)
}

exports.log = functions.https.onRequest(async (req, res) => {
  if (req.method === 'POST') {
    if (auth(req.headers.authorization)) {
      return res.status(401).end()
    }
    const { room_id, mac_addrs } = req.body

    if (room_id && mac_addrs) {
      insertLogsByMac(room_id, mac_addrs)
      res.status(200).end()
    } else {
      res
        .status(422)
        .end('parameter missing [room_id, user_id] or [room_id, mac_addrs]')
    }
  } else if (req.method === 'GET') {
    const { room_id } = req.params

    if (auth2(room_id, req.headers.authorization)) {
      return res.status(401).end()
    }
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
    const { room_id } = req.params
    const counts = await getCounts(room_id)

    res.status(200).send(counts)
  } else {
    res.status(403).send('Forbidden!')
  }
})

async function insertLogsByMac(roomId: string, macAddrs: string[]) {
  const { ym, d, h, timestamp } = getTimes()

  const macaUserSnap = await fdb.ref(`/macaddr-user`).once('value')
  const macaToUser = macaUserSnap.val() as Record<string, string>
  const userIds = uniq(macAddrs.map(v => macaToUser[v]).filter(Boolean))

  const userLasts = (
    await fdb.ref(`/room/${roomId}/userLast`).once('value')
  ).val()

  const settingsSnap = await fdb.ref(`/user-setting`).once('value')

  if (!settingsSnap.exists()) {
    await settingsSnap.ref.set({})
  }
  // const settings = settingsSnap.val()

  // room userLasts があり、かつ、settingsがあるユーザ
  // const noticeSettings = Object.keys(userLasts)
  //   .map(userId => settings[userId])
  //   .filter(v => !!v)

  userIds.forEach(async userId => {
    registerLog(roomId, userId, ym, d, h, timestamp)

    const v = userLasts[userId]
    const diffMs = timestamp - +new Date(v)
    const diffHour = diffMs / 1000 / 60 / 60

    if (diffHour >= 1) {
      // 1時間ぶりのログ
      const userSettingRef = fdb.ref(`/user-setting/${userId}`)
      const value = await userSettingRef.once('value')

      if (!value.exists()) return
    }
  })
  const currentRoomRef = fdb.ref(`/current-room/${roomId}`)

  currentRoomRef.update({})
}

function registerLog(
  roomId: string,
  userId: string,
  ym: string,
  d: string,
  h: string,
  timestamp: number
) {
  const roomUserRef = fdb.ref(`/room-user-log/${roomId}/${userId}`)
  const roomCurrentRef = fdb.ref(`/room/${roomId}/userLast/${userId}`)
  const countRef = fdb.ref(`/room-user-count/${roomId}/${userId}`)

  roomCurrentRef.set(timestamp)
  countRef.child(`month/${ym}`).transaction(v => safeAdd(v, 1))
  countRef.child(`day/${ym}/${d}`).transaction(v => safeAdd(v, 1))
  countRef.child(`hour/${ym}/${d}/${h}`).transaction(v => safeAdd(v, 1))
  fdb
    .ref(`/user/${userId}/loggedRooms`)
    .child(roomId)
    .set(true)

  roomUserRef.push().set({ timestamp })
}
export type User = {
  id: string
  displayName: string
  name: string // 自分で設定したもの
  photoURL: string
  macAddrs: string[]
  loggedRooms: { [key: string]: true }
}

const userOmit = (user: User) => ({
  displayName: user.displayName,
  name: user.name,
  photoURL: user.photoURL
})

async function getLogs(roomId: string) {
  const usersSnap = await fdb.ref(`/user`).once('value')
  const users = usersSnap.val()
  const roomRef = fdb.ref(`/room-user-log/${roomId}`)

  return await Promise.all(
    Object.keys(users).map(async userId => {
      const logsSnap = await roomRef
        .child(userId)
        .limitToLast(5)
        .once('value')

      return { user: userOmit(users[userId]), last5Logs: logsSnap.val() }
    })
  )
}

async function getCounts(roomId: string) {
  const countsSnap = await fdb.ref(`/room-user-count/${roomId}`).once('value')

  return countsSnap.val()
}

async function getMacAddrs() {
  const macAddrSnap = await fdb.ref(`/macaddr-user`).once('value')

  return macAddrSnap.val()
}
