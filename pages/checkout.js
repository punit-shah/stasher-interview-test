import moment from 'moment-mini'
import { getStashpoint, getQuote } from '../utils/api'
import StashpointInfo from '../components/StashpointInfo'
import '../style/global.css'
import { title, page, twoColumn } from '../style/style.css'
import BookingInfo from '../components/BookingInfo'

const Checkout = ({ bags, dropOff, pickUp, stashpoint, quote }) => {
  return (
    <div className={page}>
      <h1 className={title}>Stasher</h1>

      <div className={twoColumn}>
        <StashpointInfo {...stashpoint} />
        <BookingInfo bags={bags} dropOff={dropOff} pickUp={pickUp} quote={quote} />
      </div>
    </div>
  )
}

Checkout.getInitialProps = async ({ query }) => {
  const dropOff = moment(query.dropOff)
  const pickUp = moment(query.pickUp)
  const stashpoint = await getStashpoint(query.id)
  const quote = await getQuote({
    stashpointId: query.id,
    bags: query.bags,
    dropOff,
    pickUp
  })

  return {
    bags: query.bags,
    dropOff,
    pickUp,
    stashpoint,
    quote
  }
}

export default Checkout
