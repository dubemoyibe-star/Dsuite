import React  from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function BookingSuccess(){
  return (
    <section className="min-h-screen flex items-center justify-center bg-[linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.85)),url('/assets/auth-bg.jpg')] bg-cover bg-center px-4">
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-150 text-center p-8 md:p-10">
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
            <FaCircleCheck className="text-white text-3xl" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-3">
          Booking Successful!
        </h1>

        <p className="text-gray-600 text-sm md:text-base mb-8">
          Your reservation has been confirmed. You can view your booking details
          anytime in your profile.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="w-full px-6 py-3 rounded-md border border-yellow-700 text-yellow-700 font-semibold hover:bg-yellow-700 hover:text-white transition"
          >
            Go to Home
          </Link>

          <Link
            to="/profile"
            className="w-full px-6 py-3 rounded-md bg-yellow-700 text-white font-semibold hover:bg-yellow-800 transition"
          >
            View Profile
          </Link>
        </div>
      </div>
    </section>
  )
}