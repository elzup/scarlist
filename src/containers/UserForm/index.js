// @flow
import { connect } from 'react-redux'
import UserForm from '../../components/UserForm'
import type { State as RootState } from '../../types'
import { updateUser } from '../Firebase/logic'
import { getUser } from '../Auth/selectors'

// import * as selectors from './selectors'

const ms = (state: RootState) => ({
  user: getUser(state),
})

const conn = connect(
  ms,
  { updateUser },
)

export default conn(UserForm)
