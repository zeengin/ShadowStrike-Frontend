import React from 'react'
import Contact from '../components/home/Contact'
import { Helmet } from 'react-helmet'

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Shadowstrike - Contact us</title>
      </Helmet>
      <Contact />
    </>
  )
}

export default ContactPage