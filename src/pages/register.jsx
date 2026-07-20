import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../feactures/auth/authSlice";
import { Link } from "react-router";

// Register User Component
export default function SignUp() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Clear local error when global error changes
  useEffect(() => {
    if (error) setLocalError("");
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLocalError("");

    const user_name = e.target.user_name.value.trim();
    const email = e.target.email.value.trim();
    const mobile = e.target.mobile.value.trim();
    const password = e.target.password.value.trim();
    const confirmPassword = e.target.confirmPassword.value.trim();

    if (!user_name || !email || !mobile || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    dispatch(
      registerUser({
        user_name, // ✅ MATCH BACKEND
        email,
        mobile,
        password,
        confirmPassword,
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F14] text-white p-4 pt-32">
      <div className="w-full max-w-md bg-[#121821] p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <form className="space-y-4" onSubmit={submitHandler}>

          {/* User Name */}
          <div>
            <label htmlFor="user_name" className="block mb-1 text-sm">Full Name</label>
            <input
              id="user_name"
              name="user_name"   // ✅ IMPORTANT
              type="text"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none focus:border-green-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none focus:border-green-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="block mb-1 text-sm">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none focus:border-green-500"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none focus:border-green-500 pr-10"
                placeholder="Enter your password"
                required
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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-sm">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none focus:border-green-500 pr-10"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
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
            className="w-full bg-green-600 hover:bg-green-700 p-3 rounded text-white font-semibold disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* Error */}
          {(error || localError) && (
            <p className="text-red-500 text-sm text-center mt-2">
              {localError || error}
            </p>
          )}

          {/* Redirect */}
          <p className="text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
