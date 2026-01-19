import React from "react"
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "./Loading";

export default function AdminRoute() {
  const { user, loading } = React.useContext(AuthContext)

  if (loading) {
      return <Loading message="Checking Permissions..."/>
    }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}