import { useEffect } from 'react'
import Router from 'next/router'

import Layout from '../components/Layout'
import StashpointInfo from '../components/StashpointInfo'
import BookingInfo from '../components/BookingInfo'

import { twoColumn } from '../style/style.css'

const Confirmation = ({ bags, ...props }) => {
  // redirect to index if props are missing
  useEffect(() => {
    if (!bags) {
      Router.replace('/')
    }
  })
  if (!bags) {
    return null
  }

  const {
    customerName,
    stashpoint,
    dropoff,
    pickup,
    ccySymbol,
    ccyMinorInMajor,
    firstDayPrice,
    extraDayPrice,
    discount,
    totalPrice
  } = props

  const {
    name: stashpointName,
    address: stashpointAddress,
    desscription: stashpointDescription
  } = stashpoint

  return (
    <Layout>
      <h2>Booking complete</h2>

      <p>You're all set, {customerName}!</p>

      <div className={twoColumn}>
        <StashpointInfo
          name={stashpointName}
          address={stashpointAddress}
          description={stashpointDescription}
        />
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
    </Layout>
  )
}

Confirmation.getInitialProps = ({ query: { booking } }) => {
  if (!booking) return {}

  const {
    customer: { first_name: customerName },
    stashpoint,
    bag_count: bags,
    dropoff,
    pickup,
    ccy_symbol: ccySymbol,
    ccy_minor_in_major: ccyMinorInMajor,
    first_day_price: firstDayPrice,
    extra_day_price: extraDayPrice,
    discount_amount: discount,
    total_price_amount: totalPrice
  } = JSON.parse(decodeURIComponent(booking))

  return {
    customerName,
    stashpoint,
    bags,
    dropoff,
    pickup,
    ccySymbol,
    ccyMinorInMajor,
    firstDayPrice,
    extraDayPrice,
    discount,
    totalPrice
  }
}

export default Confirmation
