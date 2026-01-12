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

  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [products, setProducts] = useState([]); // Filtered products for display
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PRODUCTS_PER_PAGE = 8;

  // Fetch all products once
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/products", {
        params: { limit: 1000 }, // Get all products at once
      });
      setAllProducts(res.data.products || []);
      setProducts(res.data.products || []); // Initialize with all products
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Filter products based on search and category (client-side)
  useEffect(() => {
    let filtered = allProducts;

    // Filter by category
    if (category) {
      filtered = filtered.filter(product => 
        product.category && product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search
    if (search) {
      filtered = filtered.filter(product => 
        product.title && product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Calculate pagination
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const paginatedProducts = filtered.slice(startIndex, endIndex);
    
    setProducts(paginatedProducts);
    setTotalPages(Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  }, [allProducts, search, category, page]);

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

      {/* Search and Filter Section - Mobile Responsive */}
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto mb-6 gap-4">
        {/* Search Input - Left */}
        <div className="w-full md:w-auto md:flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 p-3 border-2 border-gray-300 dark:border-gray-600 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        
        {/* Category Dropdown - Right */}
        <div className="w-full md:w-auto">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-48 p-3 border-2 border-gray-300 dark:border-gray-600 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="">All Categories</option>
            <option value="shirt">Shirt</option>
            <option value="pant">Pant</option>
            <option value="jacket">Jacket</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid max-w-7xl mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
