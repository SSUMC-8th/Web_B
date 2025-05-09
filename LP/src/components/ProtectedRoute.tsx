import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, isLoading } = useAuthContext();

  if (isLoading) {
    // 초기화 중일 땐 아무것도 렌더링하지 않음 (또는 Loading 컴포넌트)
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  console.log("[ProtectedRoute] isLoading:", isLoading, "isLoggedIn:", isLoggedIn);

  return <>{children}</>;
};

export default ProtectedRoute;