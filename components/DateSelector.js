import classnames from 'classnames'
import moment from 'moment-mini'

import { label as labelStyle } from '../style/style.css'

import { filterButton } from './SearchBar.css'
import { dateSelector, timeSelector } from './DateSelector.css'

const hours = Array.apply(null, Array(24)).map(
  (x, i) => `${i.toString().padStart(2, '0')}:00`
)

export const DateSelector = ({
  className,
  label,
  idPrefix,
  value: datetime,
  onChange
}) => {
  const date = datetime.format('YYYY-MM-DD')
  const time = datetime.format('HH:00')

  const updateDatetime = ({ date, time }) => {
    if (!date && !time) {
      return
    }

    let newTime = moment(datetime)

    if (date) {
      newTime = moment(date)
    }

    if (time) {
      newTime.hour(time)
    } else {
      newTime.hour(datetime.hour())
    }

    onChange(newTime)
  }

  return (
    <div className={classnames(filterButton, className)}>
      <label className={labelStyle} htmlFor={`${idPrefix}-date`}>
        {label}
      </label>

      <br />

      <div>
        <input
          className={dateSelector}
          id={`${idPrefix}-date`}
          type="date"
          value={date}
          onChange={({ target: { value } }) => updateDatetime({ date: value })}
        />
        <select
          className={timeSelector}
          id={`${idPrefix}-time`}
          defaultValue={hours.find(h => h === time)}
        >
          {hours.map(h => (
            <option
              key={h}
              value={h}
              onClick={() => updateDatetime({ time: h })}
            >
              {h}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
