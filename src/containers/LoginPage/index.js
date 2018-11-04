// @flow

import * as React from 'react'
import { connect } from 'react-redux'

import { Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'

import type { State } from '../../types'
import { login } from '../Firebase/logic'
import { Page } from '../../components'
import NavBar from '../NavBarContainer'
import { getIsLogin } from '../Auth/selectors'
import { Redirect } from 'react-router-dom'

type Props = {
  login: typeof login,
  isLogin: boolean,
}

const LoginPage = (props: Props) => {
  if (props.isLogin) {
    return <Redirect to={'/'} />
  }
  return (
    <div>
      <NavBar />
      <Page>
        <section>
          <Typography variant="h4">ScarList へようこそ</Typography>
          <Button onClick={props.login}>Google アカウントでログイン</Button>
        </section>
      </Page>
    </div>
  )
}

const ms = (state: State) => ({
  isLogin: getIsLogin(state),
})

const conn = connect(
  ms,
  { login },
)

export default conn(LoginPage)
