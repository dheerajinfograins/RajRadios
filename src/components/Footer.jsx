import { NavLink } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-gray-300 py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 mb-3">
            Vijay<span className="text-white">Radios</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Your trusted partner in quality radios, electronics, and expert repair services since 2015.
            Explore the latest tech with elegance and performance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
              { name: "Product Details", path: "/productdetails" },
              { name: "Repair Service", path: "/repairservice" },
              { name: "Cart", path: "/cart" },
              { name: "Checkout", path: "/checkout" },
            ].map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `hover:text-cyan-400 transition duration-300 ${isActive ? "text-cyan-400" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2">
            <li>
              📍 <span className="text-gray-400">Shichai Vibhag Colony ke Smane A.B Road Kanasiya Naka (Maksi)</span>
            </li>
            <li>
              📞 <a href="#" className="hover:text-cyan-400">+91 8871442941 - 9754990102</a>
            </li>
            <li>
              ✉️ <a href="#" className="hover:text-cyan-400">
                vijayranasara990@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">Vijay Radios</span>. All rights reserved.
      </div>
    </footer>
  );
}
