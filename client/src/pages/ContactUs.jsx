import { useState , useEffect} from "react";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  const BASE = import.meta.env.VITE_API_BASE_URL;
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
      const res = await fetch(`${BASE}/api/messages`, {
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
    <div className="min-h-screen bg-gray-200 px-4 pt-36 pb-12 md:px-10">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h1 
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1, ease: "linear" }}
        style={{
          whiteSpace: "wrap",
          width: "100%",
        }}
        className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
          Contact Us
        </motion.h1>
        <motion.p 
        initial={{y:40, opacity: 0}}
        whileInView={{y:0, opacity: 1}}
        transition={{duration:0.8}}
        className="mt-4 text-gray-600 text-base md:text-lg">
          Have questions about your booking or need assistance?
          Our team is always ready to help you.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div 
        initial={{scale: 0.9, opacity: 0}}
        whileInView={{scale: 1, opacity:1}}
        viewport={{once: true}}
        transition={{duration: 0.8 }}
        className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-6">
          <motion.h2 
          initial={{y:40, opacity: 0}}
          whileInView={{y:0, opacity: 1}}
          transition={{duration:0.8 , delay:0.1}}
          className="text-2xl font-semibold text-gray-800 mb-4">
            Get in Touch
          </motion.h2>

          <motion.div 
          initial={{y:40, opacity: 0}}
          whileInView={{y:0, opacity: 1}}
          transition={{duration:0.8, delay: 0.2}}
          className="flex items-start gap-4">
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
          </motion.div>

          <motion.div 
          initial={{y:40, opacity: 0}}
          whileInView={{y:0, opacity: 1}}
          transition={{duration:0.8, delay: 0.3}}
          className="flex items-start gap-4">
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
          </motion.div>

          <motion.div 
          initial={{y:40, opacity: 0}}
          whileInView={{y:0, opacity: 1}}
          transition={{duration:0.8, delay: 0.4}}
          className="flex items-start gap-4">
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
          </motion.div>

          <motion.div 
          initial={{y:40, opacity: 0}}
          whileInView={{y:0, opacity: 1}}
          transition={{duration:0.8, delay: 0.5}}
          className="pt-4 border-t text-sm text-gray-600">
            <p className="font-medium text-gray-700">Support Hours</p>
            <p>Monday – Sunday: 8:00am – 10:00pm</p>
          </motion.div>
        </motion.div>

        <motion.div 
        initial={{y:40, opacity: 0}}
        whileInView={{y:0, opacity: 1}}
        transition={{duration:0.8}}
        className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <motion.h2 
          initial={{y:40, opacity: 0}}
          whileInView={{y:0, opacity: 1}}
          transition={{duration:0.8, delay: 0.1}}
          className="text-2xl font-semibold text-gray-800 mb-6">
            Send Us a Message
          </motion.h2>

          {error && (
            <motion.p 
            initial={{y:40, opacity: 0}}
            whileInView={{y:0, opacity: 1}}
            transition={{duration:0.4}}
            className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
              {error}
            </motion.p>
          )}

          {showSuccess && (
            <motion.p 
            initial={{y:40, opacity: 0}}
            whileInView={{y:0, opacity: 1}}
            transition={{duration:0.4}}
            className="mb-4 text-sm text-green-600 bg-green-50 p-3 rounded">
              {success}
            </motion.p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <motion.div
            initial={{y:40, opacity: 0}}
            whileInView={{y:0, opacity: 1}}
            transition={{duration:0.8, delay: 0.2}}
            >
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
            </motion.div>

            <motion.div
            initial={{y:40, opacity: 0}}
            whileInView={{y:0, opacity: 1}}
            transition={{duration:0.8, delay: 0.3}}
            >
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
            </motion.div>

            <motion.div
            initial={{y:40, opacity: 0}}
            whileInView={{y:0, opacity: 1}}
            transition={{duration:0.8, delay: 0.4}}
            >
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
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              initial={{x:-30, opacity: 0}}
              whileInView={{x:0, opacity: 1}}
              transition={{duration:0.8}}
              className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}