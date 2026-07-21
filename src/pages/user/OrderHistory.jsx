import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';

const getPaymentMethod = (payment) => {
  if (payment === 'upi') return 'UPI';
  if (payment === 'cod') return 'COD';
  return 'Card';
};

export default function OrderHistory() {
  const { orders } = useSelector((state) => state.order);

  return (
    <div className="min-h-screen bg-[#0a0f16] text-white pt-36 pb-16 px-6 md:px-12 lg:px-20 relative">
      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Order History
        </h2>

        {orders.length === 0 ? (
          <div className="bg-gray-800/40 backdrop-blur-sm p-12 rounded-3xl text-center border border-gray-700/50 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-200">No Orders Yet</h3>
            <p className="text-gray-400 text-lg mb-8">You haven't placed any orders. Start exploring our products!</p>
            <NavLink to="/shop" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-lg transition shadow-lg">
              Go to Shop
            </NavLink>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-800/40 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-gray-700/50 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-700/50 pb-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">
                      Order ID: <span className="font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{order.id}</span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Placed on: {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 text-left md:text-right">
                    <p className="text-xl font-bold text-white mb-1">Total: <span className="text-cyan-400">₹{order.total}</span></p>
                    <p className="text-xs text-green-400 font-semibold bg-green-500/10 px-3 py-1 rounded-full inline-block border border-green-500/20 uppercase tracking-wide">
                      Paid via {getPaymentMethod(order.paymentDetails?.payment)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-2xl border border-gray-700/30">
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-600/30 bg-white">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-gray-100 text-lg">{item.name}</p>
                        <p className="text-sm text-gray-400 mt-1">Qty: {item.quantity} × <span className="text-cyan-400 font-medium">₹{item.price}</span></p>
                      </div>
                      <p className="font-bold text-white text-lg">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-end">
                  <NavLink to="/track-order" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold hover:underline">
                    Track this order &rarr;
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
