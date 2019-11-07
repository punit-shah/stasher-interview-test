import Router from 'next/router'
import Link from 'next/link'
import cookie from 'js-cookie'

import RegisterForm from '../components/RegisterForm'
import { createUser } from '../utils/api'

import '../style/global.css'
import { title, page } from '../style/style.css'

const Register = () => {
  const onRegister = async details => {
    const user = await createUser(details)

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

      <RegisterForm onRegister={onRegister} />

      <p>Already have an account? <Link href="/login">Log in</Link></p>
    </div>
  )
}

export default Register
