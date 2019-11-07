import moment from 'moment-mini'
import cookie from 'js-cookie'
import { getStashpoint, getQuote, makeBooking, finalizePay } from '../utils/api'
import StashpointInfo from '../components/StashpointInfo'
import '../style/global.css'
import { title, page, twoColumn } from '../style/style.css'
import BookingInfo from '../components/BookingInfo'

const Checkout = ({
  bags,
  dropOff,
  pickUp,
  stashpoint,
  quote,
  currentPath,
  currentQuery
}) => {
  const token = cookie.get('st_token')
  const onBook = async () => {
    const booking = await makeBooking({ bags, dropOff, pickUp, stashpointId: stashpoint.id }, token)
    console.log(booking)

    const pay = await finalizePay({ booking_id: booking.id }, token)
    console.log(pay)
  }
  const isLoggedIn = !!token

  return (
    <div className={page}>
      <h1 className={title}>Stasher</h1>

      <div className={twoColumn}>
        <StashpointInfo {...stashpoint} />
        <BookingInfo
          bags={bags}
          dropOff={dropOff}
          pickUp={pickUp}
          quote={quote}
          isLoggedIn={isLoggedIn}
          currentPath={currentPath}
          currentQuery={currentQuery}
          onBook={onBook}
        />
      </div>
    </div>
  )
}

Checkout.getInitialProps = async ({ query, pathname }) => {
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
    quote,
    currentPath: encodeURIComponent(pathname),
    currentQuery: encodeURIComponent(JSON.stringify(query))
  }
}

export default Checkout
