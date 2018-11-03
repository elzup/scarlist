// @flow

import moment from 'moment'
import type { ThunkAction } from '../../types'
import * as actions from './actions'

import config from '../../config'

export function startTimer(topicId: string): ThunkAction {
  return (dispatch, getState) => {
    setInterval(() => {
      dispatch(updateTimer(topicId))
    }, config.clockIntervalMs)
  }
}

export function updateTimer(topicId: string): ThunkAction {
  return (dispatch, getState) => {
    const timestamp = Date.now()
    const m = moment(timestamp)
    const timestampStr = m.format('YYYY-MM-DD HH:mm:ss')
    const state = getState()
    dispatch(
      actions.updateSystem({
        ...state.System,
        timestamp,
        timestampStr,
      }),
    )
  }
}
