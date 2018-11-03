// @flow

import React from 'react'
import TopContainer from '../TopContainer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from '../NavBarContainer'
import LoginPage from '../LoginPage'
import Auth from '../Auth'

class App extends React.Component<*> {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Auth redirectPath="/login">
            <div>
              <NavBar />
              <Switch>
                <Route exact path={'/'} component={TopContainer} />
              </Switch>
            </div>
          </Auth>
        </Switch>
      </Router>
    )
  }
}

export default App
