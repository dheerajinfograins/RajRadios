import { NavLink } from "react-router";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Product Details", path: "/productdetails" },
    { name: "Repair Service", path: "/repairservice" },
    { name: "Cart", path: "/cart" },
    { name: "Checkout", path: "/checkout" },
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
          <nav className="space-x-6 hidden md:flex">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `hover:text-cyan-400 transition duration-300 ${
                    isActive ? "text-cyan-400 border-b-2 border-cyan-400" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4">
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
          </div>

          {/* Mobile Menu Icon */}
          <div
            className="md:hidden text-cyan-400 cursor-pointer text-3xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "✖" : "☰"}
          </div>
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
              className="block py-2 border-b border-gray-700 hover:text-cyan-400"
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile Login + Sign Up */}
          <div className="pt-4 space-y-3">
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
          </div>

        </div>
      )}
    </>
  );
}
