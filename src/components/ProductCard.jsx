import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.productId}`, { state: product });
  };

  return (
    <div
      onClick={handleViewDetails}
      className="group relative cursor-pointer border border-gray-300 p-3
                 transition-all duration-600 ease-in-out hover:border-gray-500"
    >
      {/* Image Container */}
      <div className="relative w-full overflow-hidden ">
        <img
          src={product.productImg}
          alt={product.title}
          className="w-full h-80 md:h-96 object-cover"
        />

        {/* View Details Button Overlay */}
        <div className="absolute bottom-0 left-0 w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="w-full bg-black text-white text-xs font-bold uppercase tracking-widest py-3
                       md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100
                       transition-all duration-200 ease-in-out"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-3 text-left">
        {/* Stock Status */}
       <div className="border-b-gray-200  border-b" >
         <p className="text-sm  text-color font-thin  mb-1">
          {product.availableQuantity > 0 ? "In Stock" : "Out Of Stock"}
        </p>
       </div>

        {/* Title */}
        <h3 className=" text-3xl  text-color  uppercase ">
          {product.title}
        </h3>

        {/* Category */}
        <p className="text-sm text-color font-light mt-1 capitalize">
          {product.category}
        </p>
        {/* Category */}
        <p className="text-sm text-color line-clamp-2 mt-1 capitalize">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-xl font-medium text-red-500 mt-2">
          ${product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
