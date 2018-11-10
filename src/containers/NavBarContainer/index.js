// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import NavBar from '../../components/NavBar'
import type { State } from '../../types'
import { refInit } from '../Firebase/logic'
import { getIsLogin } from '../Auth/selectors'
import { withRouter, type RouterHistory } from 'react-router-dom'

type Props = {
  isLogin: boolean,
  onClickSetting: () => void,
  onClickTitle: () => void,
  refInit: typeof refInit,
}

type OProps = {
  history: RouterHistory,
}

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
  onClickTitle: () => {
    op.history.push('/')
  },
  onClickSetting: () => {
    op.history.push('/settings')
  },
})

const conn = connect(
  ms,
  { refInit },
)

export default withRouter(conn(NavBarContainer))
