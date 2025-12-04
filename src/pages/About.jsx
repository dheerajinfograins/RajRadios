export default function About() {
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white min-h-screen py-16 px-6 md:px-20">
      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4">
          About <span className="text-cyan-400">Vijay Radios</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Celebrating decades of sound innovation and trusted service.  
          We combine craftsmanship, technology, and passion to keep your world connected through sound.
        </p>
      </section>

      {/* Brand Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-cyan-400">Our Story</h2>
          <p className="text-gray-300 leading-relaxed">
            Founded in 1990, <span className="text-cyan-400 font-semibold">Vijay Radios</span> started as a small repair shop dedicated to restoring vintage radios.  
            Over the years, we’ve evolved into a trusted brand offering high-quality radios, modern sound systems, and professional repair services.  
            Our mission is simple — to bring back the soul of music and the nostalgia of sound, powered by modern innovation.
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src="images/ASpeaker1.jpg"
            alt="Our Story"
            className="rounded-2xl shadow-2xl border border-gray-700 w-80 md:w-[400px]"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-900 bg-opacity-60 p-10 rounded-2xl shadow-lg mb-16">
        <h2 className="text-3xl font-semibold mb-4 text-center text-cyan-400">Our Mission</h2>
        <p className="text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">
          At Vijay Radios, our mission is to preserve the timeless joy of radio listening while embracing the future of sound.  
          We aim to deliver products that inspire confidence, repair services that restore memories, and innovation that connects generations.
        </p>
      </section>

      {/* Core Values */}
      <section>
        <h2 className="text-3xl font-semibold text-center text-cyan-400 mb-10">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Value 1 */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition duration-300">
            <h3 className="text-xl font-semibold mb-3 text-white">Quality & Precision</h3>
            <p className="text-gray-400">
              Every product we create and every repair we complete reflects our commitment to excellence and durability.
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition duration-300">
            <h3 className="text-xl font-semibold mb-3 text-white">Customer Trust</h3>
            <p className="text-gray-400">
              We believe in transparency, integrity, and building long-term relationships through reliable service.
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition duration-300">
            <h3 className="text-xl font-semibold mb-3 text-white">Innovation with Heritage</h3>
            <p className="text-gray-400">
              We embrace modern technology while honoring the rich legacy of radio craftsmanship that defines our roots.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">
          Want to Learn More About Our Products?
        </h2>
        <p className="text-gray-400 mb-6">
          Explore our latest collection and rediscover the joy of sound with Vijay Radios.
        </p>
        <a
          href="/shop"
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
        >
          Visit Shop
        </a>
      </section>
    </div>
  );
}
