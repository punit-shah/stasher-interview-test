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
      <h5>
        <a>Fill in your data</a>
      </h5>

      <form className={formStyle} onSubmit={onSubmit}>
        <div className={row}>
          <label>Email</label>
          <input type="email" id="email" name="email" />
        </div>

        <div className={row}>
          <label>Password</label>
          <input type="password" id="password" name="password" />
        </div>

        <button type="submit" name="submit">Submit</button>
      </form>
    </div>
  )
}
