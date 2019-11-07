import { stashpoint, stashpointName, bookButton } from './Stashpoint.css'

export const Stashpoint = ({
  data: { name, location_name: locationName, address, rating },
  onBook
}) => {
  return (
    <div className={stashpoint}>
      <p className={stashpointName}>
        {locationName} - {name}
      </p>

      <p>{address}</p>

      <button className={bookButton} onClick={onBook}>Book</button>
    </div>
  )
}
