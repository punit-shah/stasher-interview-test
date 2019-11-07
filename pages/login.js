import Router from 'next/router'
import Link from 'next/link'
import cookie from 'js-cookie'

import { loginUser } from '../utils/api'
import Layout from '../components/Layout'
import { LoginForm } from '../components/LoginForm'

const Login = ({ nextPath, nextQuery }) => {
  const onLogin = async data => {
    const user = await loginUser(data)

    if (user.token) {
      cookie.set('st_token', user.token)

      Router.push(
        {
          pathname: nextPath ? decodeURIComponent(nextPath) : '/',
          query: nextQuery ? JSON.parse(decodeURIComponent(nextQuery)) : {}
        },
        nextPath
      )
    }
  }

  return (
    <Layout>
      <LoginForm onLogin={onLogin} />

      <p>
        Don't have an account?{' '}
        <Link href="/register">
          <a>Register</a>
        </Link>
      </p>
    </Layout>
  )
}

Login.getInitialProps = ({ query: { nextPath, nextQuery } }) => ({
  nextPath,
  nextQuery
})

export default Login
