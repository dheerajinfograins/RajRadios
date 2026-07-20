import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar (Fixed on Desktop) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, <span className="font-semibold text-gray-900">{user?.user_name || "Admin"}</span>
            </span>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
              {user?.user_name?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
