import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Layout from "../components/containers/Layout";
import SignIn from './SignIn';
import { getFirstName, getLastName, getToken } from '../app/selectors';
import { AppDispatch } from '../app/types';
import { getProfileThunk } from '../features/getProfile/getProfileSlice';

export default function User() {
  const token = getToken()
  const firstName = getFirstName()
  const lastName = getLastName()

  const dispatch = useDispatch<AppDispatch>()

  const [serverError, setServerError] = useState<string | null>(null);

  const handleGetProfile = async () => {
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

  useEffect(() => {
    console.log('Token updated:', token)
  }, [token])

  if(token) {
    handleGetProfile()

    return <Layout logIn={false}>
      <main className="main bg-dark main-bg-user">
        <section className="user-welcome">
          <h2 className="user-welcome-title">Welcome back<br/>{firstName} {lastName}</h2>
          <button className="edit-button">Edit Name</button>
        </section>
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