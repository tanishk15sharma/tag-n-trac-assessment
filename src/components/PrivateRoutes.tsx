import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const user = localStorage.getItem("userInfo");
  return <div>{user ? <Outlet /> : <Navigate to="/login" replace />}</div>;
};

export { PrivateRoutes };
