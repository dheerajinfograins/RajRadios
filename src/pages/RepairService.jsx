import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRepair,
  resetRepairState,
} from "../feactures/repair/repairServiceSlice.js";
import { useNavigate } from "react-router";

export default function RepairService() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.repair);

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  const [formData, setFormData] = useState({
    user_name: "",
    mobile: "",
    email: "",
    product_type: "",
    describation: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createRepair(formData));
  };

  useEffect(() => {
    if (success) {
      setFormData({
        user_name: "",
        mobile: "",
        email: "",
        product_type: "",
        describation: "",
      });

      setTimeout(() => dispatch(resetRepairState()), 3000);
    }
  }, [success, dispatch]);

  const services = [
    { title: "Radio Repair", icon: "📻" },
    { title: "Speaker Repair", icon: "🔊" },
    { title: "Amplifier Service", icon: "🎚️" },
    { title: "Bluetooth Device Fix", icon: "📶" },
    { title: "Home Audio Systems", icon: "🏠" },
    { title: "Vintage Equipment", icon: "🕰️" },
  ];

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white min-h-screen py-16 px-6 md:px-20">

      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4">
          Repair <span className="text-cyan-400">Services</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          We specialize in professional audio repair and restoration.
        </p>
      </section>

      {/* Services */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center"
          >
            <div className="text-5xl mb-4">{s.icon}</div>
            <h2 className="text-xl font-semibold text-cyan-400">
              {s.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Repair Form */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
          Request a Repair
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full bg-gray-800 p-3 rounded-lg"
          />

          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
            className="w-full bg-gray-800 p-3 rounded-lg"
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full bg-gray-800 p-3 rounded-lg"
          />

          <input
            name="product_type"
            value={formData.product_type}
            onChange={handleChange}
            placeholder="Product Type (Radio, Speaker, etc.)"
            required
            className="w-full bg-gray-800 p-3 rounded-lg"
          />

          <textarea
            name="describation"
            value={formData.describation}
            onChange={handleChange}
            placeholder="Describe the issue"
            rows="4"
            className="w-full bg-gray-800 p-3 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-full"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

          {success && (
            <p className="text-green-400 text-center">
              Repair request submitted successfully ✅
            </p>
          )}

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
        </form>
      </section>
    </div>
  );
}
