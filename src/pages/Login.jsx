import React, { useState } from "react";
import { Link } from "react-router";

// Login Page Component
export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F14] text-white p-4">
      <div className="w-full max-w-md bg-[#121821] p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-semibold transition">
            Login
          </button>

          <p className="text-center text-gray-400 mt-4">
            Don't have an account? <Link to="/signup" className="text-blue-400">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Sign Up Page Component
export function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F14] text-white p-4">
      <div className="w-full max-w-md bg-[#121821] p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 p-3 rounded text-white font-semibold transition">
            Create Account
          </button>

          <p className="text-center text-gray-400 mt-4">
            Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
