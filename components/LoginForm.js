import { form as formStyle, row } from './Form.css'

export const LoginForm = ({ onLogin }) => {
  const onSubmit = (ev) => {
    const {
      target: {
        email: { value: email },
        password: { value: password }
      }
    } = ev

    ev.preventDefault()

    onLogin({ email, password })
  }

  return (
    <div>
      <h2>
        Log in
      </h2>

      <form className={formStyle} onSubmit={onSubmit}>
        <div className={row}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className={row}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit" name="submit">Log in</button>
      </form>
    </div>
  )
}
