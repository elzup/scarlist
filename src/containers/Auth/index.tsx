import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { State, Auth } from '../../types'
import { getAuth } from '../../state/Auth/selectors'
import { CircularProgress } from '@material-ui/core'

type OProps = {
  redirectPath: string
}

type Props = {
  children: any
  auth: Auth
  redirectPath: string
}

const AuthContainer = (props: Props) => {
  if (props.auth.loading) {
    return (
      <div style={{ margin: '1em' }}>
        <CircularProgress color="secondary" />
      </div>
    )
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
