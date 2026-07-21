import { useState } from "react";
import { NavLink } from "react-router";
import { Truck, HeadphonesIcon, ShieldCheck, Award } from "lucide-react";

export default function Footer() {
  const [activePolicy, setActivePolicy] = useState(null);

  const policyContent = {
    privacy: {
      title: "Privacy Policy",
      text: "At Vijay Radios, we are committed to protecting your privacy. We collect personal information such as your name, address, email, and phone number only to process orders and improve your shopping experience. We do not sell or share your data with third parties except for payment processing and shipping. We use secure encryption to protect your sensitive information. By using our website, you consent to our data practices as outlined in this policy."
    },
    terms: {
      title: "Terms of Service",
      text: "Welcome to Vijay Radios! By accessing and using our website, you agree to abide by these terms. All products, services, and content on this site are for personal, non-commercial use. We strive to provide accurate product descriptions, but we do not warrant that all details are error-free. We reserve the right to refuse or cancel any order. Prices and availability are subject to change without notice. Please read these terms carefully before making a purchase."
    },
    refund: {
      title: "Refund Policy",
      text: "We offer a 7-day return and refund policy on eligible items. To qualify for a refund, the product must be unused, in its original packaging, and accompanied by the receipt. If the item you received is defective or damaged, please contact our support team within 24 hours of delivery. Refunds will be processed to the original payment method within 5-7 business days after we receive and inspect the returned item. Shipping charges are non-refundable."
    }
  };
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-cyan-400 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />,
      title: "Fast Shipping",
      description: "Fast & reliable delivery across India."
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8 text-cyan-400 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />,
      title: "24/7 Support",
      description: "We're here to help you anytime."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-cyan-400 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />,
      title: "Secure Payment",
      description: "100% secure payment gateways."
    },
    {
      icon: <Award className="w-8 h-8 text-cyan-400 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />,
      title: "Genuine Quality",
      description: "Original & certified products."
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-gray-300 pt-16 pb-8 border-t border-gray-800 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-32 bg-cyan-600/10 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Service Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-12 mb-12 border-b border-gray-800 text-center">
          {features.map((feature) => (
            <div key={feature.title} className="group flex flex-col items-center p-6 rounded-2xl hover:bg-gray-800/50 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 border border-transparent hover:border-gray-700/50">
              {feature.icon}
              <h4 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">{feature.title}</h4>
              <p className="text-sm text-gray-400 max-w-xs">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 tracking-tight">
              Vijay<span className="text-white">Radios</span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm mb-6">
              Your trusted partner in quality radios, electronics, and expert repair services since 2015.
              Explore the latest tech with elegance and performance.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://wa.me/918871442941" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Shop", path: "/shop" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Repair Service", path: "/repairservice" },
                { name: "Cart", path: "/card" },
                { name: "Checkout", path: "/checkout" },
              ].map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `group hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 ${isActive ? "text-cyan-400 font-semibold" : "text-gray-400"}`
                    }
                  >
                    <span className="text-cyan-500/50 text-xs group-hover:translate-x-1 transition-transform">➤</span> {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-xl mt-1">📍</span> 
                <span className="text-sm leading-relaxed">Shichai Vibhag Colony ke Smane<br/>A.B Road Kanasiya Naka (Maksi)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">📞</span> 
                <a href="tel:+918871442941" className="text-sm hover:text-cyan-400 transition-colors">+91 8871442941 - 9754990102</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">✉️</span> 
                <a href="mailto:vijayranasara990@gmail.com" className="text-sm hover:text-cyan-400 transition-colors">
                  vijayranasara990@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line & Payment Methods */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
             <p className="text-gray-400 mb-3 font-semibold uppercase tracking-wider text-xs">We Accept</p>
             <div className="flex flex-wrap justify-center gap-3">
                <span className="px-3 py-1.5 bg-gray-900/80 border border-gray-700/50 rounded-md text-xs font-bold text-gray-300 shadow-sm">UPI / QR</span>
                <span className="px-3 py-1.5 bg-gray-900/80 border border-gray-700/50 rounded-md text-xs font-bold text-gray-300 shadow-sm">Visa</span>
                <span className="px-3 py-1.5 bg-gray-900/80 border border-gray-700/50 rounded-md text-xs font-bold text-gray-300 shadow-sm">MasterCard</span>
                <span className="px-3 py-1.5 bg-gray-900/80 border border-gray-700/50 rounded-md text-xs font-bold text-gray-300 shadow-sm">RuPay</span>
                <span className="px-3 py-1.5 bg-gray-900/80 border border-gray-700/50 rounded-md text-xs font-bold text-gray-300 shadow-sm">COD</span>
             </div>
          </div>
          <div className="flex flex-col md:items-end text-center md:text-right">
            <p>© {new Date().getFullYear()} <span className="text-cyan-400 font-bold">Vijay Radios</span>. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-2 justify-center md:justify-end">
              <button onClick={() => setActivePolicy('privacy')} className="hover:text-cyan-400 transition-colors cursor-pointer">Privacy Policy</button>
              <button onClick={() => setActivePolicy('terms')} className="hover:text-cyan-400 transition-colors cursor-pointer">Terms of Service</button>
              <button onClick={() => setActivePolicy('refund')} className="hover:text-cyan-400 transition-colors cursor-pointer">Refund Policy</button>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      {activePolicy && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700/50 p-8 md:p-10 rounded-3xl shadow-2xl max-w-2xl w-full relative transform transition-all animate-in fade-in zoom-in-95 duration-300">
            <button 
              onClick={() => setActivePolicy(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full hover:bg-red-500"
            >
              ✖
            </button>
            <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              {policyContent[activePolicy].title}
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-4">
              <p>{policyContent[activePolicy].text}</p>
            </div>
            <div className="mt-8 text-right">
              <button 
                onClick={() => setActivePolicy(null)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-xl transition-colors font-medium border border-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
