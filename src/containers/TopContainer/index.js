// @flow
import { connect } from 'react-redux'
import * as React from 'react'

import type { State as RootState } from '../../types'
import RoomListContainer from '../RoomListContainer'

import { loadData } from './logic'
import { Page } from '../../components'
// import * as selectors from './selectors'
import UserForm from '../UserForm'
import MacAddrDescription from '../../components/MacAddrDescription'
import { Tab } from '@material-ui/core'
import { Tabs } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'

type Props = {
  loadData: typeof loadData,
  roomIds: string[],
}

type State = {
  selectedTab: number,
}

class TopContainer extends React.Component<Props, State> {
  state = { selectedTab: 0 }
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    return (
      <div>
        <Page>
          <Tabs
            value={this.state.selectedTab}
            onChange={(e, selectedTab: number) => {
              this.setState({ selectedTab })
            }}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="ホーム" />
            <Tab label="設定" />
          </Tabs>
          <SwipeableViews
            axis={'x'}
            index={this.state.selectedTab}
            onChangeIndex={(selectedTab: number) => {
              this.setState({ selectedTab })
            }}
          >
            <div>
              <RoomListContainer />
            </div>
            <div>
              <Paper>
                <UserForm />
              </Paper>
              <Paper>
                <MacAddrDescription />
              </Paper>
            </div>
          </SwipeableViews>
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
