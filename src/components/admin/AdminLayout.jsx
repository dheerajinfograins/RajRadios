import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { LogOut, User, Menu } from "lucide-react";
import { logout } from "../../feactures/auth/authSlice";
import AdminProfileModal from "./AdminProfileModal";
import { SERVER_URL } from "../../utils/axiosInstance";

const AdminLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center gap-2 sm:gap-4 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="hidden sm:inline text-sm text-gray-600">
                Welcome, <span className="font-semibold text-gray-900">{user?.user_name || "Admin"}</span>
              </span>
              {user?.photo ? (
                <img src={`${SERVER_URL}${user.photo}`} alt="Profile" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-200" />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm sm:text-base">
                  {user?.user_name?.charAt(0).toUpperCase() || "A"}
                </div>
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50">
                <button 
                  onClick={() => { setModalOpen(true); setDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <User size={16} /> Profile Settings
                </button>
                <hr className="my-1 border-gray-100" />
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {modalOpen && <AdminProfileModal onClose={() => setModalOpen(false)} />}

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
