import react from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = react.useState(null);
  const [loading, setLoading] = react.useState(true);
  const [error, setError] = react.useState("");

  react.useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);

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

  console.log(room);
  const { name, description,  image_url, max_guests, has_breakfast } = room || {};
  return (
    <main className="bg-gray-200 min-h-screen">
      <section className="max-w-4xl mx-auto px-4 sm:px-12 lg:px-8 pt-48 pb-24">
        {loading && (
          <AiOutlineLoading3Quarters className="animate-spin text-yellow-700 w-8 h-8 pt-32 mx-auto" />
        )}
        {error && (
          <p className="text-red-600 text-lg text-center pt-12 pb-12">
            {error}
          </p>
        )}
        {!loading && room && (
          <section>
              <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col md:flex-row">
                <img src={`/assets/${image_url}`} alt={name} className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none" />
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-serif font-semibold text-yellow-700 mb-4">{name}</h2>
                    <p className="text-gray-700 mb-6">{description}</p>
                  </div>
                  <div>
                    <p className="text-md font-medium text-gray-900 mb-2">Max Guests: {max_guests}</p>
                    <p className="text-md font-medium text-gray-900">Breakfast Included: {has_breakfast ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
          </section>
        )}
      </section>
    </main>
  );
}