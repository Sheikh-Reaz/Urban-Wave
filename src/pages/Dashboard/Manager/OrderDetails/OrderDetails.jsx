import { useLocation, useNavigate } from "react-router";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";

const OrderDetails = () => {
  const { state: order } = useLocation();
  const navigate = useNavigate();
useDocumentTitle("Order Details");
  if (!order) {
    return (
      <div>
        <h2>No order data found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="space-y-2">
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

        <p><strong>Payment Option:</strong> {order.paymentOption}</p>
        <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
        <p><strong>Contact:</strong> {order.contactNumber}</p>
        <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>

        {order.additionalNotes && (
          <p><strong>Notes:</strong> {order.additionalNotes}</p>
        )}

        <hr />

        <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>

        {order.approvedAt && (
          <p><strong>Approved At:</strong> {new Date(order.approvedAt).toLocaleString()}</p>
        )}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-gray-800 text-white rounded"
      >
        Back
      </button>
    </div>
  );
};

export default OrderDetails;
