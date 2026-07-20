import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../feactures/auth/authSlice';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    user_name: user?.user_name || user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch local update
    dispatch(updateProfile(formData));
    setMessage('Profile updated successfully!');
    
    // Note: To save this to the backend database, you would dispatch an async thunk here
    // Example: dispatch(updateProfileAPI(formData))
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-36 pb-16 px-4 bg-[#0a0f16] text-white relative">
      {/* Background glow effects for consistency */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 pointer-events-none"></div>
      
      <div className="w-full max-w-lg bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-700 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">My Profile</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* User Name */}
          <div>
            <label htmlFor="user_name" className="block mb-2 text-sm text-gray-300 font-medium">Full Name</label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              value={formData.user_name}
              readOnly
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-300 font-medium">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              readOnly
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="block mb-2 text-sm text-gray-300 font-medium">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm text-gray-300 font-medium">Change Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition pr-10"
                placeholder="Enter new password (optional)"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 hover:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 hover:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 p-3 rounded-lg text-black font-bold text-lg transition duration-300 shadow-lg"
          >
            Update Profile
          </button>

          {/* Message */}
          {message && (
            <p className="text-green-400 text-sm text-center mt-4 font-semibold animate-pulse">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
