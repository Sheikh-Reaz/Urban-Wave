import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";

const brands = [
  "https://i.ibb.co.com/bjTFZMfN/brand-1.png",
  "https://i.ibb.co.com/7J4NwDp6/brand-2.png",
  "https://i.ibb.co.com/Rk84Y9zj/brand-3.png",
  "https://i.ibb.co.com/bgtN15Yf/brand-4.png",
  "https://i.ibb.co.com/Gf71gDr4/brand-5.png",
  "https://i.ibb.co.com/cKPDQPJS/brand-6.png",
];

const marqueeData = [...brands, ...brands];

const Brands = () => {
  const { theme } = useTheme(); // "light" or "dark"

  return (
    <div className="w-full overflow-hidden py-10 bg-transparent">
      <motion.div
        className="flex gap-10 md:gap-16"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
      >
        {marqueeData.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center min-w-[120px] md:min-w-[160px] lg:min-w-[180px]"
          >
            <img
              src={logo}
              alt="brand"
              className="w-[100px] md:w-[140px] lg:w-[160px] object-contain transition duration-300"
              style={{
                filter:
                  theme === "dark"
                    ? "brightness(0) invert(1)"
                    : "none",
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Brands;
