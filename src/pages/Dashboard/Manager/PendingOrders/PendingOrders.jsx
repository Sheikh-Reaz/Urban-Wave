import React from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ FETCH ONLY PENDING ORDERS FOR LOGGED-IN SELLER
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["pendingOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders/pending");
      return res.data;
    },
  });

  const handleStatusChange = async (orderId, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${status.toLowerCase()} this order.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "Approved" ? "#3085d6" : "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${status}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/orders/${orderId}`, { status });

          // ✅ REFETCH PENDING ORDERS AFTER UPDATE
          await queryClient.invalidateQueries({
            queryKey: ["pendingOrders"],
          });

          Swal.fire({
            title: "Success!",
            text: `Order has been ${status.toLowerCase()} successfully.`,
            icon: "success",
          });
        } catch (error) {
          console.error("Failed to update status:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to update order status.",
            icon: "error",
          });
        }
      }
    });
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  if (!orders.length) {
    return <p className="text-center mt-10">No pending orders found.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Orders</h1>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Buyer</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Order Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-center">
              <td className="border p-2">{order.orderId}</td>

              <td className="border p-2">
                {order.firstName} {order.lastName} <br />
                <span className="text-xs text-gray-500">
                  {order.buyerEmail}
                </span>
              </td>

              <td className="border p-2">{order.productTitle}</td>
              <td className="border p-2">{order.orderQuantity}</td>

              <td className="border p-2">
                {new Date(order.createdAt).toLocaleString()}
              </td>

              <td className="border p-2 space-x-2">
                <button
                  onClick={() =>
                    handleStatusChange(order.orderId, "Approved")
                  }
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    handleStatusChange(order.orderId, "Rejected")
                  }
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>

                <button
                  className="btn ml-2"
                  onClick={() =>
                    navigate(`/dashboard/order/${order.orderId}`, {
                      state: order,
                    })
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrders;
