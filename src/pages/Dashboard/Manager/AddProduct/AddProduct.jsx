import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ButtonAnimation from "../../../../components/ButtonAnimation";
import ImageDropBox from "../../../../components/ImageDropBox";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ✅ State for images from ImageDropBox
  const [productImages, setProductImages] = useState({
    box1: null,
    box2: null,
    box3: null,
    box4: null,
  });

  // ✅ Loading state
  const [loading, setLoading] = useState(false);

  // ✅ Upload a single image to imgbb
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

  // ✅ Form submit handler
  const handleAddProduct = async (data) => {
    // Validate main image
    if (!productImages.box1) {
      Swal.fire("Error", "Please upload the main product image", "error");
      return;
    }

    setLoading(true); // show loading

    try {
      // Upload images
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

      // Merge form data + image URLs
      const productData = {
        ...data,
        productImg,
        productImg_2,
        productImg_3,
        productImg_4,
        createdAt: new Date(),
        email: user.email,
      };

      // Send to backend
      await axiosSecure.post("/add-product", productData);

      Swal.fire("Success", "Product added successfully!", "success");

      // Reset form and images
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
    <div>
      <div>
        <h1 className="title-font text-bold text-xl md:text-4xl text-center">
          Add Product page
        </h1>
      </div>

      {loading && <Loading />}
      {loading && <Loading />}
      {loading && <Loading />}
      {loading && <Loading />}
      {loading && <Loading />}
      {loading && <Loading />}

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Form */}
        <div className="my-12 border border-gray-300 bg-white">
          <form
            className="card-body w-full"
            onSubmit={handleSubmit(handleAddProduct)}
          >
            <fieldset className="fieldset">
              {/* 2 Column Grid Wrapper */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Title */}
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

                {/* Category */}
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

                {/* Price */}
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

                {/* Available Quantity */}
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

                {/* Minimum Order Quantity */}
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

                {/* Payment Option */}
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

                {/* Demo Video Link */}
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

                {/* Show on Home Page */}
                <div className="flex items-center gap-2 mt-8">
                  <input
                    type="checkbox"
                    {...register("showOnHome")}
                    className="checkbox"
                  />
                  <label className="label form-label">Show on Home Page</label>
                </div>
              </div>

              {/* Full Width Fields */}
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

        {/* Image Upload Section */}
        <div>
          <ImageDropBox
            productImages={productImages}
            setProductImages={setProductImages}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
