import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import bannerImage3 from "../../../assets/banner-image-3.jpg";
import banner_1_human from "../../../assets/banner-1-human.png";
import banner_1_element from "../../../assets/banner-1-element.png";
import banner_1_text from "../../../assets/banner-text.png";
import banner_1_background from "../../../assets/background.jpg";
import { NavLink } from "react-router";
import ButtonAnimation from "../../../components/ButtonAnimation";
import ButtonAnimation2 from "../../../components/ButtonAnimation2";

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
    text: "Discover our amazing features and enjoy the seamless experience we provide. Join us now!",
  },
  {
    id: 3,
    type: "image",
    image:
      "https://i.ibb.co/bg39HKvM/FORMAL-cf44e07f-ec45-4b9b-ac3c-5cc2890839ef.jpg",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Slide interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // 5s delay between slides
    return () => clearInterval(interval);
  }, []);

  // Variants for slide animation
  const slideVariants = {
    enter: { opacity: 0, x: 50, scale: 1.05 },
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: {
      opacity: 0,
      x: -50,
      scale: 0.95,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  // Variants for layered elements
  const layerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
    }),
  };

  // Variants for text slide
  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
  };

  // Arrow navigation
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full min-h-[500px] md:min-h-[700px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        {slides.map((slide, idx) =>
          idx === current ? (
            <motion.div
              key={slide.id}
              className="absolute inset-0 w-full h-full flex justify-center items-center"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Layered Slide */}
              {slide.type === "layered" && (
                <div
                  className="relative w-full h-full flex justify-center items-center"
                  style={{
                    backgroundImage: `url(${slide.background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {slide.layers.map((layer, i) => (
                    <motion.img
                      key={i}
                      src={layer}
                      alt=""
                      custom={i}
                      variants={layerVariants}
                      initial="hidden"
                      animate="visible"
                      className={`absolute w-auto max-w-full h-auto ${
                        layer === banner_1_text ? "left-10" : ""
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Text with Image Slide */}
              {slide.type === "text-with-image" && (
                <div
                  className="relative w-full h-full flex items-center justify-start px-10"
                  style={{
                    backgroundImage: `url(${slide.background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <motion.p
                    className="text-black text-xl md:text-5xl font-bold max-w-xl"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {slide.text}
                  </motion.p>
                </div>
              )}

              {/* Image Slide */}
              {slide.type === "image" && (
                <img
                  src={slide.image}
                  alt=""
                  className="w-full object-cover h-[500px] md:h-[700px]"
                />
              )}
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* CTA Button */}
      <div className="absolute bottom-4 md:bottom-10 left-4 md:left-10 z-10">
        {slides[current].id === 1 ? (
          <ButtonAnimation2 width={220} height={70} speed={3} stroke="#111827">
            Shop Now
          </ButtonAnimation2>
        ) : (
          <ButtonAnimation width={220} height={70} speed={3} stroke="#111827">
            Shop Now
          </ButtonAnimation>
        )}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Banner;
