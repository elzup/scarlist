// @flow
import reducer, { initialState } from './reducer'
import * as actions from './actions'

test('provide the initial state', () => {
	expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
})

const userA = {
	uid: 'hoge',
	displayName: 'ハロー',
	photoURL: 'piyo@a.b',
}

test('handle TWITTER_LOGIN', () => {
	expect(reducer(initialState, actions.twitterLogin(userA))).toEqual({
		authorized: true,
		user: {
			uid: 'hoge',
			displayName: 'ハロー',
			photoURL: 'piyo@a.b',
			ideas: [],
			messages: [],
		},
	})
})

test('handle TWITTER_LOGOUT', () => {
	expect(reducer(initialState, actions.twitterLogout())).toEqual(initialState)
})
