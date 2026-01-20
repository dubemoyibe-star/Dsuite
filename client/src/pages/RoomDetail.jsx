import react from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import { FaCheck } from "react-icons/fa";
import { IoSnowOutline, IoWifiOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsTv } from "react-icons/bs";
import { PiBowlFoodLight, PiBroom } from "react-icons/pi";
import { MdElectricalServices, MdBathroom, MdCoffeeMaker, MdLocalBar   } from "react-icons/md";
import { GiTowel } from "react-icons/gi";
import { motion } from "framer-motion";


export default function RoomDetail() {
  const BASE = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const [room, setRoom] = react.useState(null);
  const [loading, setLoading] = react.useState(true);
  const [error, setError] = react.useState("");

  react.useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const res = await fetch(`${BASE}/api/rooms/${id}`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to load room details");
        }
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.log(err);
        setError("Unable to load room details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetail();
  }, [id]);


  const { name,  image_url, max_guests, has_breakfast, thumbnails, price_per_night, long_description, features } = room || {};

  const parsedThumbnails = Array.isArray(thumbnails)
  ? thumbnails
  : JSON.parse(thumbnails || "[]");

  const parsedFeatures = Array.isArray(features)
  ? features
  : JSON.parse(features || "[]");

  return (
    <main className="bg-gray-200 pb-16">
      {loading || error ? <section className="max-w-4xl mx-auto px-4 sm:px-12 lg:px-8 pt-48 pb-24">
        {loading && <Loading message="Loading room details..."/>}
        {error && (
          <p className="text-red-600 text-lg text-center pt-12 pb-12">
            {error}
          </p>
        )}
      </section> : null}

        {!loading && room && (
          <section>
            <motion.div 
            initial={{scale: 0.95, opacity: 0}}
            animate={{scale: 1, opacity:1}}
            viewport={{once: true}}
            transition={{duration: 0.8}} 
            className="h-screen">
              <img src={`/assets/${image_url}`} alt={`${name}`} className="w-full h-full object-cover"/>
            </motion.div>
            
           <div className="mx-auto px-4  lg:px-8 pt-4 lg:pt-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 flex-1">
                {parsedThumbnails.map((thumb, index) => (
                  <motion.div 
                  initial={{scale: 0.9, opacity: 0}}
                  whileInView={{scale: 1, opacity:1}}
                  viewport={{once: true}}
                  transition={{duration: 0.8, delay:0.2 }} 
                  key={thumb} 
                  className="overflow-hidden rounded-lg">
                  <img
                    src={`/assets/${thumb}`}
                    alt={`${name} thumbnail ${index + 1}`}
                    className="w-full h-40 lg:h-56  object-cover rounded-lg transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
                  />
                  </motion.div>
                ))}
              </div>  
              <motion.div 
              initial={{scale: 0.9, opacity: 0}}
              whileInView={{scale: 1, opacity:1}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className="bg-gray-100 pt-6 pb-4 px-4 rounded-lg shadow-lg hover:shadow-2xl flex flex-col items-center justify-end gap-6 w-full lg:w-72 transition duration-300">
                <motion.span 
                initial={{scale: 0.9, opacity: 0}}
                whileInView={{scale: 1, opacity:1}}
                viewport={{once: true}}
                transition={{duration: 0.8, delay:0.2 }}
                className="text-xs uppercase tracking-widest text-yellow-800">
                  {name}
                </motion.span>
                <motion.p 
                initial={{scale: 0.9, opacity: 0}}
                whileInView={{scale: 1, opacity:1}}
                viewport={{once: true}}
                transition={{duration: 0.8, delay:0.2 }}
                className="font-medium text-3xl lg:text-4xl pt-4 text-gray-800">₦{price_per_night.toLocaleString()} <span className="font-light text-lg font-sans">/night</span></motion.p>
                <Link to={`/checkout/${id}`} className="w-full mt-4 px-6 py-2 text-white font-semibold font-serif text-lg rounded-lg hover:bg-linear-to-l from-yellow-600 to-yellow-800  
                hover:shadow-2xl bg-linear-to-r from-yellow-600 to-yellow-800 cursor-pointer active:bg-linear-to-l from-yellow-600 to-yellow-800 transition-colors duration-300 text-center"><button>Book Now</button></Link>
              </motion.div>
            </div>
          </div>

          <Link to="/rooms" className="flex items-center justify-center py-2 border-y-1 border-gray-300  mt-4 lg:mt-8 text-gray-700 text-lg">
          <motion.p
          initial={{x:-40, opacity: 0}}
          whileInView={{x:0, opacity: 1}}
          transition={{duration:0.8}}
          ><span className="text-2xl text-yellow-700">←</span> Back to all rooms</motion.p>
          </Link>

          <article className="py-16 px-4 lg:px-8 border-b-1 border-gray-300">
            <motion.h1 
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 2, ease: "linear" }}
            style={{
              whiteSpace: "wrap",
              width: "100%",
            }}
            className="text-4xl font-medium mb-4 text-yellow-700 text-shadow-lg font-serif sm:text-5xl">{name}</motion.h1>
            <motion.p 
            initial={{
              clipPath: "polygon(0 0, 0 0, 0 0, 0 100%)"
            }}
            whileInView={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            }}
            transition={{ duration: 1.5, ease: "linear" }}
            style={{
              width: "100%",
              whiteSpace: "normal",
            }}
            className="text-gray-900 font-medium text-lg lg:text-xl">{long_description}</motion.p>
          </article>
          
          <section className="py-6 px-4 lg:px-8 md:flex justify-between gap-12 md:border-b-1 border-gray-300">
            <div className="md:border-r-1 border-gray-300 md:pr-8">
              <motion.h1 
              initial={{y:40, opacity: 0}}
              whileInView={{y:0, opacity: 1}}
              transition={{duration:0.8}}
              className="text-3xl font-medium mb-4 text-yellow-700 text-shadow-lg font-serif sm:text-4xl">Amenities</motion.h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-900  font-medium text-md py-4 border-b-1 border-gray-200">
                <motion.div 
                initial={{y:40, opacity: 0}}
                whileInView={{y:0, opacity: 1}}
                transition={{duration:0.8, delay:0.1}}
                className="flex items-center gap-2">
                  <IoWifiOutline className="w-8 h-8 text-yellow-700"/>
                  <p>Free Wi-Fi</p>
                </motion.div>
                <motion.div 
                initial={{y:40, opacity: 0}}
                whileInView={{y:0, opacity: 1}}
                transition={{duration:0.8, delay:0.2}}
                className="flex items-center gap-2">
                  <HiOutlineUserGroup className="w-8 h-8 text-yellow-700"/>
                  <p>Up to {max_guests} guests</p>
                </motion.div>
                <motion.div 
                initial={{y:40, opacity: 0}}
                whileInView={{y:0, opacity: 1}}
                transition={{duration:0.8, delay:0.3}}
                className="flex items-center gap-2">
                  <IoSnowOutline className="w-8 h-8 text-yellow-700"/>
                  <p>Air Conditioning</p>
                </motion.div>
                <motion.div 
                initial={{y:40, opacity: 0}}
                whileInView={{y:0, opacity: 1}}
                transition={{duration:0.8, delay:0.4}}
                className="flex items-center gap-2">
                  <MdBathroom className="w-8 h-8 text-yellow-700"/>
                  <p>Private Bathroom</p>
                </motion.div>
                <motion.div 
                initial={{y:40, opacity: 0}}
                whileInView={{y:0, opacity: 1}}
                transition={{duration:0.8, delay:0.5}}
                className="flex items-center gap-2">
                  { has_breakfast ? <>
                    <PiBowlFoodLight className="w-8 h-8 text-yellow-700"/>
                    <p>Breakfast Availaible</p>
                    </> : 
                    <>
                    <MdElectricalServices className="w-8 h-8 text-yellow-700"/>
                    <p>24/7 water & power</p>
                  </>
                  } 
                </motion.div>
                <motion.div 
                initial={{y:40, opacity: 0}}
                whileInView={{y:0, opacity: 1}}
                transition={{duration:0.8, delay:0.5}}
                className="flex items-center gap-2">
                  <GiTowel className="w-8 h-8 text-yellow-700"/>
                  <p>Fresh Linen & Towels</p>
                </motion.div>
                <motion.div 
                initial={{y:40, opacity: 0}}
                whileInView={{y:0, opacity: 1}}
                transition={{duration:0.8, delay:0.6}}
                className="flex items-center gap-2">
                  <BsTv className="w-8 h-8 text-yellow-700"/>
                  <p>Smart TV</p>
                </motion.div>
                <motion.div 
                initial={{y:40, opacity: 0}}
                whileInView={{y:0, opacity: 1}}
                transition={{duration:0.8, delay:0.7}}
                className="flex items-center gap-2">
                  <MdLocalBar className="w-8 h-8 text-yellow-700"/>
                  <p>Mini-bar</p>
                </motion.div>
                <motion.div 
                initial={{y:40, opacity: 0}}
                whileInView={{y:0, opacity: 1}}
                transition={{duration:0.8, delay:0.9}}
                className="flex items-center gap-2">
                  <MdCoffeeMaker className="w-8 h-8 text-yellow-700"/>
                  <p>Coffee Maker</p>
                </motion.div>
                <motion.div 
                initial={{y:40, opacity: 0}}
                whileInView={{y:0, opacity: 1}}
                transition={{duration:0.8, delay:1.0}}
                className="flex items-center gap-2">
                  <PiBroom className="w-8 h-8 text-yellow-700"/>
                  <p>Room Service</p>
                </motion.div>
              </div>
            </div>

            <div className="mr-auto">
              <h1 className="text-3xl font-medium mb-4 text-yellow-700 text-shadow-lg font-serif sm:text-4xl">Room Features</h1>
              <div className=" text-gray-900  font-medium text-md py-4 border-b-1 border-gray-200">
                {parsedFeatures.map((feature, index) => (
                  <motion.div 
                  initial={{y:40, opacity: 0}}
                  whileInView={{y:0, opacity: 1}}
                  transition={{duration:0.4, delay:0.2}}
                  key={index} 
                  className="flex items-start gap-2 pb-2">
                    <FaCheck className="w-6 h-6 text-yellow-700 flex-shrink-0 "/>
                    <p className="leading-relaxed">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
          </section>
        </section>
        )}
    </main>
  );
}

