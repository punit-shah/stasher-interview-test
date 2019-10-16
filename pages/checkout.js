import '../style/global.css'
import { title, page } from '../style/style.css'


const Checkout = ({ query }) => {
  return (
    <div className={page}>
      <h3 className={title}>Stasher!</h3>

    </div>
  )
}


Checkout.getInitialProps = ({ query }) => {
  return { query }
}

export default Checkout
