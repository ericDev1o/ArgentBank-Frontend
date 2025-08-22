import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { connectSlice } from "../../../features/connect/connectSlice"
import { getProfileThunk } from "../../../features/getProfile/getProfileSlice"
import { AppDispatch } from "../../../app/types"
import { getToken } from "../../../app/selectors"

import styles from '../form/LoginForm.module.css'


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

  const handleGetProfile = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await dispatch(getProfileThunk(token)).unwrap()
    } 
    catch(error) {
      const msg = 'Profile retrieval failed: '
        
      switch (error) {
        case 'Error: User not found!':
          setServerError(error)
          break
        case 'Connection error':
          setServerError(msg + 'unknown connection error')
          break
        default:
          setServerError(msg + 'internal server error')
      }
    }
  }
  
  return <div>
      <a className="main-nav-item main-nav-item-user" onClick={handleGetProfile}>
        <i className="fa fa-user-circle"></i>
        Tony
      </a>
      {serverError && (
            <div className={`${styles.serverError} ${styles.errorColor}`}>
              {serverError}
            </div>
          )}
      <a className="main-nav-item" onClick={handleSignOut}>
        <i className="fa fa-sign-out"></i>
        Sign Out
      </a>
    </div>
}