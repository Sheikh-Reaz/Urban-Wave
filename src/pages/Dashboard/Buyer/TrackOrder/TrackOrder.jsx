import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxios from "../../../../hooks/useAxios";
import Loading from "../../../../components/Loading";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";

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
  if (!updates) updates = []; // Safety check
  const map = {};
  updates.forEach((u) => (map[u.status] = u));
  
  // Find the index of the latest status present in the updates
  const lastIndex = Math.max(...updates.map(u => STATUS_FLOW.indexOf(u.status)), -1);

  return STATUS_FLOW.map((status, index) => {
    // 1. If the step is explicitly in the updates, it is completed
    if (map[status]) return { ...map[status], status, state: "completed" };

    // 2. If the step is NOT in updates, but comes BEFORE the latest step, it was skipped
    if (index < lastIndex) return { status, state: "completed", skipped: true };

    // 3. The step immediately following the latest completed step is "active"
    if (index === lastIndex + 1) return { status, state: "active" };

    // 4. All other future steps are pending
    return { status, state: "pending" };
  });
};
 
const TrackOrder = () => {
  const { orderId: urlOrderId } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();
useDocumentTitle("Track Orders");
  const [submittedOrderId, setSubmittedOrderId] = useState(urlOrderId || "");
  const [orderIdInput, setOrderIdInput] = useState(urlOrderId || "");

  // ✅ FIX: Added submittedOrderId to dependency array
  useEffect(() => {
    if (urlOrderId && urlOrderId !== submittedOrderId) {
      setSubmittedOrderId(urlOrderId);
      setOrderIdInput(urlOrderId);
    }
  }, [urlOrderId, submittedOrderId]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order-tracking", submittedOrderId],
    enabled: !!submittedOrderId,
    queryFn: async () => {
      const res = await axios.get(`/orders/${submittedOrderId}/tracking`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    setSubmittedOrderId(orderIdInput.trim());
    navigate(`/dashboard/track-orders/${orderIdInput.trim()}`);
  };

  // Safe access to updates
  const timeline = buildTimeline(data?.updates || []);
 useDocumentTitle("Track Orders");
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Track Your Order</h1>
        <p className="text-sm text-gray-500">View manufacturing & delivery progress</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          type="text"
          value={orderIdInput}
          onChange={(e) => setOrderIdInput(e.target.value)}
          placeholder="Enter Order ID"
          className="flex-1 border px-4 py-2 rounded-l-xl"
        />
        <button className="bg-blue-600 text-white px-6 rounded-r-xl hover:bg-blue-700 transition">
          Search
        </button>
      </form>

      {isLoading && <Loading />}
      
      {isError && (
        <p className="text-red-500 mb-4">
          Failed to load tracking information. Please check the ID and try again.
        </p>
      )}

      {/* Show message if searched but no updates exist */}
      {submittedOrderId && !isLoading && !isError && data?.updates?.length === 0 && (
        <p className="text-gray-500">No tracking updates found for this order ID.</p>
      )}

      {/* Only render timeline if we have updates */}
      {data?.updates?.length > 0 && (
        <>
          <div className="bg-gray-100 rounded-2xl p-8 mb-12 overflow-x-auto">
            <div className="flex justify-between relative min-w-[600px]">
              {timeline.map((step, index) => (
                <motion.div 
                  key={step.status} 
                  className="flex flex-col items-center relative z-10 w-full"
                >
                  {index !== 0 && (
                    <div 
                      className={`absolute -left-1/2 top-6 h-1 w-full -z-10 ${
                        step.state !== "pending" ? "bg-green-500" : "bg-gray-300"
                      }`} 
                    />
                  )}

                  <motion.div
                    animate={step.state === "active" ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-4 border-white ${
                      step.state === "completed"
                        ? "bg-green-500 text-white"
                        : step.state === "active"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    {step.state === "completed" ? "✓" : "●"}
                  </motion.div>

                  <p className="mt-3 text-xs w-24 text-center font-semibold leading-tight">
                    {step.status}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {timeline
              .filter((s) => s.state !== "pending")
              .reverse() // Optional: Show newest updates at the top
              .map((step, index) => (
                <motion.div
                  key={step.status}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500"
                >
                  <h3 className="font-semibold text-lg">{step.status}</h3>
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
                    <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">
                      "{step.note}"
                    </p>
                  )}
                  {step.skipped && (
                    <p className="text-xs italic text-gray-400 mt-1">
                      (Step automatically marked as completed)
                    </p>
                  )}
                </motion.div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TrackOrder;