import * as React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { CircularProgress } from '@material-ui/core'
import { State, Auth } from '../../types'
import { getAuth } from '../../state/Auth/selectors'

type Props = {
  redirectPath: string
}

const AuthContainer: React.FC<Props> = props => {
  const auth = useSelector<State, Auth>(getAuth)

  if (auth.loading) {
    return (
      <div style={{ margin: '1em' }}>
        <CircularProgress color="secondary" />
      </div>
    )
  } else if (auth.authorized) {
    return <Route render={() => props.children} />
  } else {
    return <Redirect to={props.redirectPath} />
  }
}

export default AuthContainer
