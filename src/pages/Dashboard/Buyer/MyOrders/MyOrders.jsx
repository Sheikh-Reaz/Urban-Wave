import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";
import Loading from "../../../../components/Loading";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
useDocumentTitle("My Orders");
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/orders?buyerEmail=${user.email}`
      );
      return res.data;
    },
  });

  const handleCancel = (orderId) => {
    Swal.fire({
      title: "Cancel Order?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/orders/${orderId}/cancel`);
        refetch();
        Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
      }
    });
  };
  useDocumentTitle("My Orders");
  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.productTitle}</td>
                <td>{order.orderQuantity}</td>
                <td className="capitalize">{order.status}</td>
                <td>{order.paymentOption}</td>
                <td className="space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/track-orders/${order.orderId}`)
                    }
                    className="btn btn-xs btn-info"
                  >
                    View
                  </button>

                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancel(order.orderId)}
                      className="btn btn-xs btn-error"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center mt-6">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
