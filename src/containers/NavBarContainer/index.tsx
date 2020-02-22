import * as React from 'react'
import { useDispatch } from 'react-redux'
import NavBar from '../../components/NavBar/index'
import { refInit } from '../../state/Firebase/operations'

function NavBarContainer() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(refInit())
  })
  return <NavBar />
}

export default NavBarContainer
