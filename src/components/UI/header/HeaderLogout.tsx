import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { connectSlice } from "../../../features/connect/connectSlice"

export default function HeaderLogout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(connectSlice.actions.disconnect())
    navigate('/')
  }
  return <div>
      <a className="main-nav-item main-nav-item-user" href="./1">
        <i className="fa fa-user-circle"></i>
        Tony
      </a>
      <a className="main-nav-item" onClick={handleSignOut}>
        <i className="fa fa-sign-out"></i>
        Sign Out
      </a>
    </div>
}