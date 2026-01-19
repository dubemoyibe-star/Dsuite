import React from "react"
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AdminRoute() {
  const { user, loading } = React.useContext(AuthContext)

  if (loading) {
      return <div className="text-center my-100 flex gap-4 justify-center">
        <AiOutlineLoading3Quarters className="text-yellow-700 animate-spin text-3xl" />
        <p className="text-2xl font-bold">Checking Permissions...</p>
        </div>;
    }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}