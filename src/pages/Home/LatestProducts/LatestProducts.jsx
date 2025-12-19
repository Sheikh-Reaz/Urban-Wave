import React from "react";
import ProductCard from "../../../components/ProductCard";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const LatestProducts = () => {
  const axios = useAxios();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latest-products"],
    queryFn: async () => {
      const res = await axios.get("/latest-products");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Loading latest products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load products
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-8">


      {/* Products Grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products available
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestProducts;
