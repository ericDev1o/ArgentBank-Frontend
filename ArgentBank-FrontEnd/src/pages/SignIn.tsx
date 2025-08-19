import { useEffect, useState } from "react";
import { useStore } from "react-redux";

import Layout from "../components/containers/Layout";
import { AppStore } from "../app/store";

export default function SignIn() {
  const store:AppStore = useStore()
  const [token, setToken] = useState(store.getState().token)

  useEffect(() => {
    store.subscribe(() => {
      setToken(store.getState().token)
    }
  )}, [store])

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
          <a 
            href="./1" 
            className="sign-in-button" 
            onClick={() => store.dispatch(
              {
                type:'CONNECT',
                payload: 'TODOtestToken'
              })}
          >
            Sign In
          </a>
        </form>
      </section>
    </main>
  </Layout>
}