// @flow
import type { Action, Auth } from '../../types'
import { Actions } from './actionTypes'

export type State = Auth

export const initialState: State = {
	user: {
		uid: '',
		displayName: '',
		photoURL: '',
		ideas: [],
		messages: [],
	},
	authorized: false,
}

export default function(state: State = initialState, action: Action): State {
	switch (action.type) {
		case Actions.TWITTER_LOGIN:
			return {
				user: { ...initialState.user, ...action.firebaseUser },
				authorized: true,
			}

		case Actions.TWITTER_LOGOUT:
			return initialState

		default:
			return state
	}
}
