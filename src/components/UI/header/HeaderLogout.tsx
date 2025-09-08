import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

/**
 * See aliases paths in /tsconfig.json
 */
import { connectSlice } from '@/features/connect/connectSlice'
import { profileSlice } from '@/features/profile/profileSlice'
import { AppDispatch } from '@/app/types'
import { getUserName } from '@/app/selectors'


export default function HeaderLogout() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const userName = getUserName()
  const URL = window.location.pathname

  const handleSignOut = (e: React.MouseEvent) => {
    dispatch(connectSlice.actions.disconnect())
    dispatch(profileSlice.actions.disconnect())
    if(URL.includes('user'))
      navigate('/')
  }

  const handleShowUserPage = (e: React.MouseEvent) => {
    if(! URL.includes('user'))
      navigate('/user/1')
  }
  
  return <div>
      <a className='
        main-nav-item 
        main-nav-item-user 
        color-blue 
        font-weight-bold
        cursor-pointer' 
        onClick={handleShowUserPage}
      >
        <i className='fa fa-user-circle' aria-hidden='true'></i>
        {userName}
      </a>
      <a className='main-nav-item color-blue font-weight-bold' onClick={handleSignOut}>
        <i className='fa fa-sign-out'></i>
        Sign Out
      </a>
    </div>
}