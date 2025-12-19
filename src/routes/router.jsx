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
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import MyOrders from "../pages/Dashboard/Buyer/MyOrders/MyOrders";
import TrackOrder from "../pages/Dashboard/Buyer/TrackOrder/TrackOrder";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import BuyerRoutes from "./BuyerRoutes";
import ManagerRoutes from "./ManagerRoutes";
import AddProduct from "../pages/Dashboard/Manager/AddProduct/AddProduct";
import ManageProduct from "../pages/Dashboard/Manager/ManageProduct/ManageProduct";
import PendingOrders from "../pages/Dashboard/Manager/PendingOrders/PendingOrders";
import ApprovedOrders from "../pages/Dashboard/Manager/ApprovedOrders/ApprovedOrders";
import AdminRoutes from "./AdminRoutes";
import SharedRoutes from "./SharedRoutes";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AllOrders from "../pages/Dashboard/Admin/AllOrders/AllOrders";
import UpdateProduct from "../pages/Dashboard/Manager/UpdateProduct/UpdateProduct";
import AdminAllProducts from "../pages/Dashboard/Admin/AdminAllProducts/AdminAllProducts";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Order from "../pages/Order/Order";
import OrderDetails from "../pages/Dashboard/Manager/OrderDetails/OrderDetails";
import ViewDetails from "../pages/Dashboard/Admin/AllOrders/ViewDetails";
import ErrorPage from "../pages/404Page/ErrorPage";

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
        Component: AllProducts
      },
      {
        path:"contact",
        Component: Contact
      },
      {
        path:"product/:id",
        element: <PrivateRoutes> <ProductDetails/> </PrivateRoutes>
      },
      {
        path: "order/:id",
        element: <PrivateRoutes> <Order/> </PrivateRoutes>
      },


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
  //Dashboard routes
  {
    path: "dashboard",
    element: <PrivateRoutes> <DashboardLayout/> </PrivateRoutes>,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      //buyer routes
      {
        path: "my-orders",
       element: <BuyerRoutes> <MyOrders/></BuyerRoutes>
      },
      {
        path: "track-orders/:orderId",
        element: <TrackOrder/>
      },
      {
        path: "track-orders",
        element: <TrackOrder/>
      },
      {
        path: "profile",
        Component: MyProfile
      },
      //Manager Routes
      {
        path: "add-products",
        element: <ManagerRoutes> <AddProduct/> </ManagerRoutes>
      },
      {
        path: "manage-products",
        element: <ManagerRoutes> <ManageProduct/> </ManagerRoutes>
      },
      {
        path: "update-product/:productId",
        element:  <SharedRoutes><UpdateProduct/></SharedRoutes>
      },
      {
        path:"pending-orders",
        element:<ManagerRoutes> <PendingOrders/> </ManagerRoutes>
      },
      {
        path:"approved-orders",
        element:<ManagerRoutes> <ApprovedOrders/> </ManagerRoutes>
      },
      {
        path:"order/:id",
        element: <ManagerRoutes> <OrderDetails/> </ManagerRoutes>
      },
      //Admin Routes
      {
          path: "manage-users",
          element: <AdminRoutes> <ManageUsers/> </AdminRoutes>
      },
      {
        path: "all-products",
        element: <AdminRoutes> <AdminAllProducts/> </AdminRoutes>
      },
      {
        path: "all-orders/:id",
        element: <AdminRoutes> <ViewDetails/> </AdminRoutes>
      },
      {
        path: "all-orders",
        element: <AdminRoutes> <AllOrders/> </AdminRoutes>
      }

    ]
  },
  {
            
        path: "*",
        Component: ErrorPage
      
  }


]);

