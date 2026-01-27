import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../feactures/auth/authSlice";
import { Link } from "react-router";

// Register User Component
export default function SignUp() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();

    const user_name = e.target.user_name.value.trim();
    const email = e.target.email.value.trim();
    const mobile = e.target.mobile.value.trim();
    const password = e.target.password.value.trim();

    if (!user_name || !email || !mobile || !password) return;

    dispatch(
      registerUser({
        user_name, // ✅ MATCH BACKEND
        email,
        mobile,
        password,
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F14] text-white p-4">
      <div className="w-full max-w-md bg-[#121821] p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <form className="space-y-4" onSubmit={submitHandler}>
          
          {/* User Name */}
          <div>
            <label className="block mb-1 text-sm">User Name</label>
            <input
              name="user_name"   // ✅ IMPORTANT
              type="text"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none focus:border-green-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              name="email"
              type="email"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none focus:border-green-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-1 text-sm">Mobile Number</label>
            <input
              name="mobile"
              type="tel"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none focus:border-green-500"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              name="password"
              type="password"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none focus:border-green-500"
              placeholder="Enter your password"
              required
            />
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
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">
              {error}
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
