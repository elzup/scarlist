import moment from 'moment'
import { ThunkAction } from '../../types/index'
import config from '../../config/index'
import * as actions from './actions'

export function dataLoadingStart(): ThunkAction {
  return (dispatch, getState) => {
    dispatch(
      actions.updateSystem({
        ...getState().System,
        loadingData: true,
      }),
    )
  }
}

export function dataLoadingEnd(): ThunkAction {
  return (dispatch, getState) => {
    dispatch(
      actions.updateSystem({
        ...getState().System,
        loadingData: false,
      }),
    )
  }
}

export function startTimer(): ThunkAction {
  return dispatch => {
    setInterval(() => {
      dispatch(updateTimer())
    }, config.clockIntervalMs)
  }
}

export function updateTimer(): ThunkAction {
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
