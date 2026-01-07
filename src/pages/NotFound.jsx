import React from "react";
import { Link } from 'react-router-dom'
import { FaBed } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.85)),url('/assets/auth-bg.jpg')] bg-cover bg-center px-4">
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg text-center p-8 md:p-12">

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-yellow-700 flex items-center justify-center">
            <FaBed className="text-white text-3xl" />
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-yellow-700 mb-2">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 text-sm md:text-base mb-8">
          The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back to comfort and luxury.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="w-full px-6 py-3 rounded-md bg-yellow-700 text-white font-semibold hover:bg-yellow-800 transition"
          >
            Go Home
          </Link>

          <Link
            to="/rooms"
            className="w-full px-6 py-3 rounded-md border border-yellow-700 text-yellow-700 font-semibold hover:bg-yellow-700 hover:text-white transition"
          >
            See Rooms
          </Link>
        </div>
      </div>
    </section>
  )
}