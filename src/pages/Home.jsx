export default function Home() {
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Welcome to <span className="text-cyan-400">Vijay Radios</span>
          </h1>
          <p className="text-gray-400 mb-6 text-lg">
            Explore premium radios, modern electronics, and reliable repair services — all crafted with innovation and precision since 2015.
          </p>
          <a
            href="/shop"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
          >
            Shop Now
          </a>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="images/Speaker1.jpg"
            alt="Vintage Radio"
            className="rounded-2xl shadow-2xl w-80 md:w-96 border border-gray-700"
          />
        </div>
      </section>

      {/* Featured Products / Services */}
      <section className="py-16 px-10 md:px-20 bg-gray-950 bg-opacity-50">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-12">
          Our Featured Offerings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition duration-300">
            <img
              src="images/HomeTheaterSpeaker.jpg"
              alt="Retro Radios"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2 text-white">
              Home Theater Speaker
            </h3>
            <p className="text-gray-400 text-sm">
              Discover timeless designs with the perfect blend of nostalgia and crystal-clear sound.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition duration-300">
            <img
              src="images/RepairSpeaker.jpg"
              alt="Electronics Repair"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2 text-white">
              Repair Services
            </h3>
            <p className="text-gray-400 text-sm">
              Expert repairs for all types of radios, amplifiers, and audio equipment by professionals.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition duration-300">
            <img
              src="images/NewSpeaker1.jpg"
              alt="Modern Tech"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2 text-white">
              Modern Audio
            </h3>
            <p className="text-gray-400 text-sm">
              Experience cutting-edge sound systems with premium components and unmatched performance.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 px-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black">
        <h2 className="text-3xl font-bold mb-4">
          Need Your Radio Repaired Fast?
        </h2>
        <p className="text-gray-400 mb-6">
          Visit our repair center today or book an appointment online.
        </p>
        <a
          href="/repairservice"
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
        >
          Book Repair
        </a>
      </section>
    </div>
  );
}
