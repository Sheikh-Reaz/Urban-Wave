import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import bannerImage3 from "../../../assets/banner-image-3.jpg";
import banner_1_human from "../../../assets/banner-1-human.png";
import banner_1_element from "../../../assets/banner-1-element.png";
import banner_1_text from "../../../assets/banner-text.png";
import banner_1_background from "../../../assets/background.jpg";

import ButtonAnimation2 from "../../../components/ButtonAnimation2";

/* ---------------- SLIDES ---------------- */
const slides = [
  {
    id: 1,
    type: "layered",
    background: banner_1_background,
    layers: [banner_1_element, banner_1_human, banner_1_text],
  },
  {
    id: 2,
    type: "text-with-image",
    background: bannerImage3,
    text:
      "Discover our amazing features and enjoy the seamless experience we provide. Join us now!",
  },
  {
    id: 3,
    type: "image",
    image:
      "https://i.ibb.co/bg39HKvM/FORMAL-cf44e07f-ec45-4b9b-ac3c-5cc2890839ef.jpg",
  },
];

/* ---------------- MOSAIC SETTINGS ---------------- */
const ROWS = 4;
const COLS = 9;

/* ---------------- TILE VARIANTS ---------------- */
const tileVariants = {
  initial: {
    opacity: 0,
    scale: 0.6,
  },
  animate: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.02,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
  exit: (i) => ({
    opacity: 0,
    scale: 1.4,
    transition: {
      delay: i * 0.01,
      duration: 0.25,
      ease: "easeIn",
    },
  }),
};

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* -------- AUTOPLAY WITH PAUSE -------- */
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  /* -------- TILE RENDER -------- */
  const renderTiles = (slide) => {
    const tiles = [];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const index = row * COLS + col;

        tiles.push(
          <motion.div
            key={index}
            custom={index}
            variants={tileVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute"
            style={{
              width: `${100 / COLS}%`,
              height: `${100 / ROWS}%`,
              top: `${(100 / ROWS) * row}%`,
              left: `${(100 / COLS) * col}%`,
              backgroundImage:
                slide.type === "image"
                  ? `url(${slide.image})`
                  : `url(${slide.background})`,
              backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
              backgroundPosition: `${(col / (COLS - 1)) * 100}% ${
                (row / (ROWS - 1)) * 100
              }%`,
            }}
          />
        );
      }
    }

    return tiles;
  };

  return (
    <div
      className="relative w-full min-h-[500px] md:min-h-[700px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* SLIDES */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          className="absolute inset-0 w-full h-full"
        >
          {/* MOSAIC BACKGROUND */}
          {renderTiles(slides[current])}

          {/* CONTENT OVERLAY */}
          <div className="relative z-10 w-full h-full">
            {/* Layered Slide */}
            {slides[current].type === "layered" && (
              <div className="relative w-full h-full flex justify-center items-center">
                {slides[current].layers.map((layer, i) => (
                  <motion.img
                    key={i}
                    src={layer}
                    alt=""
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: i * 0.2 },
                    }}
                    className={`absolute ${
                      layer === banner_1_text ? "left-10" : ""
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Text Slide */}
            {slides[current].type === "text-with-image" && (
              <div className="flex items-center h-full px-10">
                <motion.p
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="text-black text-xl md:text-5xl font-bold max-w-xl"
                >
                  {slides[current].text}
                </motion.p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CTA BUTTON */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`cta-${current}`}
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-4 md:bottom-10 left-4 md:left-10 z-20"
        >
          <ButtonAnimation2 width={220} height={70} speed={3} stroke="#111827">
            Shop Now
          </ButtonAnimation2>
        </motion.div>
      </AnimatePresence>

      {/* NAV ARROWS */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 text-white p-3"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 text-white p-3"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Banner;
