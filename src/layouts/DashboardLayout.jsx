import React from "react";

import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer";
import DrawerIcon from "../components/DrawerIcon";
import DashboardLinks from "../components/DashboardLinks";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext/ThemeContext";
const DashboardLayout = () => {
  const { roleLoading } = useRole();
  const { theme, toggleTheme } = useTheme();
   if (roleLoading) return <Loading/>
  return (
    
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
                <DrawerIcon/>
            </label>
            <div className="px-4 w-full flex justify-center ">
             <Logo/>
            </div>
            <div>
              <ThemeToggle  theme={theme} toggleTheme={toggleTheme}  ></ThemeToggle>
            </div>
          </nav>
          {/* Page content here */}
          <div className="min-h-screen  lg:p-8">
            <div className=" mx-auto  min-h-screen rounded-2xl  ">
              <Outlet />
            </div>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-300 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <DashboardLinks/>
          </div>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
