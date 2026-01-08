import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AuthContext } from "../contexts/AuthContext";

export default function Profile() {
  const BASE = import.meta.env.VITE_API_BASE_URL;
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useContext(AuthContext)

  const handleLogout = async () => {
    try {
       await fetch(`${BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      await logout();
    navigate("/", { replace: true });
    } catch (error) {
      console.log(error)
    }
 
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [userRes, bookingsRes] = await Promise.all([
          fetch(`${BASE}/api/me`, { credentials: "include" }),
          fetch(`${BASE}/api/bookings/me`, {credentials: "include",}),
        ]);

        if (!userRes.ok || !bookingsRes.ok) {
          throw new Error("Failed to load profile");
        }

        const userData = await userRes.json();
        const bookingsData = await bookingsRes.json();

        setUser(userData.user);
        setBookings(bookingsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return;
    }
    try {
      const res = await fetch(`${BASE}/api/bookings/cancel/${bookingId}`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status: "cancelled" } : booking
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <AiOutlineLoading3Quarters className="animate-spin text-yellow-700 w-8 h-8 pt-32 mx-auto" />
  if (error) return <p className="text-center mt-32 text-red-600">{error}</p>;

  return (
    <section className="bg-gray-100 lg:px-16 mx-auto px-4 pt-32 pb-28">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold">{user.name}</h1>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleLogout()} className="bg-red-100 text-red-700 font-bold rounded-full px-4 text-sm cursor-pointer">LOGOUT</button>
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold w-fit ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {user.role.toUpperCase()}
        </span>
        </div>
      </div>

      <h2 className="text-2xl font-serif font-bold mb-6 text-gray-800">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow-sm">
          <p className="text-gray-600 mb-6">You haven’t made any bookings yet.</p>
          <div className="flex justify-center gap-4">
            <Link to="/" className="bg-gray-800 text-white px-5 py-2 rounded-md">
              Go Home
            </Link>
            <Link
              to="/rooms"
              className="bg-yellow-700 text-white px-5 py-2 rounded-md"
            >
              Browse Rooms
            </Link>
          </div>
        </div>
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
                className="w-full h-full sm:w-40  object-cover"
              />

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif font-bold text-lg">
                      {booking.room_name}
                    </h3>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        booking.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {booking.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    {booking.check_in} → {booking.check_out}
                  </p>

                  <div className="mt-3 text-sm text-gray-700 space-y-1">
                    <p>Nights: {booking.nights}</p>
                    <p className="font-semibold">
                      ₦{booking.total_price.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Room Allocation:{" "}
                      {booking.physical_room_number || "Pending..."}
                    </p>
                  </div>
                </div>

                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="mt-4 text-sm text-red-600 font-semibold hover:underline self-start cursor-pointer"
                  >
                    Cancel booking
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