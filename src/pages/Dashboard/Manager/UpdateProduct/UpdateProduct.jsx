import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

import Loading from "../../../../components/Loading";
import ButtonAnimation from "../../../../components/ButtonAnimation";
import ImageDropBox from "../../../../components/ImageDropBox";
import useRole from "../../../../hooks/useRole";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
useDocumentTitle("Update Products");
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState({
    box1: null,
    box2: null,
    box3: null,
    box4: null,
  });

const role = useRole();
const userRole = role.role


 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch existing product and prefill form
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/product/${productId}`);
        const data = res.data;
        reset({
          title: data.title,
          category: data.category,
          price: data.price,
          availableQuantity: data.availableQuantity,
          minOrderQuantity: data.minOrderQuantity,
          paymentOption: data.paymentOption,
          videoLink: data.videoLink,
          showOnHome: data.showOnHome,
          description: data.description,
        });

        setProductImages({
          box1: data.productImg || null,
          box2: data.productImg_2 || null,
          box3: data.productImg_3 || null,
          box4: data.productImg_4 || null,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, axiosSecure, reset]);

  // Upload image to ImgBB
  const uploadImageToImgBB = async (imageFile) => {
    if (!imageFile) return "";
    if (typeof imageFile === "string") return imageFile; // already a URL

    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_Image_Host_Key
      }`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.data.display_url;
  };

  // Handle update form submit
  const handleUpdateProduct = async (data) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this product?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const updatedImages = {
        productImg: await uploadImageToImgBB(productImages.box1),
        productImg_2: await uploadImageToImgBB(productImages.box2),
        productImg_3: await uploadImageToImgBB(productImages.box3),
        productImg_4: await uploadImageToImgBB(productImages.box4),
      };

      const updatedProductData = { ...data, ...updatedImages };

      const res = await axiosSecure.patch(
        `/update-product/${productId}`,
        updatedProductData
      );

      if (res.data.success) {
        Swal.fire("Updated!", res.data.message, "success");
      } else {
        Swal.fire("Info", res.data.message, "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleNavigate = () =>{
    if(userRole==="manager"){
      navigate("/dashboard/manage-products")
    }else{
      navigate("/dashboard/all-products")
    }
  }

  if (loading) return <Loading />;

  return (
    <div className="p-4">
      {/* Back button */}
      <button
        onClick={() => handleNavigate() }
        className="btn mb-4"
      >
        ← Back to Manage Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="border border-gray-300 bg-white p-4">
          <form
            onSubmit={handleSubmit(handleUpdateProduct)}
            className="card-body w-full"
          >
            <fieldset className="fieldset">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Title */}
                <div>
                  <label className="label form-label">Product Title</label>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    className="input input-field"
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
                  <label className="label form-label">Demo Video Link</label>
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

              {/* Description */}
              <div className="mt-4">
                <label className="label form-label">Product Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="input input-field"
                />
                {errors.description && (
                  <p className="text-red-500">Description is required</p>
                )}
              </div>
            </fieldset>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate("/dashboard/manage-products")}
              >
                Cancel
              </button>

              <ButtonAnimation width={200} height={50} speed={3} type="submit">
                Update Product
              </ButtonAnimation>
            </div>
          </form>
        </div>

        {/* Right: ImageDropBox */}
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

export default UpdateProduct;
