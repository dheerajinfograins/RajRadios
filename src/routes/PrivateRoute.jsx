import { Navigate, Outlet } from "react-router";

export default function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("authToken");
  // Replace with Redux / Context if needed

  return (<>isAuthenticated ? children : <Navigate to="/login" replace />
    
    <Outlet />
    
  </>

  )
}
