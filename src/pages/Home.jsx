import React from 'react'


import Header from "../components/Header.jsx"
import { FaBed } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaHeadphones } from "react-icons/fa6";


import familyImg from "../assets/family.jpg"
import regularImg from "../assets/regular.jpg"
import exclusiveImg from "../assets/exclusive.jpg"

export default function Home() {
  return (
    <>
      <Header />
      <main className='bg-gray-100'>
        <section className="pt-32 px-6 sm:px-16 bg-hero-mobile bg-cover bg-center h-screen flex flex-col justify-center items-start text-gray-900 sm:bg-hero-desktop ">
          <h1 className="text-5xl font-medium mb-4 text-yellow-700 text-shadow-lg font-serif sm:text-6xl">Book Comfortable <span className='block'>Suites With Ease</span></h1>
          <p className="text-gray-200 font-medium text-shadow-lg text-2xl sm:text-3xl">Modern Rooms, Simple Bookings, <span className='block'>Travel Services</span></p>
          <div>
            <button className="mt-6 px-8 py-2 bg-linear-to-r from-yellow-600 to-yellow-800 text-white font-semibold rounded-lg hover:shadow-2xl cursor-pointer hover:bg-linear-to-l from-yellow-600 to-yellow-800 transition-colors duration-300">Book Now</button>
            <button className="mt-6 ml-4 px-8 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-linear-to-r from-yellow-600 to-yellow-800 cursor-pointer hover:text-white transition-colors duration-300">Learn More</button>
          </div>
        </section>

        <section className='text-center'>
          <h2 className='mt-24 text-medium text-3xl sm:text-4xl text-yellow-700 font-serif'>Why Choose DSuite</h2>
          <p className='mt-2 mb-8 text-lg font-medium '>Discover the benefits of booking with us</p>
          <div className=' flex flex-col md:flex-row md:justify-center md:items-stretch gap-4 px-4 sm:px-16'>
            <div className='flex flex-col  items-center p-6  bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'>
              <div className='bg-yellow-700 rounded-full w-12'><FaBed className='w-7/12 h-12 mx-auto text-white'/></div>
              <h3 className='mt-4 text-xl font-semibold '>Comfortable Rooms</h3>
              <p className='mt-2 text-gray-600 px-4 font-medium'>Experience cozy and well-equipped rooms designed for your relaxation.</p>
            </div> 
            <div className='flex flex-col items-center p-6  bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'>
              <div className='bg-yellow-700 rounded-full w-12'><SlCalender className='w-7/12 h-12 mx-auto text-white'/></div>
              <h3 className='mt-4 text-xl font-semibold '>Easy Online Booking</h3>
              <p className='mt-2 text-gray-600 px-4 font-medium'>Top notch rooms can be secured from the confort of your home</p>
            </div> 
            <div className='flex flex-col items-center p-6  bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'>
              <div className='bg-yellow-700 rounded-full w-12'><FaHeadphones className='w-7/12 h-12 mx-auto text-white'/></div>
              <h3 className='mt-4 text-xl font-semibold '>24/7 Customer Support</h3>
              <p className='mt-2 text-gray-600 px-4 font-medium'>Our support team is working around the clock to ensure a magnificent experience</p>
            </div> 
          </div>
        </section>

        <section>
          <h2 className='mt-24 text-medium text-3xl sm:text-4xl text-yellow-700 font-serif text-center '>Featured Rooms</h2>
          <p className='mt-2 mb-8 text-lg font-medium  text-center'>Explore our suite options simply and effortlessly</p>
          <div className='flex flex-col md:flex-row justify-center md:items-stretch gap-6 px-4 sm:px-16 text-left'>
            
            <div className=' bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300  flex-1 min-w-0'>
              <div className="overflow-hidden rounded-t-lg">
               <img src={exclusiveImg} alt="exclusive hotel room" className='rounded-t-lg w-full object-cover h-56 transform transition-transform duration-500 ease-out hover:scale-110'/>
              </div>
              <div className='p-6 flex flex-col '>
                <h3 className='text-2xl font-semibold font-serif'>Exclusive Suite</h3>
                <p className='mt-2  text-gray-700 font-medium text-lg '>starting at $250 / night</p>
                <button className=" mt-4 px-6 py-2 text-white font-semibold font-serif text-lg rounded-lg hover:bg-linear-to-l from-yellow-600 to-yellow-800  hover:shadow-2xl bg-linear-to-r from-yellow-600 to-yellow-800 cursor-pointer hover:bg-yellow-800 transition-colors duration-300">View Details</button>
              </div>
            </div> 
          

            <div className='bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex-1 min-w-0'>
              <div className="overflow-hidden rounded-t-lg">
                <img src={regularImg} alt="regular hotel room" className='rounded-t-lg w-full object-cover h-56 transform transition-transform duration-500 ease-out hover:scale-110'/>
              </div>
              <div className='p-6 flex flex-col '>
                <h3 className='text-2xl font-semibold font-serif'>Exclusive Suite</h3>
                <p className='mt-2  text-gray-700 font-medium text-lg '>starting at $250 / night</p>
                <button className=" mt-4 px-6 py-2 text-white font-semibold font-serif text-lg rounded-lg hover:bg-linear-to-l from-yellow-600 to-yellow-800  hover:shadow-2xl bg-linear-to-r from-yellow-600 to-yellow-800 cursor-pointer hover:bg-yellow-800 transition-colors duration-300">View Details</button>
              </div>
            </div> 
  

            <div className=' bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex-1 min-w-0'>
              <div className="overflow-hidden rounded-t-lg">
              <img src={familyImg} alt="family hotel room" className='rounded-t-lg w-full object-cover h-56 transform transition-transform duration-500 ease-out hover:scale-110'/>
              </div>
              <div className='p-6 flex flex-col '>
                <h3 className='text-2xl font-semibold font-serif'>Exclusive Suite</h3>
                <p className='mt-2  text-gray-700 font-medium text-lg '>starting at $250 / night</p>
                <button className=" mt-4 px-6 py-2 text-white font-semibold font-serif text-lg rounded-lg hover:bg-linear-to-l from-yellow-600 to-yellow-800  hover:shadow-2xl bg-linear-to-r from-yellow-600 to-yellow-800 cursor-pointer hover:bg-yellow-800 transition-colors duration-300">View Details</button>
              </div>
            </div> 
          </div>
        </section>
      </main>
    </>
  )
}