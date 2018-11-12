// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import NavBar from '../../components/NavBar'
import type { State } from '../../types'
import { refInit } from '../Firebase/logic'
import { getIsLogin } from '../Auth/selectors'

type Props = {
  isLogin: boolean,
  refInit: typeof refInit,
}

type OProps = {}

class NavBarContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.refInit()
  }
  render() {
    return <NavBar {...this.props} />
  }
}

const ms = (state: State, op: OProps) => ({
  isLogin: getIsLogin(state),
})

const conn = connect(
  ms,
  { refInit },
)

export default conn(NavBarContainer)
