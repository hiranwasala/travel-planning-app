import React from 'react'
import Navbar from './NavBar'
import Footer from '../components/Footer'

const LayOut = ({children}) => {
  return (
    <div>
      <Navbar />
      { children }
      <Footer/>
    </div>
  )
}

export default LayOut
