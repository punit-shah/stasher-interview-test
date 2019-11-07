import { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import cookie from 'js-cookie'
import moment from 'moment-mini'
import MoonLoader from 'react-spinners/MoonLoader'

import {
  getStashpoint,
  getQuote,
  makeBooking,
  finalizePay
} from '../utils/api'
import Layout from '../components/Layout'
import StashpointInfo from '../components/StashpointInfo'
import BookingInfo from '../components/BookingInfo'

import { twoColumn, buttonWithLoader } from '../style/style.css'

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

  const [booking, setBooking] = useState(false)

  const token = cookie.get('st_token')
  const onBook = async () => {
    setBooking(true)
    const booking = await makeBooking(
      { bags, dropOff, pickUp, stashpointId: stashpoint.id },
      token
    )
    const completedBooking = await finalizePay(
      { booking_id: booking.id },
      token
    )

    console.log(completedBooking.booking)

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

  console.log(quote)

  return (
    <Layout>
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

      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {isLoggedIn ? (
          <button className={buttonWithLoader} onClick={onBook} disabled={booking}>
            {booking ? 'Booking...' : 'Book now'}
            <MoonLoader size={12} loading={booking} />
          </button>
        ) : (
          <p>
            <Link
              href={`/login?nextPath=${currentPath}&nextQuery=${currentQuery}`}
            >
              <a>Log in</a>
            </Link>{' '}
            or{' '}
            <Link
              href={`/register?nextPath=${currentPath}&nextQuery=${currentQuery}`}
            >
              <a>register</a>
            </Link>{' '}
            to book now
          </p>
        )}
      </div>
    </Layout>
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
