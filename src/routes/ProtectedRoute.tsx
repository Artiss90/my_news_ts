import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// import { useAppSelector } from "../../state/hooks";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = false; // Redux/Context or even in-memory user
  const location = useLocation();
  return !auth ? <Navigate to={'/Login'} state={{ from: location }} replace /> : children;
};

export default ProtectedRoute;
