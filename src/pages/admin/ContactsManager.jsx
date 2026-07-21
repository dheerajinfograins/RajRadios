import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllContacts, deleteContactAdmin } from "../../feactures/admin/adminSlice";
import { Loader2, Mail, Phone, Calendar, Eye, X, Trash2, Search, MessageSquare } from "lucide-react";

const ContactsManager = () => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.admin);
  
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteContactAdmin(id))
        .unwrap()
        .then(() => {
          if (selectedContact?._id === id) {
            setSelectedContact(null);
          }
        })
        .catch(err => alert("Failed to delete message: " + err));
    }
  };

  const filteredContacts = contacts ? contacts.filter(contact => {
    const query = searchQuery.toLowerCase();
    const nameMatch = contact.user_name?.toLowerCase().includes(query);
    const emailMatch = contact.email?.toLowerCase().includes(query);
    const phoneMatch = contact.mobile?.toLowerCase().includes(query);
    return nameMatch || emailMatch || phoneMatch;
  }) : [];

  const renderTableContent = () => {
    if (!contacts || contacts.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="p-8 text-center text-gray-500">
            No messages found.
          </td>
        </tr>
      );
    }

    if (filteredContacts.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="p-8 text-center text-gray-500">
            No messages matched your search.
          </td>
        </tr>
      );
    }

    return filteredContacts.map(contact => (
      <tr key={contact._id} className="hover:bg-gray-50 align-middle transition-colors">
        <td className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
              {contact.user_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{contact.user_name}</p>
              <p className="text-xs text-gray-500 font-mono mt-0.5">ID: {contact._id.slice(-8)}</p>
            </div>
          </div>
        </td>
        <td className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-700 flex items-center gap-2"><Mail size={14} className="text-gray-400"/> {contact.email}</p>
            <p className="text-sm text-gray-700 flex items-center gap-2"><Phone size={14} className="text-gray-400"/> {contact.mobile}</p>
          </div>
        </td>
        <td className="p-4">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" />
            {new Date(contact.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </td>
        <td className="p-4 text-right space-x-2">
          <button
            onClick={() => setSelectedContact(contact)}
            className="inline-flex items-center justify-center gap-1.5 text-sm text-blue-600 font-semibold hover:text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-all border border-blue-200 hover:border-transparent shadow-sm"
          >
            <Eye size={16} /> View
          </button>
          <button
            onClick={() => handleDelete(contact._id)}
            className="inline-flex items-center justify-center gap-1.5 text-sm text-red-600 font-semibold hover:text-white hover:bg-red-600 px-3 py-2 rounded-lg transition-all border border-red-200 hover:border-transparent shadow-sm"
          >
            <Trash2 size={16} />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Contact Messages</h2>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-3">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search by Name, Email or Phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-600 border border-gray-100 flex-shrink-0 w-full sm:w-auto text-center">
            Total Messages: <span className="text-orange-600 font-bold">{contacts?.length || 0}</span>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg border border-red-100">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading && (!contacts || contacts.length === 0) ? (
          <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-orange-500" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap">Customer</th>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap">Contact Info</th>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap">Date</th>
                  <th className="p-4 font-semibold text-gray-600 whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {renderTableContent()}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                <MessageSquare size={20} className="text-blue-500" /> Message Details
              </h3>
              <button 
                onClick={() => setSelectedContact(null)}
                className="p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-start justify-between gap-6 mb-6">
                <div className="space-y-1 flex-1">
                  <h4 className="text-2xl font-bold text-gray-800">{selectedContact.user_name}</h4>
                  <p className="text-sm text-gray-500 font-mono">Message ID: {selectedContact._id}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <p className="text-sm text-gray-500 flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                      <Calendar size={14} /> {new Date(selectedContact.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
                   </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-2">
                  <h5 className="text-xs font-bold text-blue-800 uppercase tracking-wider">Email Address</h5>
                  <p className="text-sm text-gray-800 flex items-center gap-2 font-medium"><Mail size={16} className="text-blue-500"/> {selectedContact.email}</p>
                </div>
                
                <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 space-y-2">
                  <h5 className="text-xs font-bold text-green-800 uppercase tracking-wider">Phone Number</h5>
                  <p className="text-sm text-gray-800 flex items-center gap-2 font-medium"><Phone size={16} className="text-green-500"/> {selectedContact.mobile}</p>
                </div>
              </div>

              <div className="mb-2">
                <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                  Message Content
                </h5>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 min-h-[120px]">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedContact(null)}
                className="px-5 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-bold rounded-lg transition-colors shadow-sm"
              >
                Close
              </button>
              <button 
                onClick={() => handleDelete(selectedContact._id)}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <Trash2 size={16} /> Delete Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsManager;
