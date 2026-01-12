import { useNavigate, useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import useRole from "../../hooks/useRole";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useAuth from "../../hooks/useAuth";

const ProductDetails = () => {
  const { state } = useLocation();
  const { productId } = useParams();
  const navigate = useNavigate();
  const role = useRole();
  const { user } = useAuth();
  useDocumentTitle("Product Details");
  const [product, setProduct] = useState(state);
  const [loading, setLoading] = useState(!state);
  const [mainImage, setMainImage] = useState(
    state ? state.productImg : null
  );
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOrder = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (role?.status === "suspended") {
      setShowSuspendModal(true);
      return;
    }
    navigate(`/order/${product.productId}`);
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
    </div>
  );
  if (!product) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-color">Product not found.</p>
    </div>
  );

  const isOrderDisabled = role?.role === "admin" || role?.role === "manager";
  const thumbnails = [product.productImg_2, product.productImg_3, product.productImg_4];

  return (
    <>
      <div className="min-h-screen outlet-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-color">
            <button onClick={() => navigate(-1)} className="hover:opacity-70 transition-opacity">
              ← Back
            </button>
            <span>/</span>
            <span className="font-medium">{product.category}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

            {/* LEFT IMAGE GALLERY */}
            <div className="flex flex-col items-center justify-start">
              {/* Main Image */}
              <div className="w-full aspect-square mb-6 border border-gray-300 overflow-hidden hover:border-gray-500 transition-all duration-300">
                <img
                  src={mainImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-3 gap-3 w-full">
                {thumbnails.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleThumbnailClick(img)}
                    className={`aspect-square overflow-hidden border transition-all duration-200 ${
                      mainImage === img
                        ? "border-gray-500"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumbnail ${idx + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT PRODUCT INFO */}
            <div className="flex flex-col justify-start">
              {/* Product Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-color mb-2 capitalize leading-tight">
                {product.title}
              </h1>

              {/* Category Badge */}
              <div className="mb-6 flex items-center gap-2">
                <span className="inline-block px-3 py-1 border border-gray-300 text-color text-xs font-semibold uppercase tracking-wide">
                  {product.category}
                </span>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-gray-300">
                <p className="text-4xl font-bold text-red-500 mb-2">
                  ${parseFloat(product.price).toFixed(2)}
                </p>
                <p className="text-sm text-color">
                  Minimum Order: <span className="font-semibold">{product.minOrderQuantity} units</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-color leading-relaxed mb-8 text-base">
                {product.description}
              </p>

              {/* Product Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-4 border border-gray-300">
                <div>
                  <p className="text-xs font-semibold text-color uppercase tracking-wide mb-1">
                    Available Quantity
                  </p>
                  <p className="text-lg font-bold text-color">
                    {product.availableQuantity} units
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-color uppercase tracking-wide mb-1">
                    Payment Option
                  </p>
                  <p className="text-lg font-bold text-color">
                    {product.paymentOption}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold text-color uppercase tracking-wide mb-1">
                    Product ID
                  </p>
                  <p className="text-sm font-mono text-color border border-gray-300 px-3 py-2">
                    {product.productId}
                  </p>
                </div>
              </div>

              {/* Order Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOrder();
                }}
                disabled={!user || isOrderDisabled}
                title={
                  !user
                    ? "Please login to place an order"
                    : isOrderDisabled
                    ? "Admins and Managers cannot place orders"
                    : ""
                }
                className={`w-full py-3 px-6 font-semibold text-base transition-all duration-200 ${
                  !user || isOrderDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white active:scale-95"
                }`}
              >
                {!user ? "Login to Order" : isOrderDisabled ? "Order Unavailable" : "Order Now"}
              </button>

              {/* Info Text */}
              {(!user || isOrderDisabled) && (
                <p className="text-xs text-color text-center mt-3">
                  {!user
                    ? "Please login to place an order"
                    : "Admins and Managers cannot place orders"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SUSPENDED MODAL */}
      {showSuspendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white outlet-color p-6 sm:p-8 max-w-sm w-full text-center border border-gray-300">
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 0V7m0 6h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-color mb-3">Action Restricted</h2>
            <p className="text-color mb-6 leading-relaxed">
              Your account has been suspended. You cannot place orders at this time.
              <br />
              <span className="text-sm">Please contact support for assistance.</span>
            </p>
            <button
              onClick={() => setShowSuspendModal(false)}
              className="w-full bg-black text-white font-semibold py-2 px-4 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white outlet-color p-6 sm:p-8 max-w-sm w-full text-center border border-gray-300">
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-color mb-3">Login Required</h2>
            <p className="text-color mb-6 leading-relaxed">
              Please login to your account to place an order.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 px-4 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  navigate("/login");
                }}
                className="flex-1 bg-black text-white font-semibold py-2 px-4 transition-colors duration-200"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
