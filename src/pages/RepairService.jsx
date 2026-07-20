import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRepair,
  resetRepairState,
} from "../feactures/repair/repairServiceSlice.js";
import { useNavigate } from "react-router";
import { Radio, Speaker, AudioLines, Bluetooth, Home, Clock, Wrench } from "lucide-react"; 

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
    { title: "Radio Repair", icon: <Radio className="w-8 h-8" /> },
    { title: "Speaker Repair", icon: <Speaker className="w-8 h-8" /> },
    { title: "Amplifier Service", icon: <AudioLines className="w-8 h-8" /> },
    { title: "Bluetooth Device Fix", icon: <Bluetooth className="w-8 h-8" /> },
    { title: "Home Audio Systems", icon: <Home className="w-8 h-8" /> },
    { title: "Vintage Equipment", icon: <Clock className="w-8 h-8" /> },
  ];

  return (
    <div className="bg-[#0a0f16] text-white min-h-screen font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative pt-36 pb-16 px-6 md:px-12 lg:px-20">
      
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>

      {/* Header */}
      <section className="relative z-10 text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Repair <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Services</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          We specialize in professional audio repair and restoration. Bring your beloved equipment back to life.
        </p>
      </section>

      {/* Services Grid */}
      <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
        {services.map((s) => (
          <div
            key={s.title}
            className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 text-center hover:bg-gray-800/60 transition-all duration-300 shadow-xl hover:shadow-cyan-500/10 transform hover:-translate-y-1"
          >
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-black transition-colors duration-300">
              {s.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-200 group-hover:text-cyan-400 transition-colors">
              {s.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Repair Form */}
      <section className="relative z-10 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-10 md:p-12 max-w-3xl mx-auto shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-10"></div>
        
        <h2 className="text-3xl font-bold mb-8 text-center text-white relative z-10">
          Request a Repair
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <input
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-white placeholder-gray-500"
            />
          </div>

          <div>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-white placeholder-gray-500"
            />
          </div>

          <div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-white placeholder-gray-500"
            />
          </div>

          <div>
            <input
              name="product_type"
              value={formData.product_type}
              onChange={handleChange}
              placeholder="Product Type (Radio, Speaker, etc.)"
              required
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-white placeholder-gray-500"
            />
          </div>

          <div>
            <textarea
              name="describation"
              value={formData.describation}
              onChange={handleChange}
              placeholder="Describe the issue"
              rows="4"
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-white placeholder-gray-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-6 py-4 rounded-xl shadow-lg shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? "Submitting..." : (
              <>
                <Wrench className="w-5 h-5" />
                Submit Request
              </>
            )}
          </button>

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-center font-medium">
              Repair request submitted successfully! ✅
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center font-medium">
              {error}
            </div>
          )}
        </form>
      </section>
    </div>
  );
}
