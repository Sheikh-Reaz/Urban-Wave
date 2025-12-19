import React from "react";
import { motion } from "framer-motion";

const GridSection = () => {
  const hoverAnim = {
    rest: { scale: 1 },
    hover: { scale: 1.12, transition: { duration: 0.45 } },
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-2">

      {/* BLOCK 1 — TOP LEFT */}
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative overflow-hidden group h-[350px]
                   lg:col-start-1 lg:row-start-1"
      >
        <motion.img
          variants={hoverAnim}
          src="https://i.ibb.co/Xx8h3HLf/grid-Img-1.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-8 left-8 text-black space-y-2 z-10">
          <p className="text-sm tracking-wider uppercase">Shop & Save</p>
          <h2 className="text-3xl font-semibold leading-tight">
            Flat <br /> 40% Off <br /> Everything
          </h2>
          <button className="btn btn-outline mt-4">Shop Now</button>
        </div>
      </motion.div>

      {/* BLOCK 2 — BOTTOM LEFT */}
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative overflow-hidden group h-[350px]
                   lg:col-start-1 lg:row-start-2"
      >
        <motion.img
          variants={hoverAnim}
          src="https://i.ibb.co/FkY9h7xQ/grid-Img-2.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-8 right-8 text-black space-y-1 z-10">
          <p className="text-sm uppercase tracking-wide">New Arrivals</p>
          <h2 className="text-2xl font-bold leading-tight">
            Street <br /> Inspiration
          </h2>
        </div>
      </motion.div>

      {/* BLOCK 3 — MIDDLE (SPANS 2 ROWS) */}
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative overflow-hidden group h-[350px] lg:h-[702px]
                   lg:col-start-2 lg:row-start-1 lg:row-span-2"
      >
        <motion.img
          variants={hoverAnim}
          src="https://i.ibb.co/781PTWX/grid-Img-4.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white text-center z-10">
          <p className="uppercase tracking-wide text-sm">Weekly Edit</p>
          <h2 className="text-3xl font-extrabold">Smart Style</h2>
          <button className="btn btn-outline mt-4">Explore Now</button>
        </div>
      </motion.div>

      {/* BLOCK 4 — FULL RIGHT COLUMN (SPANS 2 ROWS) */}
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative overflow-hidden group h-[350px] lg:h-[702px]
                   lg:col-start-3 lg:row-start-1 lg:row-span-2"
      >
        <motion.img
          variants={hoverAnim}
          src="https://i.ibb.co/fGT8mfcw/grid-Img-3.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-10 left-8 text-black space-y-1 z-10">
          <p className="text-sm uppercase tracking-wide">Our Offers</p>
          <h2 className="text-2xl font-bold uppercase">Top Brands</h2>
          <button className="btn btn-outline mt-4">Shop Now</button>
        </div>
      </motion.div>

      {/* BLOCK 5 — BOTTOM BANNER (FULL WIDTH) */}
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative overflow-hidden group
                   lg:col-start-1 lg:col-span-3 lg:row-start-3"
      >
        <img
          src="https://demo2.wpopal.com/striz/wp-content/uploads/2018/12/banner1.gif"
          className="w-full h-auto"
          alt="Banner"
        />
      </motion.div>

    </div>
  );
};

export default GridSection;