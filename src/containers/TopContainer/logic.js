// @flow

import type { ThunkAction } from '../../types'
import { requestData } from '../Firebase/logic'
import { dataLoadingStart, dataLoadingEnd } from '../System/logic'

export function loadData(): ThunkAction {
  return async (dispatch, getState) => {
    dispatch(dataLoadingStart())
    await dispatch(requestData())
    dispatch(dataLoadingEnd())
  }
}
