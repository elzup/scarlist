import { connect } from 'react-redux'
import * as React from 'react'

import { State as RootState } from '../../types'
import RoomListContainer from '../RoomListContainer'

import { loadData } from '../../state/TopContainer/operations'
import { Page } from '../../components'
// import * as selectors from './selectors'
import UserForm from '../UserForm'
import MacAddrDescription from '../../components/MacAddrDescription'
import { Tab } from '@material-ui/core'
import { Tabs } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import { Button } from '@material-ui/core'
import { logout } from '../../state/Firebase/operations'

type Props = {
  loadData: () => void
  roomIds: string[]
  logout: () => void
}

type State = {
  selectedTab: number
}

class TopContainer extends React.Component<Props, State> {
  state = { selectedTab: 0 }
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    const { props } = this
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
              <Paper>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={props.logout}
                >
                  ログアウトする
                </Button>
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
  { loadData, logout },
)

export default conn(TopContainer)
