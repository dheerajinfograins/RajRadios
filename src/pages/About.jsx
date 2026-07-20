import { Link } from "react-router";
import { ShieldCheck, Target, Heart, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="bg-[#0a0f16] text-white min-h-screen font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative pt-36 pb-16 px-6 md:px-12 lg:px-20">
      
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>

      {/* Page Header */}
      <section className="relative z-10 text-center mb-20 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Vijay Radios</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Celebrating decades of sound innovation and trusted service. We combine craftsmanship, technology, and passion to keep your world connected through sound.
        </p>
      </section>

      {/* Brand Story */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24 max-w-7xl mx-auto">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Our Story</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Founded in 2015, <span className="text-cyan-400 font-semibold">Vijay Radios</span> started as a small repair shop dedicated to restoring vintage radios.  
            Over the years, we’ve evolved into a trusted brand offering high-quality radios, modern sound systems, and professional repair services.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Our mission is simple — to bring back the soul of music and the nostalgia of sound, powered by modern innovation.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-500"></div>
            <img
              src="images/ASpeaker1.jpg"
              alt="Our Story"
              className="relative rounded-3xl shadow-2xl border border-gray-700/50 w-full md:w-[500px] object-cover aspect-[4/3] transform transition duration-500 group-hover:scale-[1.02] bg-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-12 md:p-16 rounded-3xl shadow-2xl mb-24 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Our Mission</h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
          At Vijay Radios, our mission is to preserve the timeless joy of radio listening while embracing the future of sound.  
          We aim to deliver products that inspire confidence, repair services that restore memories, and innovation that connects generations.
        </p>
      </section>

      {/* Core Values */}
      <section className="relative z-10 max-w-7xl mx-auto mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Core Values</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:-translate-y-2">
            <div className="bg-cyan-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors duration-300">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Quality & Precision</h3>
            <p className="text-gray-400 leading-relaxed">
              Every product we create and every repair we complete reflects our commitment to excellence and durability.
            </p>
          </div>

          {/* Value 2 */}
          <div className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2">
            <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-500 group-hover:text-black transition-colors duration-300">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Customer Trust</h3>
            <p className="text-gray-400 leading-relaxed">
              We believe in transparency, integrity, and building long-term relationships through reliable service.
            </p>
          </div>

          {/* Value 3 */}
          <div className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-2">
            <div className="bg-purple-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-500 group-hover:text-black transition-colors duration-300">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Innovation with Heritage</h3>
            <p className="text-gray-400 leading-relaxed">
              We embrace modern technology while honoring the rich legacy of radio craftsmanship that defines our roots.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-12 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white relative z-10">
            Want to Learn More About Our Products?
          </h2>
          <p className="text-gray-300 mb-10 text-lg max-w-xl mx-auto relative z-10">
            Explore our latest collection and rediscover the joy of sound with Vijay Radios.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 relative z-10"
          >
            Visit Shop
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
