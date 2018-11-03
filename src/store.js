// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import type { Store } from './types'

export default () => {
  const middleware = [thunk]

  const devtool =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  const composer = devtool
    ? compose(applyMiddleware(...middleware), devtool)
    : compose(applyMiddleware(...middleware))

  const store: Store = createStore(reducer, composer)
  return store
}
