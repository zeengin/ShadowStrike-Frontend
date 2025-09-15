import React from 'react'
import OurGames from '../components/home/OurGames'
import { Helmet } from 'react-helmet'

const Entertainment = () => {
  return (
    <>
      <Helmet>
        <title>Shadowstrike - Games</title>
      </Helmet>
      <OurGames />
    </>
  )
}

export default Entertainment