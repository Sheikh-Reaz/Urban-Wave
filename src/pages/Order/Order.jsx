import React, { useState, useEffect } from "react";
import ButtonAnimation from "../../components/ButtonAnimation";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Order = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderPrice, setOrderPrice] = useState(0);
  const [productId, setProductId] = useState(null);
  const [isValidQuantity, setIsValidQuantity] = useState(true);

  const { register, handleSubmit, watch, setError, clearErrors, formState: { errors }, reset } = useForm();
  const orderQuantity = watch("orderQuantity");

  /* ==========================
     GET PRODUCT ID FROM URL
  ========================== */
  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const id = pathParts[pathParts.length - 1];
    if (!id) {
      Swal.fire("Error", "No product ID provided", "error");
      setLoading(false);
      return;
    }
    setProductId(id);
  }, []);

  /* ==========================
     FETCH PRODUCT
  ========================== */
  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    axios.get(`/product/${productId}`)
      .then(res => {
        if (!res.data) {
          Swal.fire("Error", "Product not found", "error");
          setProduct(null);
        } else {
          setProduct(res.data);
          setOrderPrice(res.data.price);
        }
      })
      .catch(err => {
        console.error(err);
        Swal.fire("Error", "Product fetch failed", "error");
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [productId, axios]);

  /* ==========================
     ORDER QUANTITY & PRICE VALIDATION
  ========================== */
  useEffect(() => {
    if (!product) return;

    const qty = Number(orderQuantity);

    if (!qty) {
      setOrderPrice(product.price);
      clearErrors("orderQuantity");
      setIsValidQuantity(true);
      return;
    }

    if (qty < product.minOrderQuantity) {
      setError("orderQuantity", {
        type: "min",
        message: `Quantity cannot be less than ${product.minOrderQuantity}`,
      });
      setIsValidQuantity(false);
    } else if (qty > product.availableQuantity) {
      setError("orderQuantity", {
        type: "max",
        message: `Quantity cannot exceed ${product.availableQuantity}`,
      });
      setIsValidQuantity(false);
    } else {
      clearErrors("orderQuantity");
      setOrderPrice(qty * product.price);
      setIsValidQuantity(true);
    }
  }, [orderQuantity, product, setError, clearErrors]);

  /* ==========================
     HANDLE PAYMENT SUCCESS (AFTER REDIRECT)
  ========================== */
  console.log(product);
  
  useEffect(() => {
    if (!product) return;

    const searchParams = new URLSearchParams(window.location.search);
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (success && product.paymentOption === "PayFirst") {
      const postOrder = async () => {
        try {
          const orderData = {
            sellerEmail:product.sellerEmail,
            buyerEmail: user?.email,
            productId: product.productId,
            productTitle: product.title,
            unitPrice: Number(product.price),
            paymentOption: product.paymentOption,
            orderQuantity: Number(orderQuantity || product.minOrderQuantity),
            orderPrice,
            firstName: "", 
            lastName: "",
            contactNumber: "",
            deliveryAddress: "",
            additionalNotes: "",
            createdAt: new Date(),
          };

          await axios.post("/order", orderData);

          await Swal.fire("Success", "Order completed successfully!", "success");
          setTimeout(() => {
            navigate("/dashboard/my-orders");
          }, 1500);
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to complete order.", "error");
        }
      };

      postOrder();
      searchParams.delete("success");
      window.history.replaceState(null, "", `${window.location.pathname}`);
    }

    if (canceled && product.paymentOption === "PayFirst") {
      Swal.fire("Payment canceled", "You canceled the payment.", "info");
      searchParams.delete("canceled");
      window.history.replaceState(null, "", `${window.location.pathname}`);
    }
  }, [product, orderQuantity, orderPrice, user, axios, navigate]);
  /* ==========================
     SUBMIT ORDER
  ========================== */
  const onSubmit = async (data) => {
    if (product.paymentOption === "Cash on Delivery") {
      // Immediate order post
      try {
        const orderData = {
          sellerEmail:product.sellerEmail,
          buyerEmail: user?.email,
          productId: product.productId,
          productTitle: product.title,
          unitPrice: Number(product.price),
          paymentOption: product.paymentOption,
          orderQuantity: Number(data.orderQuantity),
          orderPrice,
          firstName: data.firstName,
          lastName: data.lastName,
          contactNumber: data.contactNumber,
          deliveryAddress: data.deliveryAddress,
          additionalNotes: data.additionalNotes || "",
          createdAt: new Date(),
        };

        await axiosSecure.post("/order", orderData);

        await Swal.fire("Success", "Order placed successfully!", "success");
        reset();
        setOrderPrice(Number(product.price));

        setTimeout(() => {
          navigate("/dashboard/my-orders");
        }, 1500);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to place order.", "error");
      }

    } else if (product.paymentOption === "PayFirst") {
      // PayFirst via Stripe
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You have to pay ${orderPrice} USD`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Pay Now!!",
      });

      if (result.isConfirmed) {
        try {
          const paymentInfo = {
            cost: orderPrice,
            productId: product.productId,
            productTitle: product.title,
            email: user.email,
          };

          const res = await axios.post("/create-checkout-session", paymentInfo);
          window.location.href = res.data.url;
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Payment failed. Please try again.", "error");
        }
      }
    }
  };

  /* ==========================
     RENDER FORM
  ========================== */
    useDocumentTitle("Order");
  if (loading) return <Loading/>;
  if (!product) return <Loading/>;

  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <p className="title-font text-5xl text-center mt-8">Order Form</p>
      <div className="p-2 flex justify-center min-h-screen">
        <div className="my-12 border border-gray-300 bg-color w-full max-w-3xl">
          <form className="card-body w-full" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="label text-color form-label">Email</label>
                  <input type="email" value={user?.email || ""} readOnly className="input input-field" />
                </div>

                {/* Product Title */}
                <div>
                  <label className="label text-color form-label">Product Title</label>
                  <input type="text" value={product.title} readOnly className="input input-field" />
                </div>

                {/* Payment Info */}
                <div>
                  <label className="label text-color form-label">Payment Info</label>
                  <input type="text" value={product.paymentOption} readOnly className="input input-field" />
                </div>

                {/* First Name */}
                <div>
                  <label className="label text-color form-label">First Name</label>
                  <input type="text" {...register("firstName", { required: true })} className="input input-field" />
                  {errors.firstName && <p className="text-red-500">First name is required</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label className="label text-color form-label">Last Name</label>
                  <input type="text" {...register("lastName", { required: true })} className="input input-field" />
                  {errors.lastName && <p className="text-red-500">Last name is required</p>}
                </div>

                {/* Order Quantity */}
                <div>
                  <label className="label text-color form-label">Order Quantity</label>
                  <input
                    type="number"
                    {...register("orderQuantity", { required: true })}
                    className="input input-field"
                    placeholder={`Min ${product.minOrderQuantity}, Max ${product.availableQuantity}`}
                  />
                  {errors.orderQuantity && <p className="text-red-500">{errors.orderQuantity.message}</p>}
                </div>

                {/* Order Price */}
                <div>
                  <label className="label text-color form-label">Order Price (per unit: ${product.price})</label>
                  <input type="text" value={orderPrice} readOnly className="input input-field cursor-not-allowed" />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="label text-color form-label">Contact Number</label>
                  <input type="tel" {...register("contactNumber", { required: true })} className="input input-field" />
                </div>

                {/* Delivery Address */}
                <div className="md:col-span-2">
                  <label className="label text-color form-label">Delivery Address</label>
                  <textarea {...register("deliveryAddress", { required: true })} className="input input-field" />
                </div>

                {/* Additional Notes */}
                <div className="md:col-span-2">
                  <label className="label text-color form-label">Additional Notes</label>
                  <textarea {...register("additionalNotes")} className="input input-field" />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-center mt-6">
                <ButtonAnimation
                  className="w-full"
                  width={310}
                  height={60}
                  speed={3}
                  type="submit"
                  disabled={!isValidQuantity}
                >
                  <span className="font-semibold title-font text-2xl">Submit Order</span>
                </ButtonAnimation>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
