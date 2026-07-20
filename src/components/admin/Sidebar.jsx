import { NavLink } from "react-router";
import logoImg from "../../assets/logo/logo.png";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Wrench, 
  MessageSquare,
  LogOut
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../feactures/auth/authSlice";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} />, exact: true },
  { name: "Products", path: "/admin/products", icon: <Package size={20} /> },
  { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={20} /> },
  { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
  { name: "Repairs", path: "/admin/repairs", icon: <Wrench size={20} /> },
  { name: "Messages", path: "/admin/contacts", icon: <MessageSquare size={20} /> },
];

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen sticky top-0">
      <div className="p-4 flex items-center justify-center border-b border-gray-800">
        <NavLink to="/admin" className="block w-full px-2">
          <img src={logoImg} alt="Raj Radios Admin Logo" className="h-24 w-auto mx-auto object-contain scale-110" />
        </NavLink>
      </div>

      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-orange-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
