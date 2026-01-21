import React from "react";
import { Link } from 'react-router-dom'
import { FaBed } from "react-icons/fa";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.85)),url('/assets/auth-bg.jpg')] bg-cover bg-center px-4">
      
      <motion.div 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8}}
      className="bg-white rounded-2xl shadow-2xl w-full max-w-lg text-center p-8 md:p-12">

        <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8}}
        className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-yellow-700 flex items-center justify-center">
            <FaBed className="text-white text-3xl" />
          </div>
        </motion.div>

        <motion.h1 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 , delay: 0.1}}
        className="text-6xl md:text-7xl font-bold text-yellow-700 mb-2">
          404
        </motion.h1>

        <motion.h2 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 , delay: 0.2}}
        className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-4">
          Page Not Found
        </motion.h2>

        <motion.p 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 , delay: 0.3}}
        className="text-gray-600 text-sm md:text-base mb-8">
          The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back to comfort and luxury.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1}}
            className="flex"
          >
            <Link
            to="/"
            className="w-full px-6 py-3 rounded-md bg-yellow-700 text-white font-semibold hover:bg-yellow-800 transition"
          >
            Go Home 
          </Link>
          </motion.div>
          
          <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2}}
          className="flex"
          >
              <Link
              to="/rooms"
              className="w-full px-6 py-3 rounded-md border border-yellow-700 text-yellow-700 font-semibold hover:bg-yellow-700 hover:text-white transition"
            >
              See Rooms
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}