// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import type { State, Auth } from '../../types'
import { getAuth } from './selectors'

type OProps = {
  redirectPath: string,
}

type Props = {
  children: any,
  auth: Auth,
  redirectPath: string,
}

const AuthContainer = (props: Props) => {
  if (props.auth.loading) {
    return <span>loading</span>
  } else if (props.auth.authorized) {
    return <Route children={props.children} />
  } else {
    return <Redirect to={props.redirectPath} />
  }
}

const ms = (state: State, op: OProps) => {
  return {
    auth: getAuth(state),
    ...op,
  }
}
const conn = connect(
  ms,
  {},
)

export default conn(AuthContainer)
