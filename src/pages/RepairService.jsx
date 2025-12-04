import { useState } from "react";

export default function RepairService() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    productType: "",
    issue: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🔧 Your repair request has been submitted!");
  };

  const services = [
    {
      title: "Radio Repair",
      desc: "We fix all kinds of analog, digital, and vintage radios with expert precision.",
      icon: "📻",
    },
    {
      title: "Speaker Repair",
      desc: "Restore your sound clarity — we repair speakers, tweeters, and woofers.",
      icon: "🔊",
    },
    {
      title: "Amplifier Service",
      desc: "Professional amplifier tuning, rewiring, and component replacements.",
      icon: "🎚️",
    },
    {
      title: "Bluetooth Device Fix",
      desc: "Connectivity, battery, or circuit issues — we handle all Bluetooth devices.",
      icon: "📶",
    },
    {
      title: "Home Audio Systems",
      desc: "Complete repair and setup for multi-speaker home and studio audio systems.",
      icon: "🏠",
    },
    {
      title: "Vintage Equipment",
      desc: "We carefully restore old radios and antique audio devices to working condition.",
      icon: "🕰️",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white min-h-screen py-16 px-6 md:px-20">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4">
          Repair <span className="text-cyan-400">Services</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          At Vijay Radios, we specialize in bringing your radios, speakers, and
          sound systems back to life with expert repair and maintenance.
        </p>
      </section>

      {/* Services Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center shadow-xl hover:shadow-cyan-500/20 transition duration-300"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-cyan-400">
              {service.title}
            </h2>
            <p className="text-gray-400 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Repair Request Form */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
          Request a Repair
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
          />
          <input
            type="text"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            placeholder="Product Type (e.g. Radio, Speaker, Amplifier)"
            required
            className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
          />
          <textarea
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            placeholder="Describe the issue"
            rows="4"
            required
            className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-full shadow-lg transition duration-300"
          >
            Submit Request
          </button>
        </form>
      </section>
    </div>
  );
}
