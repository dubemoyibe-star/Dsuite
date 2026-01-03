import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Rooms from './pages/Rooms.jsx'
import ContactUs from './pages/ContactUs.jsx'
import FaqsPage from './pages/FaqsPage.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import Layout from './components/Layout.jsx'
import RoomDetail from './pages/RoomDetail.jsx'

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='rooms' element={<Rooms />} />
          <Route path='contact-us' element={<ContactUs />} />
          <Route path='faqs' element={<FaqsPage />} />
          <Route path='*' element={<NotFound />} />
          <Route path='rooms/:id' element={<RoomDetail />} />
        </Route>

        
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

