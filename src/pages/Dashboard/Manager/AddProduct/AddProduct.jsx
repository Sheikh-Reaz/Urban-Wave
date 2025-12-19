import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ButtonAnimation from "../../../../components/ButtonAnimation";
import ImageDropBox from "../../../../components/ImageDropBox";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading";
import useRole from "../../../../hooks/useRole";

const AddProduct = () => {
  const role = useRole();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [productImages, setProductImages] = useState({
    box1: null,
    box2: null,
    box3: null,
    box4: null,
  });

  const [loading, setLoading] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Host_Key}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.data.display_url;
  };

  const handleAddProduct = async (data) => {
    // 🚫 Suspended check
    if (role?.status === "suspended") {
      setShowSuspendModal(true);
      return;
    }

    if (!productImages.box1) {
      Swal.fire("Error", "Please upload the main product image", "error");
      return;
    }

    setLoading(true);

    try {
      const productImg = await uploadImageToImgBB(productImages.box1);
      const productImg_2 = productImages.box2
        ? await uploadImageToImgBB(productImages.box2)
        : "";
      const productImg_3 = productImages.box3
        ? await uploadImageToImgBB(productImages.box3)
        : "";
      const productImg_4 = productImages.box4
        ? await uploadImageToImgBB(productImages.box4)
        : "";

      const productData = {
        ...data,
        productImg,
        productImg_2,
        productImg_3,
        productImg_4,
        createdAt: new Date(),
        sellerEmail: user.email,
      };

      await axiosSecure.post("/add-product", productData);

      Swal.fire("Success", "Product added successfully!", "success");

      reset();
      setProductImages({ box1: null, box2: null, box3: null, box4: null });
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Something went wrong while uploading images", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}

      <div>
        <h1 className="title-font text-bold text-xl md:text-4xl text-center">
          Add Product page
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="my-12 border border-gray-300 bg-white">
          <form
            className="card-body w-full"
            onSubmit={handleSubmit(handleAddProduct)}
          >
            <fieldset className="fieldset">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label form-label">Product Title</label>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    className="input input-field"
                    placeholder="Product Title"
                  />
                  {errors.title && (
                    <p className="text-red-500">Product title is required</p>
                  )}
                </div>

                <div>
                  <label className="label form-label">Category</label>
                  <select
                    {...register("category", { required: true })}
                    className="input input-field"
                  >
                    <option value="">Select Category</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pant">Pant</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500">Category is required</p>
                  )}
                </div>

                <div>
                  <label className="label form-label">Price</label>
                  <input
                    type="number"
                    {...register("price", { required: true })}
                    className="input input-field"
                    placeholder="Price"
                  />
                  {errors.price && (
                    <p className="text-red-500">Price is required</p>
                  )}
                </div>

                <div>
                  <label className="label form-label">Available Quantity</label>
                  <input
                    type="number"
                    {...register("availableQuantity", { required: true })}
                    className="input input-field"
                    placeholder="Available Quantity"
                  />
                  {errors.availableQuantity && (
                    <p className="text-red-500">
                      Available quantity is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="label form-label">
                    Minimum Order Quantity
                  </label>
                  <input
                    type="number"
                    {...register("minOrderQuantity", { required: true })}
                    className="input input-field"
                    placeholder="Minimum Order Quantity"
                  />
                  {errors.minOrderQuantity && (
                    <p className="text-red-500">
                      Minimum order quantity is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="label form-label">Payment Option</label>
                  <select
                    {...register("paymentOption", { required: true })}
                    className="input input-field"
                  >
                    <option value="">Select Payment Option</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="PayFirst">PayFirst</option>
                  </select>
                  {errors.paymentOption && (
                    <p className="text-red-500">Payment option is required</p>
                  )}
                </div>

                <div>
                  <label className="label form-label">
                    Demo Video Link (Optional)
                  </label>
                  <input
                    type="url"
                    {...register("videoLink")}
                    className="input input-field"
                    placeholder="https://"
                  />
                </div>

                <div className="flex items-center gap-2 mt-8">
                  <input
                    type="checkbox"
                    {...register("showOnHome")}
                    className="checkbox"
                  />
                  <label className="label form-label">Show on Home Page</label>
                </div>
              </div>

              <div className="mt-4">
                <label className="label form-label">Product Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="input input-field"
                  placeholder="Product Description"
                />
                {errors.description && (
                  <p className="text-red-500">Description is required</p>
                )}
              </div>
            </fieldset>

            <div className="flex justify-center">
              <ButtonAnimation
                className="w-full"
                width={310}
                height={60}
                speed={3}
                type="submit"
              >
                <span className="w-full font-semibold title-font text-2xl">
                  Submit
                </span>
              </ButtonAnimation>
            </div>
          </form>
        </div>

        <div>
          <ImageDropBox
            productImages={productImages}
            setProductImages={setProductImages}
          />
        </div>
      </div>

      {/* ----------- SUSPENDED MODAL ----------- */}
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

export default AddProduct;
