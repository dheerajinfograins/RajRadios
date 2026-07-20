import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import AdminLayout from "../components/admin/AdminLayout";

const AdminRoute = () => {
  // Get auth state from redux
  const { isAuthorized, user } = useSelector((state) => state.auth);

  // If user is NOT logged in or NOT an admin → redirect to login/home
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== "admin") {
    // Redirect unauthorized users to home page
    return <Navigate to="/" replace />;
  }

  // If logged in AND is admin → show admin layout
  return (
    <AdminLayout>
      <Outlet /> {/* Admin pages render here */}
    </AdminLayout>
  );
};

export default AdminRoute;
