import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, updateUserStatus } from "../../feactures/admin/adminSlice";
import { SERVER_URL } from "../../utils/axiosInstance";
import { Loader2, Mail, Phone, MapPin, UserCircle, Shield, CheckCircle2, XCircle, Eye, X, Search } from "lucide-react";

const UsersManager = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleUpdateStatus = (isActive, isDeleted) => {
    if (selectedUser) {
      dispatch(updateUserStatus({ id: selectedUser._id, isActive, isDeleted }))
        .unwrap()
        .then((updatedUser) => {
          setSelectedUser(updatedUser);
        })
        .catch(err => alert("Failed to update status: " + err));
    }
  };

  const getRoleBadge = (role) => {
    return role === "admin" 
      ? <span className="flex items-center justify-center gap-1 px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-[11px] font-bold uppercase w-max"><Shield size={12} /> Admin</span>
      : <span className="flex items-center justify-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-[11px] font-bold uppercase w-max"><UserCircle size={12} /> Customer</span>;
  };

  const getStatusBadge = (isActive, isDeleted) => {
    if (isDeleted) return <span className="flex items-center justify-center gap-1 px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-[11px] font-bold uppercase w-max"><XCircle size={12} /> Deleted</span>;
    if (isActive) return <span className="flex items-center justify-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-[11px] font-bold uppercase w-max"><CheckCircle2 size={12} /> Active</span>;
    return <span className="flex items-center justify-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[11px] font-bold uppercase w-max"><XCircle size={12} /> Blocked</span>;
  };

  const filteredUsers = users?.filter(user => {
    const query = searchQuery.toLowerCase();
    const idMatch = user._id?.toLowerCase().includes(query);
    const nameMatch = user.user_name?.toLowerCase().includes(query);
    const emailMatch = user.email?.toLowerCase().includes(query);
    return idMatch || nameMatch || emailMatch;
  }) || [];

  const renderTableBodyContent = () => {
    if (!users || users.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="p-8 text-center text-gray-500">
            No users found.
          </td>
        </tr>
      );
    }
    
    if (filteredUsers.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="p-8 text-center text-gray-500">
            No users matched your search.
          </td>
        </tr>
      );
    }

    return filteredUsers.map(user => (
      <tr key={user._id} className="hover:bg-gray-50 align-middle transition-colors">
        <td className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
              {user.photo ? (
                <img src={`${SERVER_URL}${user.photo}`} alt={user.user_name} className="h-full w-full rounded-full object-cover" />
              ) : (
                user.user_name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user.user_name}</p>
              <p className="text-xs text-gray-500 font-mono mt-0.5">ID: {user._id.slice(-8)}</p>
            </div>
          </div>
        </td>
        <td className="p-4">
          <div className="flex justify-center">
            {getRoleBadge(user.role)}
          </div>
        </td>
        <td className="p-4">
          <div className="flex justify-center">
            {getStatusBadge(user.isActive, user.isDeleted)}
          </div>
        </td>
        <td className="p-4 text-right">
          <button
            onClick={() => setSelectedUser(user)}
            className="inline-flex items-center justify-center gap-1.5 text-sm text-blue-600 font-semibold hover:text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-all border border-blue-200 hover:border-transparent shadow-sm"
          >
            <Eye size={16} /> View
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-3">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search by ID, Name or Email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-600 border border-gray-100 flex-shrink-0 w-full sm:w-auto text-center">
            Total Users: <span className="text-orange-600 font-bold">{users?.length || 0}</span>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg border border-red-100">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading && (!users || users.length === 0) ? (
          <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-orange-500" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap">User</th>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap text-center">Role</th>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap text-center">Status</th>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {renderTableBodyContent()}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                User Details
              </h3>
              <button 
                onClick={() => setSelectedUser(null)}
                className="p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-start gap-6 mb-8">
                <div className="h-24 w-24 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-3xl shadow-sm border-4 border-white flex-shrink-0">
                  {selectedUser.photo ? (
                    <img src={`${SERVER_URL}${selectedUser.photo}`} alt={selectedUser.user_name} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    selectedUser.user_name?.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
                <div className="space-y-2 flex-1 pt-2">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">{selectedUser.user_name}</h4>
                    <p className="text-sm text-gray-500 font-mono">ID: {selectedUser._id}</p>
                  </div>
                  <div className="flex gap-2 pt-1">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser.isActive, selectedUser.isDeleted)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
                    <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Contact Info</h5>
                    <p className="text-sm text-gray-700 flex items-center gap-3"><Mail size={16} className="text-blue-500"/> {selectedUser.email}</p>
                    <p className="text-sm text-gray-700 flex items-center gap-3"><Phone size={16} className="text-green-500"/> {selectedUser.mobile}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3 h-full">
                    <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Location & Dates</h5>
                    <div className="text-sm text-gray-700 flex items-start gap-3">
                      <MapPin size={16} className="mt-0.5 flex-shrink-0 text-red-500"/>
                      <span className="leading-relaxed">{selectedUser.address || <span className="italic text-gray-400">Not provided</span>}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 flex justify-between">Joined: <span className="font-semibold text-gray-700">{new Date(selectedUser.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="bg-orange-50/50 rounded-xl p-5 border border-orange-100">
                <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Account Actions</h5>
                <div className="flex flex-wrap gap-3">
                  {!selectedUser.isActive && !selectedUser.isDeleted && (
                    <button 
                      onClick={() => handleUpdateStatus(true, false)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <CheckCircle2 size={16} /> Activate Account
                    </button>
                  )}
                  {selectedUser.isActive && !selectedUser.isDeleted && (
                    <button 
                      onClick={() => handleUpdateStatus(false, false)}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <XCircle size={16} /> Block User
                    </button>
                  )}
                  {!selectedUser.isDeleted && (
                    <button 
                      onClick={() => {
                        if(window.confirm("Are you sure you want to mark this user as deleted?")) {
                          handleUpdateStatus(false, true);
                        }
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <XCircle size={16} /> Delete User
                    </button>
                  )}
                  {selectedUser.isDeleted && (
                    <button 
                      onClick={() => handleUpdateStatus(true, false)}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <CheckCircle2 size={16} /> Restore Account
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                  * <strong className="text-gray-700">Blocked</strong> or <strong className="text-gray-700">Deleted</strong> users will not be able to log in to the application. If you delete an account, it is considered softly deleted but remains in the database.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManager;
