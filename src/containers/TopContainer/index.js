// @flow
import { connect } from 'react-redux'
import * as React from 'react'

import { Grid } from '@material-ui/core'
import type { State as RootState } from '../../types'
import RoomListContainer from '../RoomListContainer'

import { loadData } from './logic'
// import * as selectors from './selectors'

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
        <Grid container justify={'center'}>
          <Grid item xs={12} sm={10}>
            <RoomListContainer />
          </Grid>
        </Grid>
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
