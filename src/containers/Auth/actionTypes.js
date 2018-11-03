// @flow
import type { FirebaseUser } from '../../types/'

export const TWITTER_LOGIN: 'Auth/TWITTER_LOGIN' = 'Auth/TWITTER_LOGIN'
export const TWITTER_LOGOUT: 'Auth/TWITTER_LOGOUT' = 'Auth/TWITTER_LOGOUT'

export const Actions = {
	TWITTER_LOGIN,
	TWITTER_LOGOUT,
}

export type TwitterLogin = {
	type: typeof TWITTER_LOGIN,
	firebaseUser: $Shape<FirebaseUser>,
}
export type TwitterLogout = {
	type: typeof TWITTER_LOGOUT,
}

export type Action = TwitterLogin | TwitterLogout
