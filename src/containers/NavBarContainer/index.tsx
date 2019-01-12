import * as React from 'react'
import { connect } from 'react-redux'
import NavBar from '../../components/NavBar/index'
import { State } from '../../types/index'
import { refInit } from '../../state/Firebase/operations'
import { getIsLogin } from '../../state/Auth/selectors'

type Props = {
  isLogin: boolean
  refInit: () => void
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
