import React from "react"
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminRoute() {
  const { user, loading } = React.useContext(AuthContext)

  if (loading) {
    return <p className="text-center mt-32 text-3xl">Checking permissions...</p>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}