import classnames from 'classnames'

import { label as labelStyle } from '../style/style.css'

import { filterButton } from './SearchBar.css'
import { selector } from './BagSelector.css'

export const BagSelector = ({ className, id, value, options, onSelect }) => {
  return (
    <div className={classnames(filterButton, className)}>
      <label className={labelStyle} htmlFor={id}>
        Bags
      </label>

      <br />

      <select className={selector} id={id} defaultValue={value}>
        {options.map(i => (
          <option key={i} value={i + 1} onClick={() => onSelect(i + 1)}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  )
}
