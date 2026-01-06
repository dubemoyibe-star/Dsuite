import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function Checkout() {
  const { id: roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    check_in: "",
    check_out: "",
    adults: 2,
    children: 0,
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${roomId}`, {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setRoom(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const nights = useMemo(() => {
    if (!formData.check_in || !formData.check_out) {
      return 0
    };
    const diff = new Date(formData.check_out) - new Date(formData.check_in);
    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
  }, [formData.check_in, formData.check_out]);

  const totalPrice = useMemo(() => {
    if (!room) {
      return 0
    };
    return nights * room.price_per_night;
  }, [nights, room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number.isNaN(Number(value)) ? value : Number(value),
    }));
  };

  const handleSubmit = async () => {
    if (!nights) {
      setError("Please select valid dates");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/bookings/checkout", {
        method: "POST",
        credentials: "include",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({
          room_id: roomId,
          check_in: formData.check_in,
          check_out: formData.check_out,
          adults: formData.adults,
          children: formData.children
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      navigate("/booking-success", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-32">Loading checkout...</p>;
  }

  if (error && !room) {
    return <p className="text-center mt-32 text-red-600">{error}</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 pb-28 pt-32 bg-gray-100">

      <Link
        to={`/rooms/${roomId}`}
        className="text-yellow-700 mb-6 inline-block hover:underline"
      >
        ← Back to Room Details
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 ">
          <img
            src={`/assets/${room.image_url}`}
            alt={room.name}
            className="rounded-xl w-full h-[350px] object-cover"
          />

          <h2 className="text-3xl font-serif font-bold">{room.name}</h2>
          <p className="text-yellow-700 font-semibold">
            ₦{room.price_per_night.toLocaleString()} / night
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
            <label htmlFor="check_in" className="text-sm font-medium text-gray-700">
              Check-in-date
            </label>
            <input
              type="date"
              name="check_in"
              value={formData.check_in}
              onChange={handleChange}
              className="border rounded-md p-3"
            />
            </div>

            <div className="flex flex-col gap-1">
            <label htmlFor="check_out" className="text-sm font-medium text-gray-700">
              Check-out-date
            </label>
              <input
              type="date"
              name="check_out"
              value={formData.check_out}
              onChange={handleChange}
              className="border rounded-md p-3"
            />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-full">
            <label htmlFor="adults" className="text-sm font-medium text-gray-700">
              Number of adults
            </label>
              <input
              type="number"
              min="1"
              max="3"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              className="border rounded-md p-3 w-full"
              placeholder="Adults"
            />
            </div>
            
            <div className="flex flex-col gap-1 w-full">
            <label htmlFor="children" className="text-sm font-medium text-gray-700">
              Number of children
            </label>
              <input
              type="number"
              min="0"
              max="3"
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="border rounded-md p-3 w-full"
              placeholder="Children"
            />
            </div>
            
          </div>

        <div className="grid grid-cols-2 gap-3 text-gray-700 text-sm">
            {JSON.parse(room.features).map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                ✓ {feature}
              </div>
            ))}
          </div>
        </div>

        <aside className="border rounded-xl p-6 h-fit shadow-sm">
          <h3 className="text-xl font-bold mb-4 lg:py-2 lg:text-2xl">Booking Summary</h3>

          <div className="space-y-2 text-sm">
            <p className="lg:text-lg">{`${nights} ${nights > 1 ? 'Nights' : 'Night'}`}</p>
            <p className="lg:text-lg">
              ₦{room.price_per_night.toLocaleString()} x {nights}
            </p>
            <hr />
            <p className="text-lg font-bold">
              ₦{totalPrice.toLocaleString()}
            </p>
          </div>

          {error && (
            <p className="text-red-600 text-sm mt-3">{error}</p>
          )}

          <button
            disabled={submitting}
            onClick={handleSubmit}
            className="mt-6 w-full bg-yellow-700 text-white py-3 rounded-md font-semibold hover:bg-yellow-800 disabled:opacity-60  cursor-pointer disabled:cursor-not-allowed"
          >
            {submitting ? "Confirming..." : "Confirm Booking"}
          </button>
        </aside>
      </div>
    </section>
  );
}