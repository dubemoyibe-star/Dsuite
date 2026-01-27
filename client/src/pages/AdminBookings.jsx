import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { motion } from "framer-motion";

export default function AdminBookings() {
  const BASE = import.meta.env.VITE_API_BASE_URL;
  const [bookings, setBookings] = useState([]);
  const [roomInputs, setRoomInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BASE}/api/bookings/admin`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load bookings");
        return res.json();
      })
      .then(setBookings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const cancelBooking = async (bookingId) => {
    if (!confirm("Cancel this booking?")) return;

    try {
      await fetch(`${BASE}/api/bookings/cancel/${bookingId}`, {
        method: "PATCH",
        credentials: "include",
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    } catch {
      alert("Failed to cancel booking");
    }
  };

  const handleRoomInput = (bookingId, value) => {
    setRoomInputs((prev) => ({ ...prev, [bookingId]: value }));
  };

  const assignRoom = async (bookingId) => {
    const roomNumber = roomInputs[bookingId];
    if (!roomNumber) return alert("Enter a room number");

    try {
      await fetch(`${BASE}/api/bookings/admin/assign-room/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ physical_room_number: roomNumber }),
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, physical_room_number: roomNumber }
            : booking
        )
      );

      setRoomInputs((prev) => ({ ...prev, [bookingId]: "" }));
    } catch {
      alert("Failed to assign room");
    }
  };

  if (loading) {
    return <Loading 
          message="Loading bookings..." 
          margin="20"/>;
  }

  if (error) {
    return <p className="text-center mt-32 text-red-600">{error}</p>;
  }

  return (
    <div>
      {bookings.length === 0 ? (
        <motion.p 
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8}}
        className="text-gray-600 text-xl flex justify-center">No bookings found.</motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8}}
              key={booking.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row"
            >
              <img
                src={`https://ik.imagekit.io/wyhbark190/assets/${booking.room_image}`}
                loading="lazy"
                alt={booking.room_name}
                className="w-full sm:w-40 h-full object-cover"
              />

              <div className="p-5 flex-1">
                <div className="flex justify-between mb-2">
                  <motion.h3 
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 , delay: 0.2}}
                  className="font-serif font-bold">
                    {booking.room_name}
                  </motion.h3>
                  <motion.span
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2}}
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      booking.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {booking.status.toUpperCase()}
                  </motion.span>
                </div>

                <motion.p 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3}}
                className="text-sm text-gray-600">
                  {booking.check_in} → {booking.check_out}
                </motion.p>

                <div className="mt-2 text-sm space-y-1">
                  <motion.p
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4}}
                  >Username: {booking.username}</motion.p>
                  <motion.p
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.45}}
                  >User ID: {booking.user_id}</motion.p>
                  <motion.p
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5}}
                  >Nights: {booking.nights}</motion.p>
                  <motion.p 
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.55}}
                  className="font-semibold">
                    ₦{booking.total_price.toLocaleString()}
                  </motion.p>
                </div>

                {booking.status !== "cancelled" &&
                  (booking.physical_room_number ? (
                    <motion.p 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6}}
                    className="mt-2 text-xs text-gray-500">
                      Room: {booking.physical_room_number}
                    </motion.p>
                  ) : (
                    <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.65}}
                    className="flex gap-2 mt-3">
                      <input
                        value={roomInputs[booking.id] || ""}
                        onChange={(e) =>
                          handleRoomInput(booking.id, e.target.value)
                        }
                        placeholder="Room #"
                        className="border px-2 py-1 text-sm rounded w-24"
                      />
                      <button
                        onClick={() => assignRoom(booking.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Assign
                      </button>
                    </motion.div>
                  ))}

                {booking.status !== "cancelled" && (
                  <motion.button
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4}}
                    onClick={() => cancelBooking(booking.id)}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded text-sm"
                  >
                    Cancel Booking
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}