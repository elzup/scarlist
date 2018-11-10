// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'

import type { State as RootState } from '../../types'
// import * as selectors from './selectors'
import MacAddrDescription from '../../components/MacAddrDescription'
import UserForm from '../UserForm'
import { Page } from '../../components'

type Props = {}

class SettingContainer extends React.Component<Props> {
  render() {
    return (
      <div>
        <Page>
          <Paper>
            <UserForm />
          </Paper>
          <Paper>
            <MacAddrDescription />
          </Paper>
        </Page>
      </div>
    )
  }
}

const ms = (state: RootState) => ({})

const conn = connect(
  ms,
  {},
)

export default conn(SettingContainer)
