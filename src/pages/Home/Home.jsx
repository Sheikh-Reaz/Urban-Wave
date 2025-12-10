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
