// @flow
import { connect } from 'react-redux'
import * as React from 'react'

import type { State as RootState } from '../../types'
import RoomListContainer from '../RoomListContainer'

import { loadData } from './logic'
import { Page } from '../../components'
// import * as selectors from './selectors'
import NavBar from '../NavBarContainer'
import UserForm from '../UserForm'

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
        <NavBar />
        <Page>
          <RoomListContainer />
        </Page>
        <Page>
          <UserForm />
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
