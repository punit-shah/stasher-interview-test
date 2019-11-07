import { useState } from 'react'
import Router from 'next/router'
import moment from 'moment-mini'
import MoonLoader from 'react-spinners/MoonLoader'

import { getCoordsFromLocation } from '../utils/google'
import { getStashpoints } from '../utils/api'
import Layout from '../components/Layout'
import { SearchBar } from '../components/SearchBar'
import { Stashpoint } from '../components/Stashpoint'

import { box, resultsContainer } from '../style/style.css'

const Home = () => {
  const [results, setResults] = useState([])
  const [bags, setBags] = useState(1)
  const [dropOff, setDropOff] = useState(moment())
  const [pickUp, setPickUp] = useState(moment().add(1, 'hours'))
  const [loading, setLoading] = useState(false)

  const updateResults = async searchVal => {
    setLoading(true)
    const resGeo = await getCoordsFromLocation(searchVal)

    const coords = resGeo.results[0].geometry.location
    const resStash = await getStashpoints({
      ...coords,
      bags,
      dropOff: dropOff.format('YYYY-MM-DDTHH:mm'),
      pickUp: pickUp.format('YYYY-MM-DDTHH:mm')
    })

    setLoading(false)
    setResults(resStash)
  }

  const onBook = id => {
    Router.push(
      {
        pathname: '/checkout',
        query: {
          id,
          bags,
          dropOff: dropOff.format('YYYY-MM-DDTHH:00'),
          pickUp: pickUp.format('YYYY-MM-DDTHH:00')
        }
      },
      '/checkout'
    )
  }

  return (
    <Layout>
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

      <div className={resultsContainer}>
        {loading ? (
          <MoonLoader size={32} color="#000" />
        ) : (
          <ul>
            {results.map(r => (
              <Stashpoint key={r.id} data={r} onBook={() => onBook(r.id)} />
            ))}
          </ul>
        )}
      </div>
    </Layout>
  )
}

export default Home
