import { getStashpoint } from '../utils/api'

import '../style/global.css'
import { title, page } from '../style/style.css'

const Checkout = ({ stashpoint }) => {
  console.log(stashpoint)

  return (
    <div className={page}>
      <h3 className={title}>Stasher!</h3>

    </div>
  )
}

Checkout.getInitialProps = async ({ query }) => {
  const { id } = query
  const stashpoint = await getStashpoint(id)

  return { stashpoint }
}

export default Checkout
