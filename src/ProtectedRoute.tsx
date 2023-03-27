import { Navigate } from "react-router-dom";
import { type PropsProtectedRoute } from "@interface/PropsProtectedRoute";

export const ProtectedRoute: React.FC<PropsProtectedRoute> = ({
  children,
  currentUser,
}) => {
  return currentUser !== null ? children : <Navigate to="/login" />;
};
