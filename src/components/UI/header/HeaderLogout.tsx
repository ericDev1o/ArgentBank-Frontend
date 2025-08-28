import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

/**
 * See aliases paths in /tsconfig.json
 */
import { connectSlice } from '@/features/connect/connectSlice'
import { AppDispatch } from '@/app/types'
import { getUserName } from '@/app/selectors'

export default function HeaderLogout() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const userName = getUserName()

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(connectSlice.actions.disconnect())
    navigate('/')
  }
  
  return <div>
      <a className="main-nav-item main-nav-item-user" >
        <i className="fa fa-user-circle" aria-hidden="true"></i>
        {userName}
      </a>
      <a className="main-nav-item" onClick={handleSignOut}>
        <i className="fa fa-sign-out"></i>
        Sign Out
      </a>
    </div>
}