import Router from 'next/router'
import Link from 'next/link'
import cookie from 'js-cookie'

import RegisterForm from '../components/RegisterForm'
import { createUser } from '../utils/api'

import '../style/global.css'
import { title, page } from '../style/style.css'

const Register = ({ nextPath, nextQuery }) => {
  const onRegister = async details => {
    const user = await createUser(details)

    if (user.token) {
      cookie.set('st_token', user.token)

      Router.push({
        pathname: nextPath ? decodeURIComponent(nextPath) : '/',
        query: nextQuery ? JSON.parse(decodeURIComponent(nextQuery)) : {}
      })
    }
  }

  return (
    <div className={page}>
      <h1 className={title}>Stasher</h1>

      <RegisterForm onRegister={onRegister} />

      <p>Already have an account? <Link href="/login"><a>Log in</a></Link></p>
    </div>
  )
}

Register.getInitialProps = ({ query: { nextPath, nextQuery } }) => ({ nextPath, nextQuery })

export default Register
