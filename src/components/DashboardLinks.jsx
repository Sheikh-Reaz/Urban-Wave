import React from "react";
import { FaUsersLine } from "react-icons/fa6";
import { CiShoppingTag } from "react-icons/ci";
import { MdDashboardCustomize } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { MdAddBox } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa6";
import { MdInventory2 } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { MdOutlineReceiptLong } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import useRole from "../hooks/useRole";
import Loading from "./Loading";
import { NavLink } from "react-router";
import { CircleUser } from "lucide-react";

const DashboardLinks = () => {
  const { role, status, roleLoading } = useRole();

  if (roleLoading) return <Loading />; // show loading while fetching role/status

  return (
    <div className="menu w-full grow">
      <ul className="menu w-full grow">
        {/* Dashboard Link */}
        <li>
          <NavLink
                to={"/dashboard"}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Dashboard"
          >
            <MdDashboardCustomize size={20} />
            <span className="is-drawer-close:hidden">Dashboard</span>
          </NavLink>
        </li>

        {/* Admin Links */}
        {role === "admin" && (
          <>
            <li>
              <NavLink
                to={"/dashboard/all-orders"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="All Orders"
              >
                <CiShoppingTag size={20} />
                <span className="is-drawer-close:hidden">All Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/all-products"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="All Products"
              >
                <GiClothes size={20} />
                <span className="is-drawer-close:hidden">All Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/manage-users"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Users"
              >
                <FaUsersLine size={20} />
                <span className="is-drawer-close:hidden">Manage  Users</span>
              </NavLink>
            </li>
          </>
        )}

        {/* Manager Links */}
        {role === "manager" && status !== "pending" && (
          <>
            <li>
              <NavLink
                to={"/dashboard/add-products"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Product"
              >
                <MdAddBox size={20} />
                <span className="is-drawer-close:hidden">Add Product</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/approved-orders"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Approve Orders"
              >
                <FaClipboardCheck size={20} />
                <span className="is-drawer-close:hidden">Approved Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/manage-products"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Products"
              >
                <MdInventory2 size={20} />
                <span className="is-drawer-close:hidden">Manage Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/pending-orders"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Pending Orders"
              >
                <FaClipboardList size={20} />
                <span className="is-drawer-close:hidden">Pending Orders</span>
              </NavLink>
            </li>
          </>
        )}

        {/* Buyer Links */}
        {role === "buyer" && (
          <>
            <li>
              <NavLink to={"/dashboard/my-orders"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Orders"
              >
                <MdOutlineReceiptLong size={20} />
                <span className="is-drawer-close:hidden">My Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/track-orders"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Track Orders"
              >
                <FiSearch size={20} />
                <span className="is-drawer-close:hidden">Track Orders</span>
              </NavLink>
            </li>
          </>
        )}
            <li>
              <NavLink to={"/dashboard/profile"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Track Orders"
              >
                <CircleUser size={20} />
                <span className="is-drawer-close:hidden">My Profile</span>
              </NavLink>
            </li>
    
      </ul>
    </div>
  );
};

export default DashboardLinks;
