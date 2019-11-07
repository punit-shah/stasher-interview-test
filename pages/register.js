import Router from 'next/router'
import Link from 'next/link'
import cookie from 'js-cookie'

import { createUser } from '../utils/api'
import Layout from '../components/Layout'
import RegisterForm from '../components/RegisterForm'

const Register = ({ nextPath, nextQuery }) => {
  const onRegister = async details => {
    const user = await createUser(details)

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
      <RegisterForm onRegister={onRegister} />

      <p>
        Already have an account?{' '}
        <Link href="/login">
          <a>Log in</a>
        </Link>
      </p>
    </Layout>
  )
}

Register.getInitialProps = ({ query: { nextPath, nextQuery } }) => ({
  nextPath,
  nextQuery
})

export default Register
