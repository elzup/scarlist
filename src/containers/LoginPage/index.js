// @flow

import * as React from 'react'
import { connect } from 'react-redux'

import { Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'

import type { State } from '../../types'
import { login } from '../Firebase/logic'

type Props = {
  login: typeof login,
}

const LoginPage = (props: Props) => {
  return (
    <div>
      <Typography variant="display2">ようこそ</Typography>
      <Button onClick={props.login}>Google アカウントでログイン</Button>
    </div>
  )
}

const ms = (state: State) => {}
const conn = connect(
  ms,
  { login },
)

export default conn(LoginPage)
