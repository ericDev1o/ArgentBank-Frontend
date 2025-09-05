import Layout from '../components/containers/Layout'
import LoginForm from '../components/UI/form/login/LoginForm'

export default function SignIn() {
  return <Layout logIn={true}>
    <main className='main bg-dark main-bg-sign'>
      <section className='sign-in-content'>
        <i className='fa fa-user-circle sign-in-icon'></i>
        <h1>Sign In</h1>
        <LoginForm />
      </section>
    </main>
  </Layout>
}