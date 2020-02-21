import * as React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'

import App from './containers/App'
import configureStore from './store'
import * as serviceWorker from './serviceWorker'

import theme from './theme'

import './config/init'
import { GlobalStyle } from './components'

const store = configureStore()

const root = document.getElementById('root')

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <GlobalStyle />
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </div>
    </Provider>,
    root,
  )
}

serviceWorker.register()
