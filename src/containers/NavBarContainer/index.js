// @flow

import { connect } from 'react-redux'
import NavBar from '../../components/NavBar'
import type { State } from '../../types'

const ms = (state: State) => ({})

const conn = connect(ms, {})

export default conn(NavBar)
