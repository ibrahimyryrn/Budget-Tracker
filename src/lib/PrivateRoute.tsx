import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookies } from "./cookies";
import { TransactionProvider } from "../context/TransactionProvider"; // yolu kontrol et

const PrivateRoute: React.FC = () => {
  const { access_token } = getCookies();

  if (!access_token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <TransactionProvider>
      <Outlet />
    </TransactionProvider>
  );
};

export default PrivateRoute;
