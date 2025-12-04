import { useState } from "react";
import { useParams } from "react-router";

export default function ProductDetails() {
  const { id } = useParams();

  // Example product data (you can later fetch by ID)
  const product = {
    id,
    name: "Vintage Classic Radio",
    price: 2500,
    description:
      "Experience nostalgia with this beautifully restored vintage radio. Designed with modern audio clarity while maintaining its old-school charm.",
    image:
      "https://img.freepik.com/free-photo/vintage-radio-dark-background_155003-33811.jpg",
    specs: {
      Brand: "Vijay Radios",
      Type: "Analog AM/FM",
      Power: "AC/DC Compatible",
      Material: "Polished Wood + Brass Finish",
      Warranty: "6 Months",
    },
  };

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    alert(`🛒 Added ${quantity} × ${product.name} to cart!`);
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white min-h-screen py-16 px-6 md:px-20">
      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4">
          Product <span className="text-cyan-400">Details</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Get the full specifications and purchase information for our products.
        </p>
      </section>

      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-12 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-2xl shadow-lg w-full max-w-md object-cover border border-gray-700 hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-cyan-400 font-semibold text-2xl mb-6">
            ₹{product.price}
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Specifications */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-6">
            <h3 className="text-xl font-semibold mb-3 text-cyan-400">
              Specifications
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span className="font-semibold text-gray-300">{key}</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6 space-x-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-full w-8 h-8"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-full w-8 h-8"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-20">
        <h3 className="text-3xl font-bold text-center mb-10 text-cyan-400">
          Related Products
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
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
          ].map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="p-4 text-center">
                <h4 className="text-lg font-semibold mb-1">{item.name}</h4>
                <p className="text-cyan-400 font-bold">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
