export default function Contact() {
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white min-h-screen py-16 px-6 md:px-20">
      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4">
          Contact <span className="text-cyan-400">Vijay Radios</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          We’d love to hear from you. Whether it’s a query, feedback, or a repair request —  
          our team is here to help you with the right sound solutions.
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact Information */}
        <div className="space-y-6 bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">
          <h2 className="text-3xl font-semibold mb-4 text-cyan-400">Get in Touch</h2>
          <p className="text-gray-400 mb-6">
            Reach out to us for any product information, repair service bookings, or general inquiries.
          </p>
          <ul className="space-y-3">
            <li>
              📍 <span className="text-gray-300">Shichai Vibhag Colony ke Smane A.B Road Kanasiya Naka</span>
            </li>
            <li>
              📞 <a href="tel:+919876543210" className="hover:text-cyan-400">+91 8871442941 - 9754990102</a>
            </li>
            <li>
              ✉️ <a href="mailto:info@vijayradios.com" className="hover:text-cyan-400">vijayranasara990@gmail.com</a>
            </li>
            <li>
              🕒 <span className="text-gray-300">Mon - Sun: 9:00 AM – 7:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">
          <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Send a Message</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold text-center mb-6 text-cyan-400">
          Visit Our Store
        </h2>
        <div className="w-full h-72 rounded-2xl overflow-hidden shadow-lg border border-gray-800">
          <iframe
            title="Vijay Radios Location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d368.0477872989448!2d76.15088793882178!3d23.28059186386928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1763201573039!5m2!1sen!2sin" referrerpolicy="no-referrer-when-downgrade"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
