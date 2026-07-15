import { Link } from "react-router";
import { Trash2, Heart, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../feactures/wishlist/wishlistSlice";
import { addToCart } from "../feactures/cart/cartSlice";

export default function Wishlist() {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const removeItem = (item) => {
    dispatch(toggleWishlist(item));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-[#0a0f16] text-white min-h-screen font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative py-16 px-6 md:px-12 lg:px-20">
      
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>

      {/* Page Header */}
      <section className="relative z-10 text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Wishlist</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Review your favorite products.
        </p>
      </section>

      {/* Wishlist Items */}
      {wishlistItems && wishlistItems.length > 0 ? (
        <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((product) => (
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
                <button 
                  onClick={() => removeItem(product)}
                  className="absolute top-4 right-4 p-2.5 bg-gray-900/60 backdrop-blur-md rounded-full text-red-500 hover:text-white hover:bg-red-500 border border-transparent transition-all duration-300 z-10 shadow-lg"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-5 h-5" />
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
      ) : (
        <div className="relative z-10 text-center py-32 max-w-lg mx-auto bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl">
          <div className="w-24 h-24 bg-gray-900/80 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700">
            <Heart className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-3xl text-gray-300 font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black text-cyan-400 font-semibold px-8 py-4 rounded-full transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
