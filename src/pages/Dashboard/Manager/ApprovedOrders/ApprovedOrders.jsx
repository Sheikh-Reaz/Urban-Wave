import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";

const ApprovedOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
useDocumentTitle("Approved Orders");
  // Fetch approved orders for logged-in manager
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["approvedOrders", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];

      // Get orders approved and filtered by sellerEmail
      const res = await axiosSecure.get("/orders/approved", {
        params: { sellerEmail: user.email },
      });

      // Attach tracking updates for each order
      const ordersWithUpdates = await Promise.all(
        res.data.map(async (order) => {
          try {
            const trackingRes = await axiosSecure.get(
              `/orders/${order.orderId}/tracking` // ✅ always use business orderId
            );
            return { ...order, updates: trackingRes.data.updates || [] };
          } catch {
            return { ...order, updates: [] };
          }
        })
      );

      return ordersWithUpdates;
    },
    enabled: !!user?.email, // only fetch if user email exists
  });

  // Add tracking update with enforced status order
  const addTracking = async (orderId) => {
    try {
      const order = orders.find((o) => o.orderId === orderId); // ✅ find by business orderId

      const flow = [
        "Cutting Completed",
        "Sewing Started",
        "Finishing",
        "QC Checked",
        "Packed",
        "Shipped",
        "Out for Delivery",
      ];

      const lastStatus = order?.updates?.length
        ? order.updates[order.updates.length - 1].status
        : null;

      const nextAllowedIndex = lastStatus ? flow.indexOf(lastStatus) + 1 : 0;
      const allowedOptions = flow.slice(nextAllowedIndex);

      if (!allowedOptions.length) {
        return Swal.fire(
          "Tracking Complete",
          "All tracking steps are already added",
          "info"
        );
      }

      const htmlOptions = allowedOptions
        .map((status) => `<option value="${status}">${status}</option>`)
        .join("");

      const { value: formValues } = await Swal.fire({
        title: "Add Tracking Update",
        html: `
          <select id="status" class="swal2-input border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            ${htmlOptions}
          </select>
          <input id="location" class="swal2-input border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Location">
          <textarea id="note" class="swal2-textarea border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Note (optional)"></textarea>
        `,
        preConfirm: () => ({
          status: document.getElementById("status").value,
          location: document.getElementById("location").value,
          note: document.getElementById("note").value,
        }),
        showCancelButton: true,
      });

      if (!formValues) return;

      await axiosSecure.patch(
        `/orders/${order.orderId}/tracking`, // ✅ send business orderId
        formValues
      );

      Swal.fire("Success", "Tracking added", "success");

      // Refetch data to reflect new tracking
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // View tracking timeline
  const viewTracking = async (orderId) => {
    try {
      const res = await axiosSecure.get(`/orders/${orderId}/tracking`);
      const updates = res.data.updates || [];

      if (!updates.length) {
        Swal.fire("No tracking updates yet");
        return;
      }

      Swal.fire({
        title: "Tracking Timeline",
        html: updates
          .map(
            (u) =>
              `<p><strong>${u.status}</strong> - ${new Date(
                u.createdAt
              ).toLocaleString()}</p><hr/>`
          )
          .join(""),
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not fetch tracking", "error");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">
        Approved Orders
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 sm:border-none">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left text-sm sm:text-base">Order ID</th>
              <th className="px-2 py-1 text-left text-sm sm:text-base">User</th>
              <th className="px-2 py-1 text-left text-sm sm:text-base">Product</th>
              <th className="px-2 py-1 text-left text-sm sm:text-base">Qty</th>
              <th className="px-2 py-1 text-left text-sm sm:text-base">Tracking</th>
              <th className="px-2 py-1 text-left text-sm sm:text-base">Approved Date</th>
              <th className="px-2 py-1 text-left text-sm sm:text-base">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="px-2 py-1 text-sm sm:text-base">{order.orderId}</td>
                <td className="px-2 py-1 text-sm sm:text-base">{order.firstName} {order.lastName}</td>
                <td className="px-2 py-1 text-sm sm:text-base">{order.productTitle}</td>
                <td className="px-2 py-1 text-sm sm:text-base">{order.orderQuantity}</td>
                <td className="px-2 py-1 text-sm sm:text-base">
                  {order.updates?.length > 0 ? (
                    <strong>{order.updates[order.updates.length - 1].status}</strong>
                  ) : (
                    "No updates"
                  )}
                </td>
                <td className="px-2 py-1 text-sm sm:text-base">{new Date(order.approvedAt).toLocaleString()}</td>
                <td className="px-2 py-1 text-sm sm:text-base flex flex-wrap gap-1">
                  <button
                    onClick={() => addTracking(order.orderId)}
                    className="btn btn-xs btn-primary flex-1 min-w-[120px]"
                  >
                    Add Tracking
                  </button>
                  <button
                    onClick={() => viewTracking(order.orderId)}
                    className="btn btn-xs btn-outline flex-1 min-w-[120px]"
                  >
                    View Tracking
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedOrders;
