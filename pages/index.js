import moment from 'moment-mini'
import { useState } from 'react'
import Router from 'next/router'

import { SearchBar } from '../components/SearchBar'
import { Stashpoint } from '../components/Stashpoint'

import { getCoordsFromLocation } from '../utils/google'
import { getStashpoints } from '../utils/api'

import '../style/global.css'
import { title, box, page } from '../style/style.css'

const Home = () => {
  const [results, setResults] = useState([])
  const [bags, setBags] = useState(1)
  const [dropOff, setDropOff] = useState(moment())
  const [pickUp, setPickUp] = useState(moment().add(1, 'hours'))

  const updateResults = async (searchVal) => {
    const resGeo = await getCoordsFromLocation(searchVal)

    const coords = resGeo.results[0].geometry.location
    const resStash = await getStashpoints({
      ...coords,
      bags,
      dropOff: dropOff.format('YYYY-MM-DDTHH:mm'),
      pickUp: pickUp.format('YYYY-MM-DDTHH:mm')
    })

    setResults(resStash)
  }

  const onBook = (id) => {
    Router.push({
      pathname: '/checkout',
      query: {
        id,
        bags,
        dropOff: dropOff.format('YYYY-MM-DDTHH:00'),
        pickUp: pickUp.format('YYYY-MM-DDTHH:00')
      }
    })
  }

  return (
    <div className={page}>
      <h1 className={title}>Stasher</h1>

      <header className={box}>
        <SearchBar
          bags={bags}
          onSelectBags={setBags}
          dropOff={dropOff}
          onChangeDropOff={setDropOff}
          pickUp={pickUp}
          onChangePickUp={setPickUp}
          onSearch={updateResults}
        />
      </header>

      <div>
        <ul>
          {results.map(r => <Stashpoint key={r.id} data={r} onBook={() => onBook(r.id) } />)}
        </ul>
      </div>
    </div>
  )
}

export default Home
