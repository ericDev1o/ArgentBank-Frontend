import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { connectSlice } from "../../../features/connect/connectSlice"
import { AppDispatch } from "../../../app/types"
import { getToken } from "../../../app/selectors"

export default function HeaderLogout() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const token = getToken()

  const [serverError, setServerError] = useState<string | null>(null);

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(connectSlice.actions.disconnect())
    navigate('/')
  }
  
  return <div>
      <a className="main-nav-item main-nav-item-user" href="">
        <i className="fa fa-user-circle"></i>
        Tony
      </a>
      <a className="main-nav-item" onClick={handleSignOut}>
        <i className="fa fa-sign-out"></i>
        Sign Out
      </a>
    </div>
}