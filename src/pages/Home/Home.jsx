import React from "react";
import Banner from "./Banner/Banner";
import backgroundImage from "../../assets/pattern_light2.png";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";
import ProductCard from "./ProductCards/ProductCard";
import HowItWorks from "./HowItWorks/HowItWorks";
import GridSection from "./GridSection/GridSection";
import Reviews from "./Reviews/Reviews";
import Brands from "./Brands/Brands";
import LatestProducts from "./LatestProducts/LatestProducts";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  const { theme } = useTheme();
  useDocumentTitle("Home");
  return (
    <div>
      <Banner />
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
      >
        {/* ---------- PRODUCT + GRID ---------- */}
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          {/* ---------- PRODUCT SECTION ---------- */}
          <div className="py-12 sm:py-16 lg:py-20">
            <h1 className="title-font text-2xl md:text-5xl font-semibold mb-8 sm:mb-12 lg:mb-16">
              New Arrivals
              <LatestProducts />
            </h1>
          </div>

          {/* ---------- GRID SECTION ---------- */}
          <div className="pb-12 sm:pb-16 lg:pb-20">
            <GridSection />
          </div>
        </div>

        {/* ---------- BRANDS ---------- */}
        <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <h1 className="title-font text-center text-2xl md:text-5xl font-semibold mb-8 sm:mb-12 lg:mb-16">Our Trusted Partners</h1>
          <Brands />
        </div>

        {/* ----------  REVIEWS ---------- */}
        <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="title-font text-center text-2xl md:text-5xl font-semibold mb-8 sm:mb-12 lg:mb-16">Our Customer Reviews </h1>
          <Reviews reviewsPromise={reviewsPromise} />
        </div>
        {/* ------------ HOW IT WORKS ----------*/}
        <div className="pt-12 sm:pt-16 lg:pt-20 ">
          <HowItWorks />
        </div>
      </div>
    </div>
  );
};

export default Home;