import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRepairs, updateRepairStatusAdmin } from "../../feactures/admin/adminSlice";
import { Loader2, Mail, Phone, Wrench, Calendar, CheckCircle2, XCircle, Clock, Timer, Eye, X, Search } from "lucide-react";

const RepairsManager = () => {
  const dispatch = useDispatch();
  const { repairs, loading, error } = useSelector((state) => state.admin);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllRepairs());
  }, [dispatch]);

  const handleUpdateStatus = (status) => {
    if (selectedRepair) {
      dispatch(updateRepairStatusAdmin({ id: selectedRepair._id, status }))
        .unwrap()
        .then((updatedRepair) => {
          setSelectedRepair(updatedRepair);
        })
        .catch(err => alert("Failed to update status: " + err));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="flex items-center justify-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-[11px] font-bold uppercase w-max"><CheckCircle2 size={12} /> Completed</span>;
      case 'in-progress':
        return <span className="flex items-center justify-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-[11px] font-bold uppercase w-max"><Timer size={12} /> In Progress</span>;
      case 'cancelled':
        return <span className="flex items-center justify-center gap-1 px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-[11px] font-bold uppercase w-max"><XCircle size={12} /> Cancelled</span>;
      default:
        return <span className="flex items-center justify-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[11px] font-bold uppercase w-max"><Clock size={12} /> Pending</span>;
    }
  };

  const filteredRepairs = repairs?.filter(repair => {
    const query = searchQuery.toLowerCase();
    const idMatch = repair._id?.toLowerCase().includes(query);
    const nameMatch = repair.user_name?.toLowerCase().includes(query);
    const productMatch = repair.product_type?.toLowerCase().includes(query);
    const emailMatch = repair.email?.toLowerCase().includes(query);
    return idMatch || nameMatch || productMatch || emailMatch;
  });

  let tableContent;
  if (!repairs || repairs.length === 0) {
    tableContent = (
      <tr>
        <td colSpan="4" className="p-8 text-center text-gray-500">
          No repair requests found.
        </td>
      </tr>
    );
  } else if (!filteredRepairs || filteredRepairs.length === 0) {
    tableContent = (
      <tr>
        <td colSpan="4" className="p-8 text-center text-gray-500">
          No repair requests matched your search.
        </td>
      </tr>
    );
  } else {
    tableContent = filteredRepairs.map(repair => (
      <tr key={repair._id} className="hover:bg-gray-50 align-middle transition-colors">
        <td className="p-4">
          <div>
            <p className="font-semibold text-gray-800">{repair.user_name}</p>
            <p className="text-xs text-gray-500 font-mono mt-0.5">ID: {repair._id.slice(-8)}</p>
          </div>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Wrench size={16} className="text-orange-500" />
            <span className="font-medium">{repair.product_type}</span>
          </div>
        </td>
        <td className="p-4">
          <div className="flex justify-center">
            {getStatusBadge(repair.status)}
          </div>
        </td>
        <td className="p-4 text-right">
          <button
            onClick={() => setSelectedRepair(repair)}
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
        <h2 className="text-2xl font-bold text-gray-800">Manage Repairs</h2>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-3">
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
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-600 border border-gray-100 flex-shrink-0 w-full sm:w-auto text-center">
            Total Repairs: <span className="text-orange-600 font-bold">{repairs?.length || 0}</span>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg border border-red-100">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading && (!repairs || repairs.length === 0) ? (
          <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-orange-500" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap">Customer</th>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap">Product</th>
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

      {/* View Details Modal */}
      {selectedRepair && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                Repair Details
              </h3>
              <button 
                onClick={() => setSelectedRepair(null)}
                className="p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div className="space-y-2 flex-1">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">{selectedRepair.user_name}</h4>
                    <p className="text-sm text-gray-500 font-mono">Repair ID: {selectedRepair._id}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                   {getStatusBadge(selectedRepair.status)}
                   <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar size={14} /> {new Date(selectedRepair.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                   </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3 h-full">
                    <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Contact Info</h5>
                    <p className="text-sm text-gray-700 flex items-center gap-3"><Mail size={16} className="text-blue-500"/> {selectedRepair.email}</p>
                    <p className="text-sm text-gray-700 flex items-center gap-3"><Phone size={16} className="text-green-500"/> {selectedRepair.mobile}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3 h-full">
                    <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Product Info</h5>
                    <div className="text-sm text-gray-700 flex items-center gap-3">
                      <Wrench size={16} className="text-orange-500"/>
                      <span className="font-medium text-lg">{selectedRepair.product_type}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
                    <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Issue Description</h5>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-white p-3 rounded-lg border border-gray-200 min-h-[80px]">
                      {selectedRepair.describation || <span className="italic text-gray-400">No description provided</span>}
                    </p>
                  </div>
              </div>

              {/* Actions Section */}
              <div className="bg-orange-50/50 rounded-xl p-5 border border-orange-100">
                <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Update Status</h5>
                <div className="flex flex-wrap gap-3">
                  {selectedRepair.status !== 'pending' && (
                    <button 
                      onClick={() => handleUpdateStatus('pending')}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <Clock size={16} /> Mark Pending
                    </button>
                  )}
                  {selectedRepair.status !== 'in-progress' && (
                    <button 
                      onClick={() => handleUpdateStatus('in-progress')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <Timer size={16} /> Mark In-Progress
                    </button>
                  )}
                  {selectedRepair.status !== 'completed' && (
                    <button 
                      onClick={() => handleUpdateStatus('completed')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <CheckCircle2 size={16} /> Mark Completed
                    </button>
                  )}
                  {selectedRepair.status !== 'cancelled' && (
                    <button 
                      onClick={() => {
                        if(window.confirm("Are you sure you want to cancel this repair request?")) {
                          handleUpdateStatus('cancelled');
                        }
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <XCircle size={16} /> Cancel Repair
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepairsManager;
