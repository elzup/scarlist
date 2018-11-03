// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import type { State } from '../../types'
import { getIsLogin } from './selectors'

type OProps = {
  redirectPath: string,
}

type Props = {
  children: any,
  isLogin: boolean,
  redirectPath: string,
}

const Auth = (props: Props) => {
  if (props.isLogin) {
    return <Route children={props.children} />
  } else {
    return <Redirect to={props.redirectPath} />
  }
}

const ms = (state: State, op: OProps) => {
  return {
    isLogin: getIsLogin(state),
    ...op,
  }
}
const conn = connect(
  ms,
  {},
)

export default conn(Auth)
