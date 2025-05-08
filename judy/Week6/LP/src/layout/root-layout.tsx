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
        <div className="ml-45 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
