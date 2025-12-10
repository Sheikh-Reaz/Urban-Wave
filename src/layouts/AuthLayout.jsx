import React from "react";
import Logo from "../assets/Logo.png";
import { Link, Outlet } from "react-router";
const AuthLayout = () => {
  return (
    <div className=" min-h-screen ">
      <Link to={"/"}>
        <div className=" max-w-7xl py-2 mx-auto flex justify-center">
          <img src={Logo} alt="brand logo" />
        </div>
      </Link>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
