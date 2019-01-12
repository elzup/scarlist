import * as React from 'react'
import { connect } from 'react-redux'

import { Typography, Paper } from '@material-ui/core'
import { Button } from '@material-ui/core'

import { State, Auth } from '../../types'
import { login } from '../../state/Firebase/logic'
import { Page } from '../../components'
import { getAuth } from '../../state/Auth/selectors'
import { Redirect } from 'react-router-dom'

type Props = {
  login: () => void
  auth: Auth
}

const LoginPage = (props: Props) => {
  if (!props.auth.loading && props.auth.authorized) {
    return <Redirect to={'/'} />
  }
  return (
    <div>
      {props.auth.loading && <span>loading</span>}
      {!props.auth.loading && (
        <Page>
          <Paper>
            <section>
              <Typography variant="h4">ScarList へようこそ</Typography>
              <Button onClick={props.login}>Google アカウントでログイン</Button>
            </section>
          </Paper>
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
