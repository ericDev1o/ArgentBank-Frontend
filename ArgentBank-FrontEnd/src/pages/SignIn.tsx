import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'

import Layout from "../components/containers/Layout";

export default function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignIn = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      {
        type:'CONNECT',
        payload: 'TODOtestToken'
      })
      navigate('/user/1')
  }

  return <Layout logIn={true}>
    <main className="main bg-dark main-bg-sign">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username"/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password"/>
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me"/>
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button 
            className="sign-in-button" 
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  </Layout>
}