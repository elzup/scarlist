import React from 'react'
import TopContainer from '../TopContainer'
import { Router, Route, Switch } from 'react-router-dom'
import LoginPage from '../LoginPage'
import Auth from '../Auth'
import NavBar from '../NavBarContainer'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Auth redirectPath="/login">
              <div>
                <Switch>
                  <Route exact path={'/'} component={TopContainer} />
                </Switch>
              </div>
            </Auth>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
