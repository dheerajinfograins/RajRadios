import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOrders, updateOrderStatus, resetOrderStatus } from "../../feactures/order/orderSlice";
import { SERVER_URL } from "../../utils/axiosInstance";
import { Loader2, Package, Mail, Phone, MapPin, X, Eye, Search } from "lucide-react";

const OrdersManager = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, success } = useSelector((state) => state.order);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(resetOrderStatus());
      // Update selected order with new status if modal is open
      if (selectedOrder) {
        const updated = orders.find(o => o._id === selectedOrder._id);
        if (updated) setSelectedOrder(updated);
      }
    }
  }, [success, dispatch, orders, selectedOrder]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredOrders = orders.filter(order => {
    const query = searchQuery.toLowerCase();
    const idMatch = order._id?.toLowerCase().includes(query);
    const nameMatch = order.user_name?.toLowerCase().includes(query);
    const itemMatch = order.items?.some(item => item.name?.toLowerCase().includes(query));
    return idMatch || nameMatch || itemMatch;
  });

  let tableContent;
  if (orders.length === 0) {
    tableContent = (
      <tr>
        <td colSpan="6" className="p-8 text-center text-gray-500">
          No orders found yet.
        </td>
      </tr>
    );
  } else if (filteredOrders.length === 0) {
    tableContent = (
      <tr>
        <td colSpan="6" className="p-8 text-center text-gray-500">
          No orders matched your search.
        </td>
      </tr>
    );
  } else {
    tableContent = filteredOrders.map(order => (
      <tr key={order._id} className="hover:bg-gray-50 align-middle transition-colors">
        <td className="p-4">
          <p className="font-mono text-sm font-semibold text-gray-700">#{order._id.slice(-8)}</p>
        </td>
        <td className="p-4">
          <p className="font-semibold text-gray-800">{order.user_name}</p>
        </td>
        <td className="p-4">
          <div className="space-y-1">
            {order.items?.map((item, idx) => (
              <p key={item._id || item.productId || idx} className="text-sm text-gray-600 line-clamp-1 flex items-center gap-2" title={item.name}>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                {item.name}
              </p>
            ))}
          </div>
        </td>
        <td className="p-4">
          <p className="font-bold text-gray-800">₹{order.total}</p>
        </td>
        <td className="p-4 text-center">
          <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </td>
        <td className="p-4 text-right">
          <button
            onClick={() => setSelectedOrder(order)}
            className="inline-flex items-center justify-center gap-1.5 text-sm text-blue-600 font-semibold hover:text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-all border border-blue-200 hover:border-transparent shadow-sm"
          >
            <Eye size={16} /> View
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Orders</h2>
        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Search by ID, Name or Product..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg border border-red-100">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading && orders.length === 0 ? (
          <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-orange-500" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap">Order ID</th>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap">Customer Name</th>
                  <th className="p-4 font-semibold text-gray-600 min-w-[200px]">Product(s)</th>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap">Amount</th>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap text-center">Status</th>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tableContent}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Order Details</h3>
                <p className="text-sm text-gray-500 mt-1 font-mono">ID: {selectedOrder._id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Customer Info */}
                <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2"><MapPin size={18}/> Shipping Address</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="font-semibold text-gray-900 text-lg">{selectedOrder.user_name}</p>
                    <p className="flex items-center gap-2"><Mail size={16} className="text-blue-400"/> {selectedOrder.email}</p>
                    <p className="flex items-center gap-2"><Phone size={16} className="text-blue-400"/> {selectedOrder.mobile}</p>
                    <p className="pt-2 mt-2 border-t border-blue-100/50 leading-relaxed">
                      {selectedOrder.address}<br/>
                      {selectedOrder.city}, {selectedOrder.state}<br/>
                      ZIP: {selectedOrder.zip}
                    </p>
                  </div>
                </div>

                {/* Order Summary & Status Update */}
                <div className="bg-orange-50/50 p-5 rounded-xl border border-orange-100 flex flex-col h-full">
                  <h4 className="font-bold text-orange-900 mb-4 flex items-center gap-2"><Package size={18}/> Order Summary</h4>
                  <div className="space-y-3 text-sm text-gray-700 flex-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date Placed</span>
                      <span className="font-medium">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Method</span>
                      <span className="font-medium uppercase">{selectedOrder.payment || 'cod'}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-orange-100/50">
                      <span className="text-gray-500">Current Status</span>
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>

                  {/* Status Update Dropdown inside Modal */}
                  <div className="mt-4 pt-4 border-t border-orange-200">
                    <label htmlFor="update-status" className="text-[10px] uppercase font-bold text-orange-800 tracking-wider mb-1.5 block">Update Status</label>
                    <div className="flex gap-2">
                      <select 
                        id="update-status"
                        value={selectedOrder.status}
                        onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                        disabled={loading}
                        className="w-full text-sm border border-orange-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-orange-500 bg-white shadow-sm disabled:opacity-50 text-gray-800"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {loading && <div className="flex items-center justify-center p-2"><Loader2 className="animate-spin text-orange-500" size={20} /></div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Products List */}
              <h4 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Purchased Items ({selectedOrder.items?.length})</h4>
              <div className="space-y-4">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={item._id || item.productId?._id || idx} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-20 w-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100 p-1">
                      {item.productId?.images && item.productId.images.length > 0 ? (
                        <img src={item.productId?.images?.[0]?.startsWith('http') ? item.productId.images[0] : `${SERVER_URL}${item.productId?.images?.[0] || ''}`} alt={item.name} className="h-full w-full object-contain mix-blend-multiply" />
                      ) : (
                        <Package size={32} className="text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800 text-lg">{item.name}</h5>
                      <p className="text-sm text-gray-500 mt-1">Product ID: {item.productId?._id || "N/A"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800 text-lg">₹{item.price}</p>
                      <p className="text-sm text-gray-500 mt-1">Qty: <span className="font-semibold text-gray-700">{item.qty}</span></p>
                      <p className="text-sm font-semibold text-orange-600 mt-1">₹{item.price * item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-end">
                <div className="w-full max-w-sm space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{selectedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium">₹{selectedOrder.shipping}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total Amount</span>
                    <span className="text-orange-600">₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManager;
