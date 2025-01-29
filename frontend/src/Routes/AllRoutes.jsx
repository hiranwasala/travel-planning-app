import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PlacesPage from '../pages/PlacesPage'
import AboutPage from '../pages/AboutPage'
import PlanPage from '../pages/PlanPage'
import ContactPage from '../pages/ContactPage'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/places' element={<PlacesPage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/Plan' element={<PlanPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
    </Routes>
  )
}

export default AllRoutes
