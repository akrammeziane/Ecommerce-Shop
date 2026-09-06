import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedPages({ adminCheck = false }) {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminCheck && !user.isAdmin) {
    return <Navigate to="/account" replace />;
  }
  if (!adminCheck && user.isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
