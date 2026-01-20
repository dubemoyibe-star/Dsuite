import React from 'react';
import logo from '../assets/logo.png'; 
import { NavLink, Link } from 'react-router-dom';

export default function Footer() {

  const quickLinksNavClass = ({ isActive }) =>
  `font-light cursor-pointer transition-colors duration-300
   ${
     isActive
       ? "text-gray-200"
       : "text-yellow-900 hover:text-gray-200"
   }`

  return (
    <footer className='bg-gray-800 p-8'>
      <section className='flex flex-col md:flex-row justify-between gap-4 p-4 '>
        <div className='flex flex-col items-center md:border-gray-200 md:border-r-1 md:pr-6 md:w-1/4'>
          <div className='w-16 h-16 rounded-full bg-yellow-100'>
          <img src={logo} alt="Logo" className='w-full h-full object-contain'/>
        </div>
        <p className='mt-2 font-medium text-lg text-center text-gray-200'>Our gateway to comfortable and elegant stays, where modern design meets exceptional hospitality.</p>
        </div>
        
        
        <div className='p-4 md:border-gray-200 md:border-r-1 md:pr-6 md:w-1/4'>
            <h4 className='mb-4 text-lg font-bold font-serif text-yellow-700 text-center md:text-left'>Quick Links</h4>
            <div className='flex flex-row md:flex-col  justify-center gap-4'>
              <NavLink to="/"className={quickLinksNavClass}>Home</NavLink>
              <NavLink to="about" className={quickLinksNavClass}>About</NavLink>
              <NavLink to="rooms" className={quickLinksNavClass}>Rooms</NavLink>
              <NavLink to="faqs" className={quickLinksNavClass}>FAQs</NavLink>
              <NavLink to="contact-us" className={quickLinksNavClass}>Contact Us</NavLink>
            </div>
        </div>

        <div className='p-4 md:border-gray-200 md:border-r-1 md:pr-6 md:w-1/4'>
            <h4 className='mb-4 text-lg font-bold font-serif text-yellow-700 text-center md:text-left'>Support</h4>
            <ul className='flex md:flex-col justify-center  gap-4'>
              <li className='font-light text-yellow-900 hover:text-gray-200 active:text-gray-200 cursor-pointer'>Help Center</li>
              <Link to="/contact-us"><li className='font-light text-yellow-900 hover:text-gray-200 active:text-gray-200 cursor-pointer'>Contact Support</li></Link>
              <li className='font-light text-yellow-900 hover:text-gray-200 active:text-gray-200 cursor-pointer'>Policies</li>
            </ul>
        </div>

        <div className='p-4 md:w-1/4'>
            <h4 className='mb-4 text-lg font-bold font-serif text-yellow-700 text-center md:text-left'>Contact</h4>
            <ul className='flex flex-col items-center  md:items-start gap-4'>
              <a
              href="mailto:dubemoyibe@gmail.com?subject=Hotel%20Inquiry&body=Hello%20Dsuite%20Team,%0A%0AI%20would%20like%20to%20make%20an%20inquiry%20about..."
              ><li className='font-light text-yellow-900 hover:text-gray-200 active:text-gray-200 cursor-pointer'>
                dubemoyibe@gmail.com
              </li></a>
              <a
                href="https://wa.me/2347026137565"
                target="_blank"
                rel="noreferrer"
              ><li className='font-light text-yellow-900 hover:text-gray-200 active:text-gray-200 cursor-pointer'>
                +234 70 2613 7565
              </li></a>
              <li className='font-light text-yellow-900 hover:text-gray-200 active:text-gray-200 cursor-pointer'>123 MaryLand, Lekki , Nigeria</li>
            </ul>
        </div>


      </section>

      <div className='text-center pt-4 mt-8'>
        <p className='text-gray-400 text-sm pt-6' >Developed by <a
            href="https://wa.me/2347026137565"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-yellow-700 transition  font-semi-bold underline underline-offset-3"
              >
                Oyibe
              </a></p>
      </div>
      
      <div className='text-center border-t border-gray-200 mt-6'>
        <p className='text-gray-200 text-sm pt-6' >&copy; {new Date().getFullYear()} DSuite. All rights reserved.</p>
      </div>

    </footer>
  )
}










{/* <footer className='bg-gray-800 text-white py-8 px-6 flex flex-col md:flex-row md:justify-between items-start'>
     <section className='flex items-center justify-between'>
       
       <section className='flex flex-col items-center md:items-start gap-2 p-8 '>
        <div className='w-16 h-16 rounded-full bg-gold'>
          <img src={logo} alt="Logo" className='w-full h-full'/>
        </div>
        <p className='mt-4 font-medium text-center text-lg'>Our gateway to comfortable and elegant stays</p>
      </section>

      <section className='mt-6 p-8 border-gray-500 border-l-2'>
        <div>
          <h4 className='font-bold text-xl mb-2 font-serif'>Quick Links</h4>
          <ul className='flex flex-col gap-4'>
            <li className='hover:text-yellow-500 cursor-pointer'>Home</li>
            <li className='hover:text-yellow-500 cursor-pointer'>About</li>
            <li className='hover:text-yellow-500 cursor-pointer'>Rooms</li>
            <li className='hover:text-yellow-500 cursor-pointer'>FAQs</li>
            <li className='hover:text-yellow-500 cursor-pointer'>Contact Us</li>
          </ul>
        </div>
      </section>

     </section>

     <section className='flex items-center mt-8 justify-between'>

      <section className='mt-6 p-8 border-gray-500 border-l-2'>
        <div>
          <h4 className='font-bold text-xl mb-2 font-serif'>Support</h4>
          <ul className='flex flex-col gap-4'>
            <li className='hover:text-yellow-500 cursor-pointer'>Help Center</li>
            <li className='hover:text-yellow-500 cursor-pointer'>Contact Support </li>
            <li className='hover:text-yellow-500 cursor-pointer'>Policies</li>
          </ul>
        </div>
      </section>

      <section className='mt-6 p-8 border-gray-500 border-l-2'>
        <div>
          <h4 className='font-bold text-xl mb-2 font-serif'>Support</h4>
          <ul className='flex flex-col gap-4'>
            <li className='hover:text-yellow-500 cursor-pointer'>Help Center</li>
            <li className='hover:text-yellow-500 cursor-pointer'>Contact Support </li>
            <li className='hover:text-yellow-500 cursor-pointer'>Policies</li>
          </ul>
        </div>
      </section>

     </section>




    </footer>  */}
