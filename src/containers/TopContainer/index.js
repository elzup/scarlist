// @flow
import { connect } from 'react-redux'
import * as React from 'react'

import type { State as RootState } from '../../types'
import RoomListContainer from '../RoomListContainer'

import { loadData } from './logic'
import { Page } from '../../components'
// import * as selectors from './selectors'
import UserForm from '../UserForm'
import { Typography } from '@material-ui/core'
import { Paper } from '@material-ui/core'

type Props = {
  loadData: typeof loadData,
  roomIds: string[],
}

class TopContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    return (
      <div>
        <Page>
          <RoomListContainer />
        </Page>
      </div>
    )
  }
}

const ms = (state: RootState) => ({})

const conn = connect(
  ms,
  { loadData },
)

export default conn(TopContainer)
