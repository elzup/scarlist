import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'

import { Tab, Tabs, Paper, Button } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import RoomListContainer from '../RoomListContainer'

import { loadData } from '../../state/TopContainer/operations'
import { Page } from '../../components'
// import * as selectors from './selectors'
import UserForm from '../UserForm'
import MacAddrDescription from '../../components/MacAddrDescription'

import { logout } from '../../state/Firebase/operations'

type Props = {
  loadData: () => void
  roomIds: string[]
  logout: () => void
}

function TopContainer(props: Props) {
  const [selectedTab, setSelectedTab] = useState<number>(0)

  useEffect(() => {
    props.loadData()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Page>
        <Tabs
          value={selectedTab}
          onChange={(e, selectedTab) => {
            setSelectedTab(selectedTab)
          }}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="ホーム" />
          <Tab label="設定" />
        </Tabs>
        <SwipeableViews
          axis={'x'}
          index={selectedTab}
          onChangeIndex={(selectedTab: number) => {
            setSelectedTab(selectedTab)
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

const conn = connect(() => ({}), { loadData, logout })

export default conn(TopContainer)
