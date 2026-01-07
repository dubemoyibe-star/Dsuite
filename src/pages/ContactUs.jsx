import { useState , useEffect} from "react";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
  if (success) {
    setShowSuccess(true);
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Message sent successfully. We’ll get back to you shortly.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-36 pb-12 md:px-10">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
          Contact Us
        </h1>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Have questions about your booking or need assistance?
          Our team is always ready to help you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Get in Touch
          </h2>

          <div className="flex items-start gap-4">
            <FaWhatsapp className="text-green-600 text-2xl mt-1" />
            <div>
              <p className="font-medium text-gray-800">WhatsApp</p>
              <a
                href="https://wa.me/2347026137565"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-green-600 transition"
              >
                +234 70 2613 7565
              </a>
              <p className="text-sm text-gray-500">Fastest way to reach us</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-yellow-600 text-2xl mt-1" />
            <div>
              <p className="font-medium text-gray-800">Phone</p>
              <a
                href="tel:+2347026137565"
                className="text-gray-600 hover:text-yellow-600 transition"
              >
                +234 70 2613 7565
              </a>
              <p className="text-sm text-gray-500">For urgent inquiries</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-blue-600 text-2xl mt-1" />
            <div>
              <p className="font-medium text-gray-800">Email</p>
              <a
                href="mailto:dubemoyibe@gmail.com?subject=Hotel%20Inquiry&body=Hello%20Dsuite%20Team,%0A%0AI%20would%20like%20to%20make%20an%20inquiry%20about..."
                className="text-gray-600 hover:text-blue-600 transition"
              >
                dubemoyibe@gmail.com
              </a>
              <p className="text-sm text-gray-500">
                Detailed or formal requests
              </p>
            </div>
          </div>

          <div className="pt-4 border-t text-sm text-gray-600">
            <p className="font-medium text-gray-700">Support Hours</p>
            <p>Monday – Sunday: 8:00am – 10:00pm</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Send Us a Message
          </h2>

          {error && (
            <p className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
              {error}
            </p>
          )}

          {showSuccess && (
            <p className="mb-4 text-sm text-green-600 bg-green-50 p-3 rounded">
              {success}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}