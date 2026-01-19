import React from "react";
import { Link } from "react-router-dom";
import { BsTv } from "react-icons/bs";
import { PiBowlFoodLight, PiBroom } from "react-icons/pi";
import { IoSnowOutline, IoWifiOutline} from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaCar } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { GiTowel } from "react-icons/gi";
import Loading from "../components/Loading";

export default function Rooms() {
  const BASE = import.meta.env.VITE_API_BASE_URL;
  const [rooms, setRooms] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${BASE}/api/rooms`, {
          credentials: "include",
        });
        
        if (!res.ok) {
          throw new Error("Failed to load rooms");
        }

        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.log(err);
        setError("Unable to load rooms. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);


 

  return (
    <main className="bg-gray-200">
      <section className="max-w-7xl  mx-auto px-4 sm:px-12 lg:px-8 pt-48">
      <h2 className="text-4xl md:text-5xl lg:7xl font-serif text-center font-semibold text-yellow-700 pb-3">Rooms & Suites</h2>
      <p className="pb-4 font-semibold text-gray-700 text-lg lg:text-xl  text-center">Explore our rooms thoughtfully designed to ensure maximum comfort.</p>

      {loading && (
        <Loading 
        message="Loading rooms..."
        margin="20" />
      )}

      {error && (
        <p className="text-red-600 text-lg text-center pt-12 pb-12">
          {error}
        </p>
      )}

      {!loading && !error && 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12 pb-24">
        {rooms.map(({ id, name, description, price_per_night, image_url, max_guests, has_breakfast }) => (
          <div key={id} className=' bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex-1 min-w-0'>
          <div className="overflow-hidden rounded-t-lg">
          <img src={`/assets/${image_url}`} alt={`${name}`} className='rounded-t-lg w-full object-cover h-56 transform transition-transform duration-500 ease-out hover:scale-110'/>
          </div>
          <div className='p-6 flex flex-col '>
            <h3 className='text-3xl font-medium font-serif text-yellow-700'>{name}</h3>
            <p className='pb-4 pt-3 border-b-1 border-gray-200 text-gray-900 font-medium text-lg text-shadow-sm'>{description}</p>
            <div className="grid grid-cols-2 gap-2 text-gray-900  font-medium text-md py-4 border-b-1 border-gray-200">
              <div className="flex items-center gap-2">
                <IoWifiOutline className="w-8 h-8 text-yellow-700"/>
                <p>Free Wi-Fi</p>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineUserGroup className="w-8 h-8 text-yellow-700"/>
                <p>Up to {max_guests} guests</p>
              </div>
              <div className="flex items-center gap-2">
                <IoSnowOutline className="w-8 h-8 text-yellow-700"/>
                <p>Air Conditioning</p>
              </div>
              <div className="flex items-center gap-2">
                <BsTv className="w-8 h-8 text-yellow-700"/>
                <p>Smart TV</p>
              </div>
              <div className="flex items-center gap-2 col-span-2 ">
                {has_breakfast === 1 ? <PiBowlFoodLight className="w-8 h-8 text-yellow-700"/> : <PiBroom className="w-8 h-8 text-yellow-700"/>}
                {has_breakfast === 1 ? <p>Breakfast availaible</p> : <p>Daily housekeeping</p>}
              </div>
            </div>
            <p className="font-medium text-2xl pt-4 text-gray-800">₦{price_per_night.toLocaleString()} <span className="font-light text-lg font-sans">/night</span></p>
            <Link to={`/rooms/${id}`}>
            <button className=" mt-4 px-6 py-2 text-white font-semibold font-serif text-lg rounded-lg hover:bg-linear-to-l from-yellow-600 to-yellow-800  hover:shadow-2xl bg-linear-to-r from-yellow-600 to-yellow-800 cursor-pointer active:bg-linear-to-l from-yellow-600 to-yellow-800 transition-colors duration-300">View Details</button>
            </Link>
          </div>
        </div> 
        ))}
      </div>
      }
    </section>

    <section className="max-w-7xl  mx-auto px-4 sm:px-12 lg:px-8 pt-16">
      <h2 className="text-4xl md:text-5xl lg:7xl font-serif text-center font-semibold text-yellow-700 pb-3">Room Amenities & Services</h2>
      <p className="pb-4 font-semibold text-gray-700 text-lg lg:text-xl  text-center">Every stay includes carefully selected amenities to ensure comfort and convenience.</p>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-900 font-medium text-lg pb-24 pt-6">
          <li className="flex items-center gap-3">
            <IoWifiOutline className="w-8 h-8 text-yellow-700"/>
            Free High-Speed Wi-Fi
          </li>
          <li className="flex items-center gap-3">
            <IoSnowOutline className="w-8 h-8 text-yellow-700"/>
            Air Conditioning
          </li>
          <li className="flex items-center gap-3">
            <BsTv className="w-8 h-8 text-yellow-700"/>
            Smart TV with Streaming
          </li>
          <li className="flex items-center gap-3">
            <PiBowlFoodLight className="w-8 h-8 text-yellow-700"/>
            On-Demand Breakfast
          </li>
          <li className="flex items-center gap-3">
            <PiBroom className="w-8 h-8 text-yellow-700"/>
            Daily Housekeeping
          </li>
          <li className="flex items-center gap-3">
            <FaCar  className="w-8 h-8 text-yellow-700"/>
            Secure Parking
          </li>
          <li className="flex items-center gap-3">
            <GiTowel className="w-8 h-8 text-yellow-700"/>
            Fresh Linen & Towels
          </li>
          <li className="flex items-center gap-3">
            <GoClock className="w-8 h-8 text-yellow-700"/>
            24/7 Room Service
          </li>
        </ul>
    </section>
    </main>
    
  );
}