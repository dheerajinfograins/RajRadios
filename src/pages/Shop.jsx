import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../feactures/cart/cartSlice";
import { toggleWishlist } from "../feactures/wishlist/wishlistSlice";

export default function Shop() {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [products] = useState([
    {
      id: 1,
      name: "Vintage Classic Radio",
      price: 2500,
      image: "https://img.freepik.com/free-photo/vintage-radio-dark-background_155003-33811.jpg",
    },
    {
      id: 2,
      name: "Bluetooth Speaker Pro",
      price: 3200,
      image: "https://img.freepik.com/free-photo/music-speaker-modern-sound-equipment-close-up_169016-19426.jpg",
    },
    {
      id: 3,
      name: "Digital FM Radio",
      price: 2800,
      image: "https://img.freepik.com/free-photo/modern-digital-radio-black-table_155003-33810.jpg",
    },
    {
      id: 4,
      name: "Portable Tape Recorder",
      price: 3500,
      image: "https://img.freepik.com/free-photo/retro-cassette-recorder-dark-background_155003-33808.jpg",
    },
    {
      id: 5,
      name: "Smart Home Audio",
      price: 5400,
      image: "https://img.freepik.com/free-photo/modern-home-speakers-dark-background_155003-33813.jpg",
    },
    {
      id: 6,
      name: "Wireless Mini Radio",
      price: 1900,
      image: "https://img.freepik.com/free-photo/retro-radio-table-dark-background_155003-33807.jpg",
    },
    {
      id: 7,
      name: "Studio Headset",
      price: 4500,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 8,
      name: "Retro Boombox",
      price: 6800,
      image: "https://images.unsplash.com/photo-1596720426673-e4e14290f19c?q=80&w=1974&auto=format&fit=crop",
    }
  ]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleWishlist = (product) => {
    dispatch(toggleWishlist(product));
  };

  const isWishlisted = (id) => wishlistItems.some((item) => item.id === id);

  return (
    <div className="bg-[#0a0f16] text-white min-h-screen font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative py-16 px-6 md:px-12 lg:px-20">
      
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>

      {/* Page Header */}
      <section className="relative z-10 text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Products</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore our premium collection of vintage radios and cutting-edge audio equipment, crafted for true audiophiles.
        </p>
      </section>

      {/* Product Grid */}
      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
          >
            {/* Image Section */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              {/* Wishlist Button */}
              <button 
                onClick={() => handleWishlist(product)}
                className="absolute top-4 right-4 p-2.5 bg-gray-900/60 backdrop-blur-md rounded-full text-gray-300 hover:text-red-500 hover:bg-gray-900 border border-transparent hover:border-red-500/50 transition-all duration-300 z-10 shadow-lg"
              >
                <Heart className={`w-5 h-5 transition-colors ${isWishlisted(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2 text-gray-100 group-hover:text-cyan-400 transition-colors">
                  {product.name}
                </h2>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700/50">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-extrabold text-2xl">
                  ₹{product.price}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-3 bg-gray-900/80 border border-gray-700/50 rounded-full text-cyan-400 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 shadow-lg transition-all duration-300 transform hover:scale-110"
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
