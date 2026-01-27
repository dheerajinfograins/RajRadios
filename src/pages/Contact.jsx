import { useDispatch, useSelector } from "react-redux";
import {
  sendContactMessage,
  resetContactState,
} from "../feactures/contact/contactSlice"; // ✅ FIXED PATH

export default function Contact() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.contact);

  const submitHandler = (e) => {
    e.preventDefault();

    const user_name = e.target.user_name.value.trim(); // ✅ MATCH BACKEND
    const email = e.target.email.value.trim();
    const mobile = e.target.mobile.value.trim();       // ✅ MATCH BACKEND
    const message = e.target.message.value.trim();

    if (!user_name || !email || !mobile || !message) return;

    dispatch(
      sendContactMessage({
        user_name,
        email,
        mobile,
        message,
      })
    );

    e.target.reset();
    setTimeout(() => dispatch(resetContactState()), 3000);
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white min-h-screen py-16 px-6 md:px-20">
      
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4">
          Contact <span className="text-cyan-400">Vijay Radios</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          We’d love to hear from you. Whether it’s a query, feedback, or a repair
          request — our team is here to help.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Info */}
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
          <h2 className="text-3xl font-semibold text-cyan-400 mb-4">
            Get in Touch
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li>📍 Shichai Vibhag Colony, A.B Road, Kanasiya Naka</li>
            <li>📞 +91 8871442941 - 9754990102</li>
            <li>✉️ vijayranasara990@gmail.com</li>
            <li>🕒 Mon - Sun: 9:00 AM – 7:00 PM</li>
          </ul>
        </div>

        {/* Form */}
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
          <h2 className="text-3xl font-semibold text-cyan-400 mb-6">
            Send a Message
          </h2>

          <form className="space-y-5" onSubmit={submitHandler}>
            
            {/* User Name */}
            <input
              name="user_name" // ✅ IMPORTANT
              placeholder="Your Name"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
              required
            />

            {/* Email */}
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
              required
            />

            {/* Mobile */}
            <input
              name="mobile" // ✅ IMPORTANT
              type="tel"
              placeholder="Phone Number"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
              required
            />

            {/* Message */}
            <textarea
              name="message"
              rows="5"
              placeholder="Write your message..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="text-green-400 text-center">
                Message sent successfully ✅
              </p>
            )}

            {error && (
              <p className="text-red-500 text-center">
                {error}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
