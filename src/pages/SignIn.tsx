import Layout from '../components/containers/Layout'
import LoginForm from '../components/UI/form/login/LoginForm'

export default function SignIn() {
  return <Layout>
    <main className='flex-1 bg-dark main-bg-sign'>
      <section className='
        sign-in-content 
        margin-0-auto 
        padding-2rem 
        box-sizing-border-box'>
        <i className='fa fa-user-circle sign-in-icon'></i>
        <h1>Sign In</h1>
        <LoginForm />
      </section>
    </main>
  </Layout>
}