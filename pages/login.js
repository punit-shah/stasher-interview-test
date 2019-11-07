import Router from 'next/router'
import Link from 'next/link'
import cookie from 'js-cookie'

import { LoginForm } from '../components/LoginForm'
import { loginUser } from '../utils/api'

import '../style/global.css'
import { title, page } from '../style/style.css'

const Login = () => {
  const onLogin = async (data) => {
    const user = await loginUser(data)

    if (user.token) {
      cookie.set('st_token', user.token)

      Router.push({
        pathname: '/',
        query: {}
      })
    }
  }

  return (
    <div className={page}>
      <h1 className={title}>Stasher</h1>

      <LoginForm onLogin={onLogin} />

      <p>Don't have an account? <Link href="/register">Register</Link></p>
    </div>
  )
}

export default Login
