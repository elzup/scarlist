import { connect } from 'react-redux'
import UserForm from '../../components/UserForm'
import { State as RootState } from '../../types'
import { updateUser } from '../../state/Firebase/logic'
import { getUser } from '../../state/Auth/selectors'

// import * as selectors from './selectors'

const ms = (state: RootState) => ({
  user: getUser(state),
  loading: state.UserForm.loading,
})

const conn = connect(
  ms,
  { updateUser },
)

export default conn(UserForm)
