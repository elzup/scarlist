// @flow

import React from 'react'
import TopContainer from '../TopContainer'
import SettingContainer from '../SettingContainer'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from '../LoginPage'
import Auth from '../Auth'
import NavBar from '../NavBarContainer'

class App extends React.Component<*> {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Auth redirectPath="/login">
              <div>
                <Switch>
                  <Route exact path={'/'} component={TopContainer} />
                  <Route
                    exact
                    path={'/settings'}
                    component={SettingContainer}
                  />
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
