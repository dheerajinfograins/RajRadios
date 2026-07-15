import { Link } from "react-router";
import { ArrowRight, Wrench } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-[#0a0f16] text-white min-h-screen font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative">
      
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-20 lg:py-32 max-w-7xl mx-auto">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left mt-12 md:mt-0 space-y-6">
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Vijay Radios
            </span>
          </h1>
          <p className="text-gray-400 text-lg lg:text-xl max-w-lg mx-auto md:mx-0">
            Explore premium radios, modern electronics, and reliable repair services — all crafted with innovation and precision since 2015.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Link
              to="/shop"
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/repairservice"
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1"
            >
              Book Repair
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center relative mt-16 md:mt-0">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-500"></div>
            <img
              src="images/Speaker1.jpg"
              alt="Vintage Radio"
              className="relative rounded-3xl shadow-2xl w-80 md:w-[450px] object-cover aspect-[4/3] border border-gray-700/50 transform transition duration-500 group-hover:scale-[1.02] bg-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Featured Products / Services */}
      <section className="relative z-10 py-20 px-6 md:px-20 bg-gray-900/50 backdrop-blur-sm border-t border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Our Featured Offerings
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our top-tier products and professional services tailored for audiophiles and vintage lovers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="overflow-hidden rounded-2xl mb-6 relative aspect-video">
                <img
                  src="images/HomeTheaterSpeaker.jpg"
                  alt="Retro Radios"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white flex items-center gap-2">
                 Home Theater Speaker
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Discover timeless designs with the perfect blend of nostalgia and crystal-clear sound.
              </p>
              <Link to="/shop" className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="overflow-hidden rounded-2xl mb-6 relative aspect-video">
                <img
                  src="images/RepairSpeaker.jpg"
                  alt="Electronics Repair"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white flex items-center gap-2">
                 Repair Services
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Expert repairs for all types of radios, amplifiers, and audio equipment by professionals.
              </p>
              <Link to="/repairservice" className="text-blue-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Book Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="overflow-hidden rounded-2xl mb-6 relative aspect-video">
                <img
                  src="images/NewSpeaker1.jpg"
                  alt="Modern Tech"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white flex items-center gap-2">
                Modern Audio
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Experience cutting-edge sound systems with premium components and unmatched performance.
              </p>
              <Link to="/shop" className="text-purple-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 text-center py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-10 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white relative z-10">
            Need Your Radio Repaired Fast?
          </h2>
          <p className="text-gray-300 mb-10 text-lg max-w-xl mx-auto relative z-10">
            Visit our repair center today or book an appointment online to get your vintage and modern audio gear back to life.
          </p>
          <Link
            to="/repairservice"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 relative z-10"
          >
            <Wrench className="w-5 h-5" />
            Book Repair Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
