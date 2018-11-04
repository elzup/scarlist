// @flow

import * as React from 'react'
import { connect } from 'react-redux'

import { Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'

import type { State, Auth } from '../../types'
import { login } from '../Firebase/logic'
import { Page } from '../../components'
import NavBar from '../NavBarContainer'
import { getAuth } from '../Auth/selectors'
import { Redirect } from 'react-router-dom'

type Props = {
  login: typeof login,
  auth: Auth,
}

const LoginPage = (props: Props) => {
  if (!props.auth.loading && props.auth.authorized) {
    return <Redirect to={'/'} />
  }
  return (
    <div>
      <NavBar />
      {props.auth.loading && <span>loading</span>}
      {!props.auth.loading && (
        <Page>
          <section>
            <Typography variant="h4">ScarList へようこそ</Typography>
            <Button onClick={props.login}>Google アカウントでログイン</Button>
          </section>
        </Page>
      )}
    </div>
  )
}

const ms = (state: State) => ({ auth: getAuth(state) })

const conn = connect(
  ms,
  { login },
)

export default conn(LoginPage)
