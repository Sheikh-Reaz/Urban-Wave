import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxios from "../../../../hooks/useAxios";



const STATUS_FLOW = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped",
  "Out for Delivery",
];



const buildTimeline = (updates = []) => {
  const map = {};
  updates.forEach((u) => {
    if (STATUS_FLOW.includes(u.status)) {
      map[u.status] = u;
    }
  });

  const indexes = updates
    .map((u) => STATUS_FLOW.indexOf(u.status))
    .filter((i) => i !== -1);

  const lastIndex = indexes.length ? Math.max(...indexes) : -1;

  return STATUS_FLOW.map((status, index) => {
    if (map[status]) {
      return { ...map[status], status, state: "completed" };
    }

    if (index < lastIndex) {
      return { status, state: "completed", skipped: true };
    }

    if (index === lastIndex + 1) {
      return { status, state: "active" };
    }

    return { status, state: "pending" };
  });
};



const Loading = () => (
  <div className="text-center py-10 text-gray-500">Loading...</div>
);


const ViewDetails = () => {
  const { state } = useLocation();
  const { orderId: urlOrderId } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();

  const order = state?.order || state;

  const autoOrderId = urlOrderId || order?.orderId || "";

  const [submittedOrderId, setSubmittedOrderId] = useState(autoOrderId);

  useEffect(() => {
    if (autoOrderId && autoOrderId !== submittedOrderId) {
      setSubmittedOrderId(autoOrderId);
    }
  }, [autoOrderId, submittedOrderId]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order-tracking", submittedOrderId],
    enabled: !!submittedOrderId,
    queryFn: async () => {
      const res = await axios.get(
        `/orders/${submittedOrderId}/tracking`
      );
      return res.data;
    },
  });

  const timeline = buildTimeline(data?.updates || []);

  if (!order) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold mb-4">
          No order data found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl text-color mx-auto p-6 space-y-10">
      {/* ---------- ORDER DETAILS ---------- */}
      <div className="rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>

        <div className="space-y-2 text-sm">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Email:</strong> {order.email}</p>

          <hr />

          <p><strong>Product:</strong> {order.productTitle}</p>
          <p><strong>Product ID:</strong> {order.productId}</p>
          <p><strong>Unit Price:</strong> ৳{order.unitPrice}</p>
          <p><strong>Quantity:</strong> {order.orderQuantity}</p>
          <p><strong>Total Price:</strong> ৳{order.orderPrice}</p>

          <hr />

          <p><strong>Payment:</strong> {order.paymentOption}</p>
          <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
          <p><strong>Contact:</strong> {order.contactNumber}</p>
          <p><strong>Address:</strong> {order.deliveryAddress}</p>

          {order.additionalNotes && (
            <p><strong>Notes:</strong> {order.additionalNotes}</p>
          )}

          <hr />

          <p>
            <strong>Created:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          {order.approvedAt && (
            <p>
              <strong>Approved:</strong>{" "}
              {new Date(order.approvedAt).toLocaleString()}
            </p>
          )}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-gray-800 text-white rounded"
        >
          Back
        </button>
      </div>

      {/* ---------- TRACKING ---------- */}
      <div className=" rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-1">Order Tracking</h2>
        <p className="text-sm text-gray-500 mb-6">
          Manufacturing & delivery progress
        </p>

        {isLoading && <Loading />}

        {isError && (
          <p className="text-red-500">
            Failed to load tracking information.
          </p>
        )}

        {!isLoading && !isError && data?.updates?.length === 0 && (
          <p className="text-gray-500">
            No tracking updates found for this order.
          </p>
        )}

        {data?.updates?.length > 0 && (
          <>
            {/* ---------- TIMELINE ---------- */}
            <div className=" rounded-2xl p-8 mb-10 overflow-x-auto">
              <div className="flex justify-between relative min-w-[600px]">
                {timeline.map((step, index) => (
                  <div
                    key={step.status}
                    className="flex flex-col items-center relative w-full"
                  >
                    {index !== 0 && (
                      <div
                        className={`absolute -left-1/2 top-6 h-1 w-full ${
                          step.state !== "pending"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                    )}

                    <motion.div
                      animate={
                        step.state === "active"
                          ? { scale: [1, 1.2, 1] }
                          : {}
                      }
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow ${
                        step.state === "completed"
                          ? "bg-green-500 text-white"
                          : step.state === "active"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300 text-gray-500"
                      }`}
                    >
                      {step.state === "completed" ? "✓" : "●"}
                    </motion.div>

                    <p className="mt-3 text-xs text-center w-24 font-semibold">
                      {step.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- HISTORY ---------- */}
            <div className="space-y-4">
              {timeline
                .filter((s) => s.state !== "pending")
                .reverse()
                .map((step) => (
                  <div
                    key={step.status}
                    className=" p-4 rounded-xl shadow border-l-4 border-green-500"
                  >
                    <h3 className="font-semibold">{step.status}</h3>

                    {step.createdAt && (
                      <p className="text-sm text-gray-500">
                        {new Date(step.createdAt).toLocaleString()}
                      </p>
                    )}

                    {step.location && (
                      <p className="text-sm text-gray-600 mt-1">
                        📍 {step.location}
                      </p>
                    )}

                    {step.note && (
                      <p className="text-sm mt-2 text-gray-700">
                        “{step.note}”
                      </p>
                    )}

                    {step.skipped && (
                      <p className="text-xs italic text-gray-400 mt-1">
                        (Automatically completed)
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewDetails;
