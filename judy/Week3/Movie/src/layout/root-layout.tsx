import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
