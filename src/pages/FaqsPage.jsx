import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How do I book a room?",
    answer:
      "Browse our available rooms, select your preferred dates, and click the 'Book Now' button. You will be asked to log in or sign up before completing your booking.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes. You can cancel your booking from your profile page before your check-in date. Please note that cancellation policies may apply.",
  },
  {
    question: "Do I need an account to make a booking?",
    answer:
      "Yes. Only registered users can make bookings. This helps us keep your bookings secure and easily accessible.",
  },
  {
    question: "How will I know my booking is confirmed?",
    answer:
      "Once your booking is successful, it will appear in your profile page with a confirmed status. You may also receive an email confirmation.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We currently support secure payments on arrival at our hotel. All transactions are properly documented to ensure accountability.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach us via WhatsApp, phone call, email, or through the Contact Us page. Our support team is always ready to assist you.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 pt-36 pb-24 md:px-10">
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Everything you need to know about bookings, payments, and support.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left"
            >
              <span className="font-medium text-gray-800">
                {faq.question}
              </span>
              <FaChevronDown
                className={`text-gray-500 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-600 mb-4">
          Still have questions?
        </p>
        <a
          href="/contact-us"
          className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Contact Support
        </a>
      </div>
    </section>
  );
}