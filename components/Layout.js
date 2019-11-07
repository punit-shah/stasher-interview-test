import Link from 'next/link'
import '../style/global.css'
import { title, page } from '../style/style.css'

const Layout = ({ children }) => (
  <div className={page}>
    <h1 className={title}>
      <Link href="/">
        <a>Stasher</a>
      </Link>
    </h1>

    <div>{children}</div>
  </div>
)

export default Layout
