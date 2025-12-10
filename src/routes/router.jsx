import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import AllProducts from "../pages/AllProducts/AllProducts";
import Contact from "../pages/Contact/Contact";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
  //Main routes
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true,
        Component: Home
      },
      {
        path: "about-us",
        Component: AboutUs
      },
      {
        path: "all-products",
        element: <PrivateRoutes><AllProducts/></PrivateRoutes>
      },
      {
        path:"contact",
        Component: Contact
      }

    ],
  },
  //Auth routes
 {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

]);
