import React from "react";
import Banner from "./Banner/Banner";
import backgroundImage from "../../assets/pattern_light2.png";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";
import ProductCard from "./ProductCards/ProductCard";
import HowItWorks from "./HowItWorks/HowItWorks";
import GridSection from "./GridSection/GridSection";
import Reviews from "./Reviews/Reviews";
import Brands from "./Brands/Brands";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  const { theme } = useTheme();

  return (
    <div>
      <Banner />

      {/* ================= BACKGROUND WRAPPER ================= */}
      <div
        style={{
          backgroundImage:
            theme === "dark"
              ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`
              : `url(${backgroundImage})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          width: "100%",
          minHeight: "500px",
          transition: "background 0.4s ease",

          // ✅ Bottom space after Reviews
          paddingBottom: "120px",
        }}
      >
        {/* ================= PRODUCT + GRID ================= */}
        <div className="max-w-7xl mx-auto text-center">
          {/* ---------- PRODUCT SECTION ---------- */}
          <div>
            <h1 className="title-font text-2xl md:text-5xl font-semibold">
              New Arrivals
            </h1>

            <div className="flex justify-center mt-4">
              <svg
                width="140"
                height="10"
                viewBox="0 0 150 10"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M.9 2.3C1 2.1.7 2 .6 1.8c-.2.1-.3.2-.5.3..."
                ></path>
              </svg>
            </div>

            <ProductCard />
          </div>

          {/* ---------- GRID SECTION ---------- */}
          <div className="mt-20">
            <GridSection />
          </div>
        </div>

        {/* ================= HOW IT WORKS ================= */}
        <div className="mt-32">
          <HowItWorks />
        </div>

        {/* ================= BRANDS ================= */}
        <div className="mt-32">
          <Brands />
        </div>

        {/* ================= REVIEWS ================= */}
        <div className="mt-32 max-w-7xl mx-auto text-center">
          <Reviews reviewsPromise={reviewsPromise} />
        </div>
      </div>
    </div>
  );
};

export default Home;
