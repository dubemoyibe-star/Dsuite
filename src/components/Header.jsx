import logo from '../assets/logo.png' 
import React from 'react'
import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

export default function Home() {
  const [ open , setOpen ] = React.useState(false);
  return (
    <nav className="flex justify-between p-4 bg-gra-700 text-white shadow-2xl fixed w-full top-0 items-center backdrop-blur-sm z-50">
      <ul> 
        <div className='w-16 h-16   rounded-full bg-yellow-100'>
          <img src={logo} alt="Logo" className='w-full h-full'/>
        </div>
    </ul>
      {
          <ul 
          className={`fixed top-0 right-0 h-screen w-3/5  bg-gray-800 text-white sm:hidden flex 
          flex-col gap-8 p-8 z-50 shadow-2xl transform transition-transform duration-700 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}`}>
            <IoMdClose className="w-8 h-8 mb-4 cursor-pointer  hover:text-red-700" onClick={() => setOpen(false)}/>
            <li className="font-bold hover:text-yellow-700 hover:underline hover:underline-offset-6 active:text-yellow-700 active:underline active:underline-offset-6 decoration-2 cursor-pointer">Home</li>
            <li className="font-bold hover:text-yellow-700 hover:underline hover:underline-offset-6 active:text-yellow-700 active:underline active:underline-offset-6 decoration-2 cursor-pointer">About</li>
            <li className="font-bold hover:text-yellow-700 hover:underline hover:underline-offset-6 active:text-yellow-700 active:underline active:underline-offset-6 decoration-2 cursor-pointer">Rooms</li>
            <li className="font-bold hover:text-yellow-700 hover:underline hover:underline-offset-6 active:text-yellow-700 active:underline active:underline-offset-6 decoration-2 cursor-pointer">FAQs</li>
            <li className="font-bold hover:text-yellow-700 hover:underline hover:underline-offset-6 active:text-yellow-700 active:underline active:underline-offset-6 decoration-2 cursor-pointer">Contact us</li>
            </ul>
      }
      <LuMenu className="w-8 h-8 cursor-pointer sm:hidden text-yellow-700 hover:text-yellow-500" onClick={() => setOpen(true)}/>
    
  {/*this section should be displayed on larger screen sizes */}
      <ul className="hidden sm:flex gap-6  items-center justify-center">
        <li className="font-bold text-lg text-gray-700 hover:text-yellow-700 hover:underline hover:underline-offset-6 decoration-2 active:text-yellow-700 active:underline active:underline-offset-6 cursor-pointer">Home</li>
        <li className="font-bold text-lg text-gray-700 hover:text-yellow-700 hover:underline hover:underline-offset-6 decoration-2 active:text-yellow-700 active:underline active:underline-offset-6 cursor-pointer">About</li>
        <li className="font-bold text-lg text-gray-700 hover:text-yellow-700 hover:underline hover:underline-offset-6 decoration-2 active:text-yellow-700 active:underline active:underline-offset-6 cursor-pointer">Rooms</li>
        <li className="font-bold text-lg text-gray-700 hover:text-yellow-700 hover:underline hover:underline-offset-6 decoration-2 active:text-yellow-700 active:underline active:underline-offset-6 cursor-pointer">FAQs</li>
        <li className="font-bold text-lg text-gray-700 hover:text-yellow-700 hover:underline hover:underline-offset-6 decoration-2 active:text-yellow-700 active:underline active:underline-offset-6 cursor-pointer">Contact us</li>
      </ul>
    </nav>
  )
}