import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [roomInputs, setRoomInputs] = useState({}); 
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const res = await fetch("/api/bookings/admin", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to load bookings");
        }

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    if (!confirm("Cancel this booking?")) {
      return
    };

    try {
      const res = await fetch(`/api/bookings/cancel/${bookingId}`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRoomInput = (bookingId, value) => {
    setRoomInputs((prev) => ({
      ...prev,
      [bookingId]: value,
    }));
  };

  const assignRoom = async (bookingId) => {
    const roomNumber = roomInputs[bookingId];

    if (!roomNumber) {
      return alert("Enter a room number first");
    }

    try {
      const res = await fetch(`/api/bookings/admin/assign-room/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          physical_room_number: roomNumber,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to assign room");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, physical_room_number: roomNumber }
            : booking
        )
      );

      setRoomInputs((prev) => ({
        ...prev,
        [bookingId]: "",
      }));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-32">Loading admin dashboard...</p>;
  }

  if (error) {
    return <p className="text-center mt-32 text-red-600">{error}</p>;
  }

  return (
    <section className="mx-auto px-4 pt-32 pb-28 bg-gray-100 lg:px-16">
      <h1 className="text-3xl font-serif font-bold mb-8 text-gray-800">
        Admin Dashboard
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row"
            >
              <img
                src={`/assets/${booking.room_image}`}
                alt={booking.room_name}
                className="w-full sm:w-40 h-full object-cover"
              />

              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif font-bold text-lg">
                    {booking.room_name}
                  </h3>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full
                      ${
                        booking.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }
                    `}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  {booking.check_in} → {booking.check_out}
                </p>

                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <p>Username: {user.username}</p>
                  <p>User ID: {booking.user_id}</p>
                  <p>Nights: {booking.nights}</p>
                  <p className="font-semibold">
                    ₦{booking.total_price.toLocaleString()}
                  </p>

                  {booking.status !== "cancelled" && (
                    booking.physical_room_number ? (
                      <p className="text-xs text-gray-500">
                        Room Allocation: {booking.physical_room_number}
                      </p>
                    ) : (
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          placeholder="Room #"
                          value={roomInputs[booking.id] || ""}
                          onChange={(e) =>
                            handleRoomInput(booking.id, e.target.value)
                          }
                          className="border px-2 py-1 text-sm rounded w-24"
                        />
                        <button
                          onClick={() => assignRoom(booking.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 cursor-pointer"
                        >
                          Assign
                        </button>
                      </div>
                    )
                  )}
                </div>

                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 cursor-pointer"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}