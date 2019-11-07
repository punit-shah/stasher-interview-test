import { page, title, twoColumn } from '../style/style.css'
import StashpointInfo from '../components/StashpointInfo'
import BookingInfo from '../components/BookingInfo'

const Confirmation = ({ booking }) => {
  const {
    customer: {
      first_name: customerName
    },
    stashpoint: {
      name,
      address,
      description
    },
    bag_count: bags,
    dropoff,
    pickup,
    ccy_symbol: ccySymbol,
    ccy_minor_in_major: ccyMinorInMajor,
    first_day_price: firstDayPrice,
    extra_day_price: extraDayPrice,
    discount_amount: discount,
    total_price_amount: totalPrice
  } = booking

  return (
    <div className={page}>
      <h1 className={title}>Stasher</h1>

      <h2>Booking complete</h2>

      <p>You're all set, {customerName}!</p>

      <div className={twoColumn}>
        <StashpointInfo name={name} address={address} description={description} />
        <BookingInfo
          bags={bags}
          dropOff={dropoff}
          pickUp={pickup}
          quote={{
            ccySymbol,
            ccyMinorInMajor,
            firstDayPrice,
            extraDayPrice,
            discount,
            totalPrice
          }}
        />
      </div>
    </div>
  )
}

Confirmation.getInitialProps = ({ query: { booking } }) =>
  ({ booking: JSON.parse(decodeURIComponent(booking)) })

export default Confirmation
