import { ThunkAction } from '../../types/index'
import { requestData } from '../Firebase/operations'
import { dataLoadingStart, dataLoadingEnd } from '../System/operations'

export function loadData(): ThunkAction {
  return async dispatch => {
    dispatch(dataLoadingStart())
    await dispatch(requestData())
    dispatch(dataLoadingEnd())
  }
}
