import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";

const ProtectedRoute = () => {
  // ✅ Get auth state from redux
  const { isAuthorized } = useSelector((state) => state.auth);

  // 🔐 If user is NOT logged in → redirect to login
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If logged in → show protected layout
  return (
    <>
      <Header />
      <Outlet />   {/* Protected pages render here */}
      <Footer />
    </>
  );
};

export default ProtectedRoute;
