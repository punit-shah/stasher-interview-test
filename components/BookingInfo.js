import moment from 'moment-mini'
import { box, title, hr, table } from '../style/style.css'

const getPriceString = (price, minorInMajor, symbol) =>
  `${symbol}${(price / minorInMajor).toFixed(2)}`

const BookingInfo = ({
  bags,
  dropOff,
  pickUp,
  quote: {
    ccySymbol,
    ccyMinorInMajor,
    firstDayPrice,
    extraDays,
    extraDayPrice,
    discount,
    totalPrice
  }
}) => (
  <section className={box}>
    <h2 className={title}>Booking Information</h2>

    <p>No. of bags: {bags}</p>
    <p>Drop-off: {moment(dropOff).calendar()}</p>
    <p>Pick-up: {moment(pickUp).calendar()}</p>

    <hr className={hr} />

    <table className={table}>
      <tbody>
        <tr>
          <td>First day</td>
          <td>
            {getPriceString(firstDayPrice, ccyMinorInMajor, ccySymbol)}
          </td>
        </tr>
        {extraDays ? (
          <tr>
            <td>Extra days</td>
            <td>
              {getPriceString(extraDayPrice, ccyMinorInMajor, ccySymbol)}
            </td>
          </tr>
        ) : null}
        {discount ? (
          <tr>
            <td>Discount</td>
            <td>
              -{getPriceString(discount, ccyMinorInMajor, ccySymbol)}
            </td>
          </tr>
        ) : null}
        <tr style={{ fontWeight: 'bold' }}>
          <td>Total</td>
          <td>
            {getPriceString(totalPrice, ccyMinorInMajor, ccySymbol)}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
)

export default BookingInfo
