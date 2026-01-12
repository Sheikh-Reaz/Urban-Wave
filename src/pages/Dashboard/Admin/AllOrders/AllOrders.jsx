import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState(""); // "" | Pending | Approved | Rejected
useDocumentTitle("All Orders");
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

      {/* Filter Tabs */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm mb-6">
        <div className="flex flex-col border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center px-4 py-2 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-6">
              {["All", "Unfulfilled", "Unpaid", "Paid", "Open", "Close"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-4 text-sm font-semibold transition-colors ${
                    filterStatus === status
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {status}
                </button>
              ))}
              <button className="text-gray-400 hover:text-blue-600">
                +
              </button>
            </div>
          </div>
          
          {/* Search and Controls */}
          <div className="flex items-center justify-between p-4">
            <div className="relative w-full max-w-xs">
              <span className="absolute left-3 top-2 text-gray-400 text-lg">🔍</span>
              <input
                type="text"
                placeholder="Find order"
                className="w-full pl-10 pr-4 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-blue-600 focus:border-blue-600 dark:text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium">
                <span className="text-sm mr-2">↕</span>
                Sort by
              </button>
              <button className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium">
                <span className="text-sm mr-2">⚬</span>
                Filter
              </button>
              <button className="p-1.5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">☰</span>
              </button>
              <button className="p-1.5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">↻</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table wrapper with horizontal scroll */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr className="text-center text-color">
                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
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
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-center"
                  >
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-300 font-medium">#{order.orderId}</td>
                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      }) : 'Oct 18, 2024'}
                    </td>
                    <td className="p-4 text-sm text-color font-medium">
                      {order.firstName} {order.lastName}
                    </td>
                    <td className="p-4 text-sm text-color">{order.productTitle}</td>
                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{order.orderQuantity}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        className="text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
                        onClick={() =>
                          navigate(`/dashboard/all-orders/${order.orderId}`, {
                            state: order,
                          })
                        }
                      >
                        ⋮
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
