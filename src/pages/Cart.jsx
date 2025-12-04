import { useState } from "react";

export default function Cart() {
  // Example cart data (replace later with dynamic state or context)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Vintage Radio",
      price: 2500,
      quantity: 1,
      image: "https://img.freepik.com/free-photo/vintage-radio-dark-background_155003-33811.jpg",
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      price: 3200,
      quantity: 2,
      image: "https://img.freepik.com/free-photo/music-speaker-modern-sound-equipment-close-up_169016-19426.jpg",
    },
  ]);

  // Quantity management
  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: type === "inc" ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const removeItem = (id) => setCartItems(cartItems.filter((item) => item.id !== id));

  // Subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white min-h-screen py-16 px-6 md:px-20">
      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4">
          Your <span className="text-cyan-400">Cart</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Review your selected products before checkout.
        </p>
      </section>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        <div className="overflow-x-auto bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-cyan-400 border-b border-gray-700 text-sm uppercase">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4 text-center">Price</th>
                <th className="py-3 px-4 text-center">Quantity</th>
                <th className="py-3 px-4 text-center">Total</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-800 hover:bg-gray-800 transition duration-300"
                >
                  <td className="py-4 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-700"
                    />
                  </td>
                  <td className="py-4 px-4">{item.name}</td>
                  <td className="py-4 px-4 text-center">₹{item.price}</td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, "dec")}
                        className="bg-gray-700 hover:bg-gray-600 text-white rounded-full w-8 h-8"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, "inc")}
                        className="bg-gray-700 hover:bg-gray-600 text-white rounded-full w-8 h-8"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    ₹{item.price * item.quantity}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-300 font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Subtotal Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8">
            <p className="text-lg">
              Subtotal:{" "}
              <span className="text-cyan-400 font-semibold">₹{subtotal}</span>
            </p>
            <a
              href="/checkout"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300 mt-6 md:mt-0"
            >
              Proceed to Checkout
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl text-gray-400 mb-4">Your cart is empty 🛒</h2>
          <a
            href="/shop"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
          >
            Continue Shopping
          </a>
        </div>
      )}
    </div>
  );
}
