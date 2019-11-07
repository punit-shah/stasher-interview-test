import { useState } from 'react'

import { BagSelector } from './BagSelector'
import { DateSelector } from './DateSelector'

import { item, hr } from '../style/style.css'
import { searchForm, filtersWrapper } from './SearchBar.css'

const bagOptions = Array.apply(null, Array(20)).map((x, i) => i)

export const SearchBar = ({
  bags,
  onSelectBags,
  dropOff,
  onChangeDropOff,
  pickUp,
  onChangePickUp,
  onSearch
}) => {
  const [searchVal, setSearchVal] = useState('London')

  return (
    <form
      className={searchForm}
      onSubmit={event => {
        event.preventDefault()
        onSearch(searchVal)
      }}
    >
      <input
        className={item}
        type="search"
        onChange={({ target: { value } }) => setSearchVal(value)}
        value={searchVal}
        required
      />
      <button type="submit" className={item}>
        Search
      </button>

      <hr className={hr} />

      <div className={filtersWrapper}>
        <BagSelector
          className={item}
          id="bag-select"
          value={bags}
          options={bagOptions}
          onSelect={onSelectBags}
        />
        <DateSelector
          className={item}
          label="Drop off"
          idPrefix="dropoff"
          value={dropOff}
          onChange={onChangeDropOff}
        />
        <DateSelector
          className={item}
          label="Pick up"
          idPrefix="pickup"
          value={pickUp}
          onChange={onChangePickUp}
        />
      </div>
    </form>
  )
}
