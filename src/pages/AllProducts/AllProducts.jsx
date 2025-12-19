import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";
import backgroundImage from "../../assets/pattern_light2.png";


const AllProducts = () => {
  const axios = useAxios();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [axios]);

  if (loading) return <Loading/>

  return (
    <div 
            style={{
              backgroundImage:
                theme === "dark"
                  ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${backgroundImage})`
                  : `url(${backgroundImage})`,
              backgroundRepeat: "repeat",
              backgroundSize: "auto",
              width: "100%",
              minHeight: "500px",
              transition: "background 0.4s ease",
            }}
    className="p-4 min-h-screen ">
      <h2 className="title-font text-5xl text-center mb-6">All Products</h2>

      <div className="grid max-w-7xl mx-auto grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
