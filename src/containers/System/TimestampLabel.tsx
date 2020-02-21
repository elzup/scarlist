import * as React from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { State as RootState } from '../../types'

// import * as selectors from './selectors'
import { getTimestampStr } from '../../state/System/selectors'

type Props = {
  timestampStr: string
}

const TimestampLabel = (props: Props) => {
  return <Typography>{props.timestampStr}</Typography>
}

const ms = (state: RootState) => ({
  timestampStr: getTimestampStr(state),
})

const conn = connect(
  ms,
  {},
)

export default conn(TimestampLabel)
