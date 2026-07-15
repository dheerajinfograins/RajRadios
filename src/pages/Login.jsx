import { useEffect } from "react";
import { Link, useNavigate } from "react-router"; // ✅ already correct
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../feactures/auth/authSlice.js";

// ✅ NEW IMPORTS
// import axiosInstance from "../utils/axiosInstance.js";
import { isAuthenticated } from "../utils/auth.utils";

// Login User Component
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Keeping your redux state exactly same
  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const submitHandler = (e) => {
    e.preventDefault();

    const login_user = e.target.login_user.value.trim();
    const password = e.target.password.value.trim();

    if (!login_user || !password) return;

    // ✅ Redux thunk handles API + token saving
    dispatch(
      loginUser({
        login_user,
        password,
      })
    );
  };

  // // 🔐 AUTO REDIRECT AFTER LOGIN
  // useEffect(() => {
  //   /**
  //    * ✅ Redirect user only when login is successful
  //    */
  //   if (isAuthorized === true) {
  //     navigate("/", { replace: true });
  //   }
  // }, [isAuthorized, navigate]);

  // 🔒 EXTRA SAFETY:
  // If user already logged in, prevent login page access
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F14] text-white p-4">
      <div className="w-full max-w-md bg-[#121821] p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={submitHandler}>
          
          {/* Email or Mobile */}
          <div>
            <label htmlFor="login_user" className="block mb-1 text-sm">Email or Mobile</label>
            <input
              id="login_user"
              type="text"
              name="login_user"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter email or mobile"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full p-3 rounded bg-[#1C242F] border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-semibold disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* ❌ Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">
              {error}
            </p>
          )}

          {/* Redirect */}
          <p className="text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
