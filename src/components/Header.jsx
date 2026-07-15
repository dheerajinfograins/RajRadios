import { NavLink } from "react-router";
import { useState } from "react";
import { Home, ShoppingBag, Info, Phone, Wrench, ShoppingCart, LogOut, User, Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../feactures/auth/authSlice";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthorized, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const links = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Product", path: "/shop", icon: <ShoppingBag className="w-4 h-4" /> },
    { name: "About", path: "/about", icon: <Info className="w-4 h-4" /> },
    { name: "Contact", path: "/contact", icon: <Phone className="w-4 h-4" /> },
    { name: "Repair Service", path: "/repairservice", icon: <Wrench className="w-4 h-4" /> },
    { name: "Cart", path: "/card", icon: <ShoppingCart className="w-4 h-4" />, count: cartCount },
    { name: "Wishlist", path: "/wishlist", icon: <Heart className="w-4 h-4" />, count: wishlistCount },
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">

          {/* Logo */}
          <h1 className="text-2xl font-bold tracking-wide text-cyan-400">
            Vijay<span className="text-white">Radios</span>
          </h1>

          {/* Desktop Navigation */}
          <nav className="space-x-6 hidden md:flex items-center">
            {links.map((link) => (
              <div key={link.name} className="relative group flex justify-center">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative p-1 hover:text-cyan-400 transition duration-300 ${isActive ? "text-cyan-400 border-b-2 border-cyan-400" : "text-white"
                    }`
                  }
                >
                  {link.icon}
                  {link.count > 0 && (
                    <span className="absolute -top-2 -right-3 bg-cyan-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {link.count}
                    </span>
                  )}
                </NavLink>
                {/* Tooltip */}
                <span className="absolute top-full mt-2 w-max px-2 py-1 bg-gray-800 text-cyan-400 text-xs font-semibold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md border border-gray-700 z-50">
                  {link.name}
                </span>
              </div>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthorized ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 text-cyan-400 font-semibold cursor-pointer p-2 rounded-lg hover:bg-gray-800 transition"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <User className="w-5 h-5" />
                  <span>Hi, {user?.user_name || user?.name || "User"}</span>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="flex flex-col">
                      <div className="px-4 py-3 border-b border-gray-700 text-sm text-gray-300">
                        Signed in as <br /> <strong className="text-white">{user?.user_name || user?.name || "User"}</strong>
                      </div>
                      <NavLink to="/profile" onClick={() => setProfileDropdownOpen(false)} className="px-4 py-3 text-white hover:bg-gray-700 hover:text-cyan-400 transition-colors flex items-center gap-2">
                        Profile
                      </NavLink>
                      <NavLink to="/orders" onClick={() => setProfileDropdownOpen(false)} className="px-4 py-3 text-white hover:bg-gray-700 hover:text-cyan-400 transition-colors flex items-center gap-2">
                        Order History
                      </NavLink>
                      <NavLink to="/track-order" onClick={() => setProfileDropdownOpen(false)} className="px-4 py-3 text-white hover:bg-gray-700 hover:text-cyan-400 transition-colors flex items-center gap-2">
                        Track Order
                      </NavLink>
                      <button
                        onClick={() => {
                          dispatch(logout());
                          setProfileDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-3 mt-1 border-t border-gray-700 text-red-500 hover:bg-gray-700 transition-colors text-left w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-cyan-400 text-black hover:bg-cyan-300 transition"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-cyan-400 cursor-pointer text-3xl focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "✖" : "☰"}
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 text-white px-6 py-4 space-y-4 shadow-lg">

          {/* Mobile Nav Links */}
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 py-2 border-b border-gray-700 hover:text-cyan-400"
            >
              <div className="relative">
                {link.icon}
                {link.count > 0 && (
                  <span className="absolute -top-2 -right-3 bg-cyan-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {link.count}
                  </span>
                )}
              </div>
              <span>{link.name}</span>
            </NavLink>
          ))}

          {/* Mobile Login + Sign Up */}
          <div className="pt-4 space-y-3">
            {isAuthorized ? (
              <>
                <div className="flex flex-col gap-2 px-4 py-3 border-b border-gray-700">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
                    <User className="w-5 h-5" />
                    <span>Hi, {user?.user_name || user?.name || "User"}</span>
                  </div>
                  <NavLink to="/profile" onClick={() => setMobileOpen(false)} className="block text-white hover:text-cyan-400 py-2">Profile</NavLink>
                  <NavLink to="/orders" onClick={() => setMobileOpen(false)} className="block text-white hover:text-cyan-400 py-2">Order History</NavLink>
                  <NavLink to="/track-order" onClick={() => setMobileOpen(false)} className="block text-white hover:text-cyan-400 py-2">Track Order</NavLink>
                </div>
                <button
                  onClick={() => {
                    dispatch(logout());
                    setMobileOpen(false);
                  }}
                  className="flex w-full justify-center items-center gap-2 px-4 py-2 mt-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-4 py-2 rounded-lg bg-cyan-400 text-black hover:bg-cyan-300 transition"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

        </div>
      )}
    </>
  );
}
