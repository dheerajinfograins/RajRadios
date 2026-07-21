import { Link } from "react-router";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../feactures/cart/cartSlice";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Quantity management
  const handleUpdateQuantity = (id, type) => {
    dispatch(updateQuantity({ id, type }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  // Subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-[#0a0f16] text-white min-h-screen font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative pt-36 pb-16 px-6 md:px-12 lg:px-20">
      
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>

      {/* Page Header */}
      <section className="relative z-10 text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Cart</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Review your selected products before proceeding to checkout.
        </p>
      </section>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="bg-gray-800/40 backdrop-blur-sm p-6 md:p-10 rounded-3xl border border-gray-700/50 shadow-2xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="text-cyan-400 border-b border-gray-700/50 text-sm uppercase tracking-wider">
                  <th className="py-4 px-4 font-semibold">Product</th>
                  <th className="py-4 px-4 font-semibold">Name</th>
                  <th className="py-4 px-4 text-center font-semibold">Price</th>
                  <th className="py-4 px-4 text-center font-semibold">Quantity</th>
                  <th className="py-4 px-4 text-center font-semibold">Total</th>
                  <th className="py-4 px-4 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-700/30 hover:bg-gray-700/20 transition duration-300"
                  >
                    <td className="py-6 px-4">
                      <div className="relative group rounded-xl overflow-hidden w-20 h-20 border border-gray-700/50 shadow-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                        />
                      </div>
                    </td>
                    <td className="py-6 px-4 font-medium text-lg">{item.name}</td>
                    <td className="py-6 px-4 text-center text-gray-300">₹{item.price}</td>
                    <td className="py-6 px-4 text-center">
                      <div className="inline-flex justify-center items-center bg-gray-900/50 rounded-full border border-gray-700/50 p-1">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, "dec")}
                          className="bg-gray-800 hover:bg-cyan-500 hover:text-black text-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, "inc")}
                          className="bg-gray-800 hover:bg-cyan-500 hover:text-black text-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="py-6 px-4 text-center font-semibold text-cyan-400">
                      ₹{item.price * item.quantity}
                    </td>
                    <td className="py-6 px-4 text-center">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-500/10"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Subtotal Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-gray-700/50">
              <p className="text-xl text-gray-300 mb-6 md:mb-0">
                Subtotal:{" "}
                <span className="text-cyan-400 font-bold text-3xl ml-2">₹{subtotal}</span>
              </p>
              <Link
                to="/checkout"
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 text-center py-32 max-w-lg mx-auto bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl">
          <div className="w-24 h-24 bg-gray-900/80 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700">
            <ShoppingCart className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-3xl text-gray-300 font-bold mb-4">Your cart is empty</h2>
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
