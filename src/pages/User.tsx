import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Layout from "../components/containers/Layout";
import SignIn from './SignIn';
import { getFirstName, getLastName, getToken } from '../app/selectors';
import { AppDispatch } from '../app/types';
import { getProfileThunk } from '../features/profile/profileSlice';
import UserForm from '../components/UI/form/username/UserForm'
import thunkError_helper from '../helpers/thunkErrorHelper';

import styles from '../css/components/UI/form/form.module.css'

export default function User() {
  const token = getToken()
  const firstName = getFirstName()
  const lastName = getLastName()

  const dispatch = useDispatch<AppDispatch>()

  const [serverError, setServerError] = useState<string | null>(null);
  const [editUserName, setEditUserName] = useState(false)

  const handleEditUsername = () => {
    setEditUserName(true)
  }

  /**
   * Displays the user-welcome section instead of the userForm section.
   */
  const hideEditUserName = () => {
    setEditUserName(false)
  }

  const handleGetProfile = async () => {
    try {
      await dispatch(getProfileThunk(token)).unwrap()
    } 
    catch(error) {
      const msg = 'Profile retrieval failed: '
      thunkError_helper(error, setServerError, msg)
    }
  }

  useEffect(() => {
    handleGetProfile()
  }, [])

  if(token) {
    return <Layout logIn={false}>
      <main className="main bg-dark main-bg-user">
        { editUserName === false ? 
        <section className="user-welcome">
          <h2 className="user-welcome-title">Welcome back<br/>{firstName} {lastName}</h2>
          <button className="edit-button" onClick={handleEditUsername}>Edit Name</button>
        </section>
        : 
         <section className={`sign-in-content ${styles.userForm}`}>
          <h2 className='user-welcome-title'>Edit user info</h2>
          <UserForm hideEdit={hideEditUserName}/>
        </section>
        }
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </Layout>
  }
  else return <SignIn />
}