import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState(""); // "" | Pending | Approved | Rejected

  // Fetch all orders once
  const { data: allOrders = [], isLoading } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-10 text-color">Loading orders...</p>;

  // Filter data dynamically
  const filteredOrders = filterStatus
    ? allOrders.filter(
        (order) =>
          order.status.toLowerCase() === filterStatus.toLowerCase()
      )
    : allOrders;

  // Status badge color
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-400 text-black";
      case "approved":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="p-4 text-color">
      <h1 className="text-3xl font-bold mb-6 title-font">All Orders</h1>

      {/* Filter Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["", "Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status || "All"}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${
              filterStatus === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white text-black hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {status || "All"}
          </button>
        ))}
      </div>

      {/* Table wrapper with horizontal scroll */}
      <div className="overflow-x-auto border border-color rounded-lg">
        <table className="min-w-[900px] w-full table-auto border-collapse border border-color">
          <thead className="">
            <tr className="text-center text-color">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Buyer</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 font-semibold text-gray-500 dark:text-gray-400"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="text-center"
                >
                  <td className="border p-2">{order.orderId}</td>
                  <td className="border p-2">{order.sellerEmail}</td>
                  <td className="border p-2">
                    {order.firstName} {order.lastName}
                  </td>
                  <td className="border p-2">{order.productTitle}</td>
                  <td className="border p-2">{order.orderQuantity}</td>
                  <td className="border p-2">
                    <span
                      className={`px-3 py-1 rounded-full font-semibold text-sm ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border p-2">
                    <button
                      className="px-3 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                      onClick={() =>
                        navigate(`/dashboard/all-orders/${order.orderId}`, {
                          state: order,
                        })
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
