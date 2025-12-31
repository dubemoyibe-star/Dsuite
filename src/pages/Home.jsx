import React from 'react'


import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import { FaBed, FaSnowflake } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaHeadphones } from "react-icons/fa6";
import { CiWifiOn } from "react-icons/ci";
import { IoShieldCheckmarkSharp } from "react-icons/io5"
import { GiBedLamp } from "react-icons/gi";


import familyImg from "../assets/family.jpg"
import regularImg from "../assets/regular.jpg"
import exclusiveImg from "../assets/exclusive.jpg"

export default function Home() {
  return (
    <>
      <Header />
      <main className='bg-gray-300'>
        <section className="pt-32 px-6 sm:px-16 bg-[image:var(--background-image-hero-mobile)] bg-cover bg-center h-screen flex flex-col justify-center items-start text-gray-900 md:bg-[image:var(--background-image-hero-desktop)] ">
          <h1 className="text-5xl font-medium mb-4 text-yellow-700 text-shadow-lg font-serif sm:text-6xl">Book Comfortable <span className='block'>Suites With Ease</span></h1>
          <p className="text-gray-200 font-medium text-shadow-lg text-2xl sm:text-3xl">Modern Rooms, Simple Bookings, <span className='block'>Travel Services</span></p>
          <div>
            <button className="mt-6 px-8 py-2 bg-linear-to-r from-yellow-600 to-yellow-800 text-white font-semibold rounded-lg hover:shadow-2xl cursor-pointer hover:bg-linear-to-l from-yellow-600 to-yellow-800 transition-colors duration-300">Book Now</button>
            <button className="mt-6 ml-4 px-8 py-2 bg-white border-solid border-2 border-yellow-600 text-gray-800 font-semibold rounded-lg hover:bg-linear-to-r from-yellow-600 to-yellow-800 cursor-pointer hover:text-white transition-colors duration-300">Learn More</button>
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
                <p className='mt-2  text-gray-700 font-medium text-lg '>starting at $250 /night</p>
                <button className=" mt-4 px-6 py-2 text-white font-semibold font-serif text-lg rounded-lg hover:bg-linear-to-l from-yellow-600 to-yellow-800  hover:shadow-2xl bg-linear-to-r from-yellow-600 to-yellow-800 cursor-pointer hover:bg-yellow-800 transition-colors duration-300">View Details</button>
              </div>
            </div> 
          

            <div className='bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex-1 min-w-0'>
              <div className="overflow-hidden rounded-t-lg">
                <img src={regularImg} alt="regular hotel room" className='rounded-t-lg w-full object-cover h-56 transform transition-transform duration-500 ease-out hover:scale-110'/>
              </div>
              <div className='p-6 flex flex-col '>
                <h3 className='text-2xl font-semibold font-serif'>Regular Suite</h3>
                <p className='mt-2  text-gray-700 font-medium text-lg '>starting at $150 /night</p>
                <button className=" mt-4 px-6 py-2 text-white font-semibold font-serif text-lg rounded-lg hover:bg-linear-to-l from-yellow-600 to-yellow-800  hover:shadow-2xl bg-linear-to-r from-yellow-600 to-yellow-800 cursor-pointer hover:bg-yellow-800 transition-colors duration-300">View Details</button>
              </div>
            </div> 
  

            <div className=' bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex-1 min-w-0'>
              <div className="overflow-hidden rounded-t-lg">
              <img src={familyImg} alt="family hotel room" className='rounded-t-lg w-full object-cover h-56 transform transition-transform duration-500 ease-out hover:scale-110'/>
              </div>
              <div className='p-6 flex flex-col '>
                <h3 className='text-2xl font-semibold font-serif'>Family Suite</h3>
                <p className='mt-2  text-gray-700 font-medium text-lg '>starting at $300 /night</p>
                <button className=" mt-4 px-6 py-2 text-white font-semibold font-serif text-lg rounded-lg hover:bg-linear-to-l from-yellow-600 to-yellow-800  hover:shadow-2xl bg-linear-to-r from-yellow-600 to-yellow-800 cursor-pointer hover:bg-yellow-800 transition-colors duration-300">View Details</button>
              </div>
            </div> 
          </div>
        </section>

        <section className='text-center py-24 px-6 sm:px-16 bg-gray-900 mt-24'>
          <h3 className='mb-4 text-medium text-3xl sm:text-4xl text-yellow-700 font-serif text-center '>Experience Comfort & Luxury</h3>
          <p className='mt-2 mb-8 text-lg font-medium text-gray-300'>At DSuite, every stay is designed to offer comfort, elegance, and peace of mind.</p>
          <div className='flex gap-6 flex-col md:flex-row md:justify-center md:items-stretch '>
              <div className='border-r-0 md:border-r-2 md:pr-6 border-gray-600'>
              <div className='bg-yellow-700 rounded-full w-16 mx-auto'>
                <CiWifiOn className='w-3/5 h-16 mx-auto text-white'/>
              </div>
              <p className='text-gray-300 mt-4 mb-2 text-2xl font-medium font-serif'>Free Wi-Fi</p>
              <p className='text-gray-300 text-lg'>Enjoy fast and reliable Wi-Fi throughout the hotel, perfect for work, streaming, and staying connected.</p>
              </div>

              <div className='border-r-0 md:border-r-2 md:pr-6 border-gray-600'>
              <div className='bg-yellow-700 rounded-full w-16 mx-auto'>
                <FaSnowflake className='w-3/5 h-16 mx-auto text-white'/>
              </div>
              <p className='text-gray-300 mt-4 mb-2 text-2xl font-medium font-serif'>Air Conditioning</p>
              <p className='text-gray-300 text-lg'>All rooms are fully air-conditioned to ensure a comfortable and relaxing stay, regardless of the weather.</p>
              </div>
 
              <div className='border-r-0 md:border-r-2 md:pr-6 border-gray-600'>
              <div className='bg-yellow-700 rounded-full w-16 mx-auto'>
                <IoShieldCheckmarkSharp className='w-3/5 h-16 mx-auto text-white'/>
              </div>
              <p className='text-gray-300 mt-4 mb-2 text-2xl font-medium font-serif'>Secure Environment</p>
              <p className='text-gray-300 text-lg'>Our hotel provides a safe and secure environment with 24/7 surveillance and controlled access for guest peace of mind.</p>
              </div>

              <div>
              <div className='bg-yellow-700 rounded-full w-16 mx-auto'>
                <GiBedLamp className='w-3/5 h-16 mx-auto text-white'/>
              </div>
              <p className='text-gray-300 mt-4 mb-2 text-2xl font-medium font-serif'>Modern Interior</p>
              <p className='text-gray-300 text-lg'>Experience a stylish, modern interior designed with comfort, elegance, and functionality in mind.</p>
              </div>
          </div>
        </section>

        <section className='text-center py-24 px-6 sm:px-16 bg-gray-100'>
          <h3 className='mb-4 text-medium text-3xl sm:text-4xl text-yellow-700 font-serif text-center '>Ready to Book Your Stay?</h3>
          <p className='mt-2 mb-8 text-lg font-medium '>Experience the best in comfort and convenience with DSuite. Book your suite today!</p>
          <div className='flex justify-center flex-col md:flex-row gap-4'>
            <button className="px-10 py-2 bg-linear-to-r from-yellow-600 to-yellow-800 text-white font-semibold rounded-lg hover:shadow-2xl cursor-pointer hover:bg-linear-to-l from-yellow-600 to-yellow-800 transition-colors duration-300">Book Now</button>
            <button className="px-10 py-2 bg-white border-solid border-2 border-yellow-600 text-gray-800 font-semibold rounded-lg hover:bg-linear-to-r from-yellow-600 to-yellow-800 cursor-pointer hover:text-white transition-colors duration-300">Contact Us</button>
          </div>
        </section>

      <Footer />
      </main>
    </>
  )
}