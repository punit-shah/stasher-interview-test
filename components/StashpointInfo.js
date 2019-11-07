import moment from 'moment-mini'
import { box, title, subtitle, table } from '../style/style.css'
import { overview, stashpointImage } from './StashpointInfo.css'

const formatOpeningHours = (open, close) =>
  `${moment(open, 'HH:mm:ss').format('HH:mm')} – ${moment(close, 'HH:mm:ss').format('HH:mm')}`

const getOpeningHoursTableRows = openingHours => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  return openingHours.map(({ day, open, close }, index) => (
    <tr key={index}>
      <td>{days[day]}</td>
      <td>{formatOpeningHours(open, close)}</td>
    </tr>
  ))
}

const StashpointInfo = ({
  name,
  address,
  description,
  photos,
  openingHours
}) => (
  <section className={box}>
    <h2 className={title}>Your Stashpoint</h2>
    <div className={overview}>
      {photos && photos.length && (
        <div className={stashpointImage}>
          <img src={photos[0]} alt={name} />
        </div>
      )}
      <div>
        <h3>{name}</h3>
        {address && <p>{address}</p>}
      </div>
    </div>

    {description && <p>{description}</p>}

    {openingHours && (
      <>
        <h4 className={subtitle}>Opening hours</h4>
        <table className={table}>
          <tbody>
            {getOpeningHoursTableRows(openingHours)}
          </tbody>
        </table>
      </>
    )}
  </section>
)

export default StashpointInfo
