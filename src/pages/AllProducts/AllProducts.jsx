import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";
import backgroundImage from "../../assets/pattern_light2.png";
import useDocumentTitle from "../../hooks/useDocumentTitle";


const AllProducts = () => {
  const axios = useAxios();
  const { theme } = useTheme();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PRODUCTS_PER_PAGE = 6;

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get("/products", {
        params: { search, page, limit: PRODUCTS_PER_PAGE },
      })
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);
  useDocumentTitle("All Products");
  if (loading) return <Loading />;


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
      className="p-4 min-h-screen"
    >
      
      <div>
        <h2 className="title-font text-5xl text-center mb-6">All Products</h2>

      {/* Search Input Only */}
      <div className="flex justify-center max-w-7xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Products Grid */}
      <div className="grid max-w-7xl mx-auto grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      </div>
    </div>
  );
};

export default AllProducts;
