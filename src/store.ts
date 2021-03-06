import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

declare var window: { __REDUX_DEVTOOLS_EXTENSION__?: () => void }

export default () => {
  const middleware = [thunk]

  const devtool =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  const composer = devtool
    ? compose(applyMiddleware(...middleware), devtool)
    : compose(applyMiddleware(...middleware))

  const store = createStore(reducer, composer)

  return store
}
