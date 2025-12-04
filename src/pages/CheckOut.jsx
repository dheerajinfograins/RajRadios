import { useState } from "react";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    payment: "card",
  });

  const orderSummary = [
    { id: 1, name: "Vintage Radio", price: 2500, qty: 1 },
    { id: 2, name: "Bluetooth Speaker", price: 3200, qty: 2 },
  ];

  const subtotal = orderSummary.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const shipping = 200;
  const total = subtotal + shipping;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Order placed successfully!");
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white min-h-screen py-16 px-6 md:px-20">
      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4">
          Checkout <span className="text-cyan-400">Now</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Fill in your details to complete your order securely.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-10 bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800"
      >
        {/* Billing Details */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
            Billing Details
          </h2>
          <div className="space-y-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full Address"
              required
              rows="3"
              className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
            ></textarea>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="col-span-1 bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
                className="col-span-1 bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
              />
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="ZIP"
                required
                className="col-span-1 bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
            Order Summary
          </h2>
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
            {orderSummary.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-700 py-3"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    Qty: {item.qty} × ₹{item.price}
                  </p>
                </div>
                <p className="font-semibold text-cyan-400">
                  ₹{item.price * item.qty}
                </p>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <p className="text-gray-400">Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-gray-400">Shipping</p>
              <p>₹{shipping}</p>
            </div>
            <div className="flex justify-between mt-4 border-t border-gray-700 pt-3">
              <p className="font-bold text-lg">Total</p>
              <p className="font-bold text-cyan-400 text-lg">₹{total}</p>
            </div>
          </div>

          {/* Payment Section */}
          <h3 className="text-xl font-semibold mt-8 mb-4 text-cyan-400">
            Payment Method
          </h3>
          <div className="space-y-3">
            {/* <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={formData.payment === "card"}
                onChange={handleChange}
              />
              Credit / Debit Card
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={formData.payment === "upi"}
                onChange={handleChange}
              />
              UPI / Net Banking
            </label> */}
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={formData.payment === "cod"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-full shadow-lg transition duration-300"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
