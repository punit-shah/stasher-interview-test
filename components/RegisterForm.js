import { form as formStyle, row } from './Form.css'

const RegisterForm = ({ onRegister }) => {
  const onSubmit = (event) => {
    const {
      target: {
        firstname: { value: first },
        lastname: { value: last },
        phone: { value: phone },
        email: { value: email },
        password: { value: password }
      }
    } = event

    event.preventDefault()

    onRegister({ first, last, phone, email, password })
  }

  return (
    <div>
      <h2>
        Register
      </h2>

      <form className={formStyle} onSubmit={onSubmit}>
        <div className={row}>
          <label htmlFor="firstname">First name</label>
          <input type="text" id="firstname" name="firstname" required />
        </div>

        <div className={row}>
          <label htmlFor="lastname">Last name</label>
          <input type="text" id="lastname" name="lastname" required />
        </div>

        <div className={row}>
          <label htmlFor="phone">Phone number</label>
          <input type="tel" id="phone" name="phone" required />
        </div>

        <div className={row}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className={row}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit" name="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterForm
