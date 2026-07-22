import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router';
import { CheckCircle, Truck, Package, Clock } from 'lucide-react';
import { fetchMyOrders } from '../../feactures/order/orderSlice';
import { SERVER_URL } from '../../utils/axiosInstance';

export default function TrackOrder() {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchMyOrders(user._id));
    }
  }, [dispatch, user]);

  const customerName = user?.user_name || user?.name || 'Customer';

  // Function to simulate order status based on time passed
  const getOrderStatus = (orderDate) => {
    const now = new Date();
    const placed = new Date(orderDate);
    const diffHours = Math.abs(now - placed) / 36e5;
    
    // Simulating progress based on time
    if (diffHours < 24) return 1; // Order Placed
    if (diffHours < 48) return 2; // Processing
    if (diffHours < 72) return 3; // Shipped
    return 4; // Delivered
  };

  const getEstimatedDelivery = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 5); // Assume 5 days delivery
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#0a0f16] text-white pt-36 pb-16 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Track Your Order
          </h2>
          <p className="text-xl text-gray-300">
            Hello, <span className="text-white font-bold">{customerName}</span>! Here is the live status of your purchases.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-gray-800/40 backdrop-blur-sm p-12 rounded-3xl text-center border border-gray-700/50 shadow-2xl">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <h3 className="text-2xl font-bold mb-4 text-gray-200">No active orders</h3>
            <p className="text-gray-400 text-lg mb-8">You don't have any orders to track right now.</p>
            <NavLink to="/shop" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-lg transition shadow-lg">
              Start Shopping
            </NavLink>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const currentStep = getOrderStatus(order.createdAt);
              
              return (
                <div key={order._id} className="bg-gray-800/40 backdrop-blur-sm p-6 md:p-10 rounded-3xl border border-gray-700/50 shadow-xl">
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-700/50 pb-6">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Tracking ID</p>
                      <p className="text-xl font-mono text-cyan-400 font-bold bg-cyan-500/10 px-3 py-1 rounded inline-block border border-cyan-500/20">{order._id}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-left md:text-right">
                      <p className="text-sm text-gray-400 mb-1">Expected Delivery</p>
                      <p className="text-lg font-bold text-green-400">{getEstimatedDelivery(order.createdAt)}</p>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="relative py-8">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-in-out" 
                        style={{ width: `${(Math.max(1, currentStep) - 1) / 3 * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="relative flex justify-between items-center text-xs md:text-sm lg:text-base font-semibold">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 z-10 transition-colors ${currentStep >= 1 ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-gray-800 text-gray-500 border-2 border-gray-700'}`}>
                          <Package className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className={currentStep >= 1 ? 'text-cyan-400 text-center' : 'text-gray-500 text-center'}>Order<br className="md:hidden" /> Placed</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 z-10 transition-colors ${currentStep >= 2 ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-gray-800 text-gray-500 border-2 border-gray-700'}`}>
                          <Clock className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className={currentStep >= 2 ? 'text-cyan-400 text-center' : 'text-gray-500 text-center'}>Processing</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 z-10 transition-colors ${currentStep >= 3 ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-gray-800 text-gray-500 border-2 border-gray-700'}`}>
                          <Truck className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className={currentStep >= 3 ? 'text-cyan-400 text-center' : 'text-gray-500 text-center'}>Shipped</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 z-10 transition-colors ${currentStep >= 4 ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-gray-800 text-gray-500 border-2 border-gray-700'}`}>
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className={currentStep >= 4 ? 'text-green-400 text-center' : 'text-gray-500 text-center'}>Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Preview Items */}
                  <div className="mt-10 pt-6 border-t border-gray-700/50">
                    <h4 className="text-gray-300 font-medium mb-4">Items in this shipment</h4>
                    <div className="flex flex-wrap gap-4">
                      {order.items.map((item) => {
                        const itemImage = item.image || item.productId?.images?.[0];
                        return (
                        <div key={item._id} className="flex items-center gap-3 bg-gray-900/60 p-3 rounded-xl border border-gray-700/50 flex-grow max-w-[280px]">
                          <div className="bg-white rounded-lg p-1 w-12 h-12 flex-shrink-0">
                            {itemImage ? (
                              <img 
                                src={itemImage.startsWith('http') ? itemImage : `${SERVER_URL}${itemImage}`} 
                                alt={item.name} 
                                className="w-full h-full object-contain" 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-[10px] text-center rounded-md">No Image</div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-200 line-clamp-1" title={item.name}>{item.name}</p>
                            <p className="text-xs text-cyan-400">Qty: {item.qty}</p>
                          </div>
                        </div>
                      )})}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
