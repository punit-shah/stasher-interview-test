import moment from 'moment-mini'
import { box, title, hr, table } from '../style/style.css'

const getPriceString = (price, minorInMajor, symbol) =>
  `${symbol}${(price / minorInMajor).toFixed(2)}`

const BookingInfo = ({ bags, dropOff, pickUp, quote, onBook }) => (
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
            {getPriceString(
              quote.firstDayPrice,
              quote.ccyMinorInMajor,
              quote.ccySymbol
            )}
          </td>
        </tr>
        {quote.extraDays ? (
          <tr>
            <td>Extra days</td>
            <td>
              {getPriceString(
                quote.extraDayPrice,
                quote.ccyMinorInMajor,
                quote.ccySymbol
              )}
            </td>
          </tr>
        ) : null}
        <tr style={{ fontWeight: 'bold' }}>
          <td>Total</td>
          <td>
            {getPriceString(
              quote.totalPrice,
              quote.ccyMinorInMajor,
              quote.ccySymbol
            )}
          </td>
        </tr>
      </tbody>
    </table>
    <div style={{ margin: '24px 0', textAlign: 'right' }}>
      <button onClick={onBook}>Book now</button>
    </div>
  </section>
)

export default BookingInfo
