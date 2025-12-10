import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
