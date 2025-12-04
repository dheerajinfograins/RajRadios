import { useState } from "react";

export default function Shop() {
  const [products] = useState([
    {
      id: 1,
      name: "Vintage Classic Radio",
      price: 2500,
      image:
        "https://img.freepik.com/free-photo/vintage-radio-dark-background_155003-33811.jpg",
    },
    {
      id: 2,
      name: "Bluetooth Speaker Pro",
      price: 3200,
      image:
        "https://img.freepik.com/free-photo/music-speaker-modern-sound-equipment-close-up_169016-19426.jpg",
    },
    {
      id: 3,
      name: "Digital FM Radio",
      price: 2800,
      image:
        "https://img.freepik.com/free-photo/modern-digital-radio-black-table_155003-33810.jpg",
    },
    {
      id: 4,
      name: "Portable Tape Recorder",
      price: 3500,
      image:
        "https://img.freepik.com/free-photo/retro-cassette-recorder-dark-background_155003-33808.jpg",
    },
    {
      id: 5,
      name: "Smart Home Audio System",
      price: 5400,
      image:
        "https://img.freepik.com/free-photo/modern-home-speakers-dark-background_155003-33813.jpg",
    },
    {
      id: 6,
      name: "Wireless Mini Radio",
      price: 1900,
      image:
        "https://img.freepik.com/free-photo/retro-radio-table-dark-background_155003-33807.jpg",
    },
  ]);

  const addToCart = (productName) => {
    alert(`🛒 ${productName} added to cart!`);
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white min-h-screen py-16 px-6 md:px-20">
      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4">
          Our <span className="text-cyan-400">Products</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Explore our latest collection of radios and audio equipment.
        </p>
      </section>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-cyan-500/20 transition duration-300"
          >
            <div className="relative group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex justify-center items-end pb-4">
                <button
                  onClick={() => addToCart(product.name)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-2 rounded-full shadow-lg transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="p-5 text-center">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-cyan-400 font-bold text-lg">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
