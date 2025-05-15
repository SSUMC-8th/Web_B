import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";
import { useState } from "react";

export const RootLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [open, setOpen] = useState(true);
  return (
    <div className="h-screen flex flex-col">
      <NavBar handleSidebar={() => setOpen(!open)} />
      <div className="flex flex-1 pt-14">
        {pathname !== "/login" && pathname !== "/signup" && open && <SideBar />}
        <div className="w-full pl-45">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
