import { useNavigate, useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import useRole from "../../hooks/useRole";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const ProductDetails = () => {
  const { state } = useLocation();
  const { productId } = useParams();
  const navigate = useNavigate();
  const role = useRole();
  useDocumentTitle("Product Details");
  const [product, setProduct] = useState(state);
  const [loading, setLoading] = useState(!state);
  const [mainImage, setMainImage] = useState(
    state ? state.productImg : null
  );

  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const handleOrder = () => {
    if (role?.status === "suspended") {
      setShowSuspendModal(true);
      return;
    }
    navigate(`/order/${product.productId}`);
  };

  useEffect(() => {
    if (!product) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/product/${productId}`
          );
          setProduct(res.data);
          setMainImage(res.data.productImg);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [product, productId]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  // Check if user is admin or manager
  const isOrderDisabled =
    role?.role === "admin" || role?.role === "manager";
    

  return (
    <>
      <div className="max-w-[1100px] min-h-screen mx-auto mt-10 px-4 flex flex-col md:flex-row">

        {/* ---------------- LEFT IMAGE GALLERY ---------------- */}
        <div className="md:w-1/2 md:pr-10 flex flex-col items-center">
          <div className="w-full max-w-[450px] aspect-square mb-4">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 w-full max-w-[450px]">
            <div className="aspect-square">
              <img
                src={product.productImg_2}
                alt="thumb 2"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="aspect-square">
              <img
                src={product.productImg_3}
                alt="thumb 3"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="aspect-square">
              <img
                src={product.productImg_4}
                alt="thumb 4"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT PRODUCT INFO ---------------- */}
        <div className="md:w-1/2 md:pl-10 mt-10 md:mt-0">
          <h1 className="text-4xl font-normal mb-1 capitalize">
            {product.title}
          </h1>

          <p className="text-3xl font-semibold mb-6">${product.price}</p>

          <p className="text-gray-700 leading-7 mb-10 text-sm">
            {product.description}
          </p>

          <p>
            <span className="font-bold uppercase mr-2">Category:</span>
            {product.category}
          </p>

          <div className="space-y-1 text-sm">
            <p>
              <span className="font-bold uppercase mr-2">SKU:</span>
              {product.availableQuantity}
            </p>
            <p>
              <span className="font-bold uppercase mr-2">
                Minimum Order Quantity:
              </span>
              {product.minOrderQuantity}
            </p>
            <p>
              <span className="font-bold uppercase mr-2">Payment Option:</span>
              {product.paymentOption}
            </p>
            <p>
              <span className="font-bold uppercase mr-2">Product Id:</span>
              {product.productId}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOrder();
              }}
              className="btn"
              disabled={isOrderDisabled}
              title={
                isOrderDisabled
                  ? "Admins and Managers cannot place orders"
                  : ""
              }
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- SUSPENDED MODAL ---------------- */}
      {showSuspendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-md max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-3">Action Restricted</h2>
            <p className="text-gray-700 mb-6">
              Sorry you cannot place order. You have been suspended.
              <br />
              Please contact authority.
            </p>
            <button
              onClick={() => setShowSuspendModal(false)}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
