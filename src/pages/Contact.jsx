import { useDispatch, useSelector } from "react-redux";
import {
  sendContactMessage,
  resetContactState,
} from "../feactures/contact/contactSlice"; // ✅ FIXED PATH
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

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
    <div className="bg-[#0a0f16] text-white min-h-screen font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative pt-36 pb-16 px-6 md:px-12 lg:px-20">
      
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>

      {/* Header */}
      <section className="relative z-10 text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Vijay Radios</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          We’d love to hear from you. Whether it’s a query, feedback, or a repair
          request — our team is here to help.
        </p>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Info */}
        <div className="bg-gray-800/40 backdrop-blur-sm p-10 md:p-12 rounded-3xl border border-gray-700/50 shadow-2xl flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-8">
            Get in Touch
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-4 group">
              <div className="bg-cyan-500/10 p-4 rounded-2xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Our Location</h3>
                <p className="text-gray-400">Shichai Vibhag Colony, A.B Road,<br/>Kanasiya Naka</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-400 group-hover:bg-blue-500 group-hover:text-black transition-colors duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Phone Number</h3>
                <p className="text-gray-400">+91 8871442941<br/>+91 9754990102</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="bg-purple-500/10 p-4 rounded-2xl text-purple-400 group-hover:bg-purple-500 group-hover:text-black transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Email Address</h3>
                <p className="text-gray-400">vijayranasara990@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="bg-cyan-500/10 p-4 rounded-2xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Business Hours</h3>
                <p className="text-gray-400">Mon - Sun: 9:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-800/40 backdrop-blur-sm p-10 md:p-12 rounded-3xl border border-gray-700/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-10"></div>
          
          <h2 className="text-3xl font-bold text-white mb-8 relative z-10">
            Send a Message
          </h2>

          <form className="space-y-6 relative z-10" onSubmit={submitHandler}>
            
            {/* User Name */}
            <div>
              <input
                name="user_name" // ✅ IMPORTANT
                placeholder="Your Name"
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-white placeholder-gray-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-white placeholder-gray-500"
                required
              />
            </div>

            {/* Mobile */}
            <div>
              <input
                name="mobile" // ✅ IMPORTANT
                type="tel"
                placeholder="Phone Number"
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-white placeholder-gray-500"
                required
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message..."
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-white placeholder-gray-500 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-6 py-4 rounded-xl shadow-lg shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Sending..." : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>

            {success && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-center font-medium animate-pulse">
                Message sent successfully! ✅
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center font-medium">
                {error}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
