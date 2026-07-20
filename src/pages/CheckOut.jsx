import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearCart } from "../feactures/cart/cartSlice";
import { addOrder } from "../feactures/order/orderSlice";
import { QrCode, CheckCircle } from "lucide-react";

export default function Checkout() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    payment: "upi",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });

  const [showQR, setShowQR] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 200 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (formData.payment === "upi") {
      setShowQR(true);
    } else {
      alert("✅ Order placed successfully!");
      dispatch(addOrder({ items: cartItems, total, shipping, subtotal, paymentDetails: formData }));
      dispatch(clearCart());
      navigate("/");
    }
  };

  const handlePaymentDone = () => {
    alert("✅ Payment Verified & Order placed successfully!");
    setShowQR(false);
    dispatch(addOrder({ items: cartItems, total, shipping, subtotal, paymentDetails: formData }));
    dispatch(clearCart());
    navigate("/");
  };

  const upiId = "9694735281@paytm"; 
  const upiName = "Vijay Radios";
  const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${total}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUri)}`;

  return (
    <div className="bg-[#0a0f16] text-white min-h-screen font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative pt-36 pb-16 px-6 md:px-12 lg:px-20">
      
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 pointer-events-none"></div>

      {/* Page Header */}
      <section className="relative z-10 text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Checkout <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Now</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Fill in your details to complete your order securely.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative z-10"
      >
        {/* Billing Details */}
        <div className="bg-gray-800/40 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-gray-700/50 shadow-2xl">
          <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Billing Details
          </h2>
          <div className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors placeholder-gray-500 text-white"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors placeholder-gray-500 text-white"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors placeholder-gray-500 text-white"
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full Address"
              required
              rows="3"
              className="w-full bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors placeholder-gray-500 text-white resize-none"
            ></textarea>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors placeholder-gray-500 text-white"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
                className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors placeholder-gray-500 text-white"
              />
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="ZIP"
                required
                className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors placeholder-gray-500 text-white"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800/40 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-gray-700/50 shadow-2xl flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Order Summary
          </h2>
          
          <div className="flex-grow space-y-4 mb-8 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-900/50 p-4 rounded-xl border border-gray-700/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-600/50">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-100">{item.name}</p>
                      <p className="text-sm text-cyan-400 font-medium">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-lg text-white">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8 bg-gray-900/30 rounded-xl border border-gray-700/30">Your cart is empty.</p>
            )}
          </div>
          
          <div className="space-y-4 pt-6 border-t border-gray-700/50">
            <div className="flex justify-between text-gray-300">
              <p>Subtotal</p>
              <p className="font-semibold">₹{subtotal}</p>
            </div>
            <div className="flex justify-between text-gray-300">
              <p>Shipping</p>
              <p className="font-semibold">₹{shipping}</p>
            </div>
            <div className="flex justify-between items-end pt-4">
              <p className="font-bold text-xl text-white">Total</p>
              <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-3xl">₹{total}</p>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mt-8 pt-8 border-t border-gray-700/50">
            <h3 className="text-xl font-bold mb-6 text-gray-100">
              Payment Method
            </h3>
            <div className="space-y-4 mb-8">
              <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${formData.payment === 'upi' ? 'bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-500/10' : 'bg-gray-900/50 border-gray-700/50 hover:border-gray-500'}`}>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={formData.payment === "upi"}
                  onChange={handleChange}
                  className="w-5 h-5 text-cyan-500 bg-gray-800 border-gray-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="font-semibold text-gray-200">UPI / QR Code</span>
              </label>
              <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${formData.payment === 'card' ? 'bg-cyan-500/5 border-cyan-500 shadow-lg shadow-cyan-500/10' : 'bg-gray-900/50 border-gray-700/50 hover:border-gray-500'}`}>
                <label className="flex items-center gap-4 p-4 cursor-pointer w-full">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.payment === "card"}
                    onChange={handleChange}
                    className="w-5 h-5 text-cyan-500 bg-gray-800 border-gray-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="font-semibold text-gray-200">Credit / Debit Card</span>
                </label>
                
                {formData.payment === 'card' && (
                  <div className="p-4 pt-0 mt-2 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="Card Number"
                      required={formData.payment === "card"}
                      maxLength="16"
                      className="w-full bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors placeholder-gray-500 text-white"
                    />
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="Card Holder Name"
                      required={formData.payment === "card"}
                      className="w-full bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors placeholder-gray-500 text-white"
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required={formData.payment === "card"}
                        maxLength="5"
                        className="w-1/2 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors placeholder-gray-500 text-white"
                      />
                      <input
                        type="password"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        placeholder="CVV"
                        required={formData.payment === "card"}
                        maxLength="3"
                        className="w-1/2 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-colors placeholder-gray-500 text-white"
                      />
                    </div>
                  </div>
                )}
              </div>
              <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${formData.payment === 'cod' ? 'bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-500/10' : 'bg-gray-900/50 border-gray-700/50 hover:border-gray-500'}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={formData.payment === "cod"}
                  onChange={handleChange}
                  className="w-5 h-5 text-cyan-500 bg-gray-800 border-gray-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="font-semibold text-gray-200">Cash on Delivery</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={cartItems.length === 0}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
            >
              {formData.payment === "upi" ? <QrCode className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
              {formData.payment === "upi" ? "Pay via UPI" : "Place Order"}
            </button>
          </div>
        </div>
      </form>

      {/* UPI QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gray-900/90 border border-gray-700/50 p-8 md:p-10 rounded-3xl shadow-2xl max-w-md w-full text-center relative transform transition-all">
            <button 
              onClick={() => setShowQR(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full hover:bg-red-500"
            >
              ✖
            </button>
            <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                <QrCode className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Scan & Pay</h2>
            <p className="text-gray-400 mb-8">Scan this QR code with any UPI app (GPay, PhonePe, Paytm) to complete your payment.</p>
            
            <div className="bg-white p-6 rounded-2xl inline-block mb-8 shadow-xl shadow-cyan-500/20">
              <img src={qrUrl} alt="UPI QR Code" className="w-56 h-56 mx-auto" />
            </div>
            
            <div className="bg-gray-800/80 p-5 rounded-2xl mb-8 border border-gray-700/50">
              <p className="text-sm text-gray-400 mb-1 uppercase tracking-wider">UPI ID</p>
              <p className="font-mono text-xl text-gray-100 font-semibold">{upiId}</p>
              <p className="text-sm text-gray-400 mt-4 mb-1 uppercase tracking-wider">Amount to Pay</p>
              <p className="text-4xl text-cyan-400 font-extrabold">₹{total}</p>
            </div>

            <button
              onClick={handlePaymentDone}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1 text-lg"
            >
              I have made the payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
