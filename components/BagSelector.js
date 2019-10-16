import classnames from 'classnames'

import { label as labelStyle } from '../style/style.css'

import { filterButton } from './SearchBar.css'
import { selector } from './BagSelector.css'


export const BagSelector = ({ className, label, value, options, onSelect }) => {
  return (
    <div className={classnames(filterButton, className)}>
      <label className={labelStyle}>Bags</label>

      <br />

      <select className={selector} name={label}>
        {options.map((i) => <option key={i} value={i} onClick={() => onSelect(i + 1)}>{i + 1}</option>)}
      </select>
    </div>
  )
}
