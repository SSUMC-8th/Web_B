import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export const ProtectedLayout = () => {
  const accessToken = window.localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
