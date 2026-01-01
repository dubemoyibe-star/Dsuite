import React from 'react'
import logo from '../assets/logo.png' 
import { NavLink } from 'react-router-dom';
import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

export default function Header() {
const [ open , setOpen ] = React.useState(false);

const navLinkClassMobile = ({ isActive }) =>
  `font-bold cursor-pointer decoration-2 transition-all duration-300
   ${
     isActive
       ? "text-yellow-700 underline underline-offset-6"
       : "hover:text-yellow-700 hover:underline hover:underline-offset-6"
   }`

   const navLinkClassDesktop = ({ isActive }) =>
  `font-bold text-lg decoration-2 cursor-pointer transition-all duration-300
   ${
     isActive
       ? "text-yellow-700 underline underline-offset-6"
       : "text-gray-700 hover:text-yellow-700 hover:underline hover:underline-offset-6"
   }`
  return (
    <nav className="flex justify-between p-4 text-white shadow-2xl fixed w-full top-0 items-center backdrop-blur-sm z-50">
      <div> 
        <div className='w-16 h-16 rounded-full bg-yellow-100'>
          <img src={logo} alt="Logo" className='w-full h-full object-contain'/>
        </div>
      </div>
      {
          <div
          className={`fixed top-0 right-0 h-screen w-3/5  bg-gray-800 text-white sm:hidden flex 
          flex-col gap-8 p-8 z-50 shadow-2xl transform transition-transform duration-700 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
          aria-expanded={open ? true : false}
          aria-live='polite'
          >
            <IoMdClose className="w-8 h-8 mb-4 cursor-pointer  hover:text-red-700 active:text-red-700" onClick={() => setOpen(false)}/>
            <NavLink to="/" className={navLinkClassMobile}>Home</NavLink>
            <NavLink to="about" className={navLinkClassMobile}>About</NavLink>
            <NavLink to="rooms" className={navLinkClassMobile}>Rooms</NavLink>
            <NavLink to="faqs" className={navLinkClassMobile}>FAQs</NavLink>
            <NavLink to="contact-us" className={navLinkClassMobile}>Contact Us</NavLink>
            <NavLink to="login" className={navLinkClassMobile}>Log in</NavLink>
            <NavLink to="/login" className={navLinkClassMobile}>Sign up</NavLink>
            </div>
      }
      <LuMenu className="w-8 h-8 cursor-pointer sm:hidden text-yellow-700 hover:text-yellow-500 active:text-yellow-500" onClick={() => setOpen(true)}/>
    
  {/*this section should be displayed on larger screen sizes */}
      <div className="hidden sm:flex gap-6  items-center justify-center">
        <NavLink to="/" className={navLinkClassDesktop}>Home</NavLink>
        <NavLink to="about" className={navLinkClassDesktop}>About</NavLink>
        <NavLink to="rooms" className={navLinkClassDesktop}>Rooms</NavLink>
        <NavLink to="faqs" className={navLinkClassDesktop}>FAQs</NavLink>
        <NavLink to="contact-us" className={navLinkClassDesktop}>Contact Us</NavLink>
        <NavLink to="login" className={navLinkClassDesktop}>Log in</NavLink>
      </div>
    </nav>
  )
}