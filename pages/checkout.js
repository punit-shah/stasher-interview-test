import { useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import cookie from 'js-cookie'
import moment from 'moment-mini'

import {
  getStashpoint,
  getQuote,
  makeBooking,
  finalizePay
} from '../utils/api'
import StashpointInfo from '../components/StashpointInfo'
import BookingInfo from '../components/BookingInfo'

import '../style/global.css'
import { title, page, twoColumn } from '../style/style.css'

const Checkout = ({ bags, ...props }) => {
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
    dropOff,
    pickUp,
    stashpoint,
    quote,
    currentPath,
    currentQuery
  } = props

  const token = cookie.get('st_token')
  const onBook = async () => {
    const booking = await makeBooking(
      { bags, dropOff, pickUp, stashpointId: stashpoint.id },
      token
    )
    const completedBooking = await finalizePay(
      { booking_id: booking.id },
      token
    )

    if (completedBooking.id) {
      Router.push(
        {
          pathname: '/confirmation',
          query: {
            booking: encodeURIComponent(
              JSON.stringify(completedBooking.booking)
            )
          }
        },
        '/confirmation'
      )
    }
  }
  const isLoggedIn = !!token

  return (
    <div className={page}>
      <h1 className={title}>Stasher</h1>

      <div className={twoColumn}>
        <StashpointInfo
          name={stashpoint.name}
          address={stashpoint.address}
          description={stashpoint.description}
          photos={stashpoint.photos}
          openingHours={stashpoint.opening_hours}
        />
        <BookingInfo
          bags={bags}
          dropOff={dropOff}
          pickUp={pickUp}
          quote={quote}
        />
      </div>

      <p style={{ textAlign: 'center' }}>
        {isLoggedIn ? (
          <button onClick={onBook}>Book now</button>
        ) : (
          <>
            <Link
              href={`/login?nextPath=${currentPath}&nextQuery=${currentQuery}`}
            >
              <a>Log in</a>
            </Link>
            {' or '}
            <Link
              href={`/register?nextPath=${currentPath}&nextQuery=${currentQuery}`}
            >
              <a>register</a>
            </Link>
            {' to book now'}
          </>
        )}
      </p>
    </div>
  )
}

Checkout.getInitialProps = async ({ query, pathname }) => {
  if (!Object.keys(query).length) {
    return {}
  }

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
