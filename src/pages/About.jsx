import React from "react";
import { Link } from "react-router-dom";
import { FaBed } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled } from "react-icons/tb";
import { GiHouse } from "react-icons/gi";
import logo from "../assets/logo.png"

export default function About() {
  return (
    <main className="bg-gray-300">
      <section className="pt-32 px-6 sm:px-16 bg-[image:var(--background-image-about-mobile)] bg-cover bg-center h-screen flex flex-col justify-center items-start text-gray-900 md:bg-[image:var(--background-image-about-desktop)] ">
          <h1 className="text-5xl font-medium mb-4 text-yellow-700 text-shadow-lg font-serif sm:text-6xl">About DSuites</h1>
          <p className="text-gray-300 font-serif text-shadow-sm text-shadow-black font-medium text-shadow-lg text-2xl sm:text-3xl">Experience Comfort,<span className='block'>Designed for You</span></p>
          <p className="text-gray-300 mt-2 font-medium font-serif text-shadow-sm text-shadow-black text-lg sm:text-xl">Modern hospitality focused on<span className='block'>comfort, security and simplicity</span></p>
          <div className="mt-4">
            <Link to="/rooms" className="mt-6 px-8 py-2 bg-linear-to-r from-yellow-600 to-yellow-800 text-white font-semibold 
            rounded-lg hover:shadow-2xl active:shadow-2xl cursor-pointer hover:bg-linear-to-l from-yellow-600 to-yellow-800 active:bg-linear-to-l from-yellow-600 to-yellow-800 transition-colors duration-300"><button>Explore Rooms</button></Link>
            <Link to="/contact-us" className="mt-6 ml-4 px-8 py-2 bg-white border-solid border-2 border-yellow-600 text-gray-800 font-semibold 
            rounded-lg hover:bg-linear-to-r from-yellow-600 to-yellow-800 active:bg-linear-to-r from-yellow-600 to-yellow-800 cursor-pointer hover:text-white active:text-white transition-colors duration-300"><button>Contact Us</button></Link>
          </div>
        </section>

        <section className="text-center px-4 sm:px-16">
          <h2 className='mt-24 text-medium text-3xl sm:text-4xl text-yellow-700 font-serif'>Who Are We</h2>
          <p className='mt-2 pb-8 text-lg font-medium '>Built around comfort, simplicity and trust</p>
          <div className="shadow-lg  relative hover:shadow-2xl bg-gray-100 max-w-4xl mx-auto p-8 rounded-lg transition-shadow duration-300">
             <div className="relative my-4">
                <span className="absolute top-1/2 left-0 w-full h-px bg-gray-300 -translate-y-1/2"></span>
                <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-yellow-100 shadow-sm shadow-gray-200 flex items-center justify-center">
                  <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
              </div>
            <p className="text-shadow-sm leading-relaxed shadow-gray-900 text-gray-900">
              At DSuite, we prioritize your comfort and convenience. Our modern suites are designed to provide a relaxing atmosphere, equipped with all the amenities you need for a pleasant stay. With our easy booking process and dedicated customer support, we ensure that your experience is seamless from start to finish. Choose DSuite for a stay that feels like home, away from home.
            </p>
          </div>
        </section>

        <section className='text-center'>
          <h2 className='mt-24 text-medium text-3xl sm:text-4xl text-yellow-700 font-serif mb-12'>Our Core Values</h2>
          <div className=' flex flex-col md:flex-row md:justify-center md:items-stretch gap-4 px-4 sm:px-16'>
            <div className='flex flex-col  items-center p-6  bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'>
              <div className='bg-yellow-700 rounded-full w-12'><FaBed className='w-7/12 h-12 mx-auto text-white'/></div>
              <h3 className='mt-4 text-xl font-semibold '>Comfort First</h3>
              <p className='mt-2 text-gray-600 px-4 font-medium'>Every room is carefully selected and designed to provide a relaxing and enjoyable stay.</p>
            </div> 
            <div className='flex flex-col items-center p-6  bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'>
              <div className='bg-yellow-700 rounded-full w-12'><IoShieldCheckmarkSharp className='w-7/12 h-12 mx-auto text-white'/></div>
              <h3 className='mt-4 text-xl font-semibold '>Secure & Reliable</h3>
              <p className='mt-2 text-gray-600 px-4 font-medium'>We prioritize guest safety through secure environments and trusted booking systems.</p>
            </div> 
            <div className='flex flex-col items-center p-6  bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'>
              <div className='bg-yellow-700 rounded-full w-12'><GiHouse className='w-7/12 h-12 mx-auto text-white'/></div>
              <h3 className='mt-4 text-xl font-semibold '>Modern Living</h3>
              <p className='mt-2 text-gray-600 px-4 font-medium'>Our interiors reflect modern design, clean anaesthetics and functional comfort.</p>
            </div> 
          </div>
        </section>

        <section className="text-center px-4 sm:px-16 bg-gray-100 py-20 mt-24">
          <h2 className=' text-medium text-3xl sm:text-4xl text-yellow-700 font-serif'>Our Booking Philosophy</h2>
          <div className="md:flex">
            <div className="lg:flex  gap-4 lg:mt-12 lg:items-start">
              <TbCircleNumber1Filled className="w-12 h-12 text-yellow-700 flex-shrink-0 mx-auto mt-8 lg:mt-0"/>
              <div>
                <h3 className="text-xl font-semibold font-serif text-gray-900 mb-2 lg:text-left">Discover Quality Rooms</h3>
                <p className="text-gray-900 lg:text-left">Browse a curated selection of modern and comfortable suites.</p>
              </div>
            </div>

            <div className="lg:flex gap-4 lg:mt-12 lg:items-start">
              <TbCircleNumber2Filled className="w-12 h-12 mx-auto mt-8 text-yellow-700 flex-shrink-0 lg:mt-0"/>
              <div className="lg:text-left">
                <h3 className="text-xl font-semibold font-serif text-gray-900 mb-2">Book With Confidence</h3>
                <p className="text-gray-900 ">Clear pricing, real availability and instant confirmation.</p>
              </div>
            </div>

            <div className="lg:flex gap-4 lg:mt-12 lg:items-start">
              <TbCircleNumber3Filled className="w-12 h-12 mx-auto mt-8 text-yellow-700 flex-shrink-0 lg:mt-0"/>
              <div className="lg:text-left">
                <h3 className="text-xl font-semibold font-serif text-gray-900 mb-2">Enjoy Your Stay</h3>
                <p className="text-gray-900 ">Relax in a secure well-designed space made for comfort.</p>
              </div>
            </div>
          </div>
        </section>

        <section className='text-center py-24 px-6 sm:px-16 bg-gray-800'>
          <h3 className='mb-4 text-medium text-3xl sm:text-4xl text-yellow-700 font-serif text-center '>Stay With Confidence</h3>
          <p className='mt-2 mb-8 text-lg font-medium text-gray-300'>Experience modern comfort, trusted service and effortless booking with DSuite </p>
          <div className='flex justify-center flex-col md:flex-row gap-4'>
            <Link to="/rooms" className="px-10 py-2 bg-linear-to-r from-yellow-600 to-yellow-800 text-white font-semibold rounded-lg hover:shadow-2xl cursor-pointer 
                              hover:bg-linear-to-l from-yellow-600 to-yellow-800 active:bg-linear-to-l from-yellow-600 to-yellow-800 transition-colors duration-300"><button>View Rooms</button></Link>
            <Link to="/contact-us" className="px-10 py-2 bg-white border-solid border-2 border-yellow-600 text-gray-800 font-semibold rounded-lg hover:bg-linear-to-r from-yellow-600 to-yellow-800 
            active:bg-linear-to-r from-yellow-600 to-yellow-800 cursor-pointer hover:text-white active:text-white transition-colors duration-300"><button>Contact Us</button></Link>
          </div>
        </section>

        <section className="p-24 bg-gray-100 text-center">
         <p className="italic text-yellow-700 font-bold font-serif text-xl md:text-2xl text-shadow-lg"><span className="text-3xl md:text-5xl">''</span> Where refined luxury meets effortless comfort.<span className="text-3xl md:text-5xl">''</span></p> 
        </section>
    </main>
    )
}