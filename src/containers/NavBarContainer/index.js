// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import NavBar from '../../components/NavBar'
import type { State } from '../../types'
import { refInit } from '../Firebase/logic'

type Props = {
  refInit: typeof refInit,
}

class NavBarContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.refInit()
  }
  render() {
    return <NavBar {...this.props} />
  }
}

const ms = (state: State) => ({})

const conn = connect(
  ms,
  { refInit },
)

export default conn(NavBarContainer)
