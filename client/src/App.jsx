import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from "framer-motion"
import ScrollToTop from './components/ScrollToTop.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Rooms from './pages/Rooms.jsx';
import ContactUs from './pages/ContactUs.jsx';
import FaqsPage from './pages/FaqsPage.jsx';
import RoomDetail from './pages/RoomDetail.jsx';
import Checkout from './pages/Checkout.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import NotFound from './pages/NotFound.jsx';
import BookingSuccess from './pages/BookingSuccess.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import AdminMessages from './pages/AdminMessages.jsx';
import AdminBookings from './pages/AdminBookings.jsx';


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <MotionConfig viewport={{once: true}}>
        <ScrollToTop />

        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="rooms/:id" element={<RoomDetail />} />
            <Route path="faqs" element={<FaqsPage />} />
            <Route path="contact-us" element={<ContactUs />} />
          
            <Route element={<ProtectedRoute />}>
              <Route path="checkout/:id" element={<Checkout />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<Navigate to="bookings" replace />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="messages" element={<AdminMessages />} />
              </Route>
            </Route>

          </Route>

          <Route path='/booking-success' element={<BookingSuccess />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </MotionConfig>
      </BrowserRouter>
    </AuthProvider>
  );
}