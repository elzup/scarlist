// @flow

import React from 'react'
import TopContainer from '../TopContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from '../NavBarContainer'

class App extends React.Component<*> {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path={'/'} component={TopContainer} />
        </div>
      </Router>
    )
  }
}

export default App
