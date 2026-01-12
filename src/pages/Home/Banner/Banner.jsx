import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

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
const DESKTOP_ROWS = 4;
const DESKTOP_COLS = 9;
const MOBILE_ROWS = 3;
const MOBILE_COLS = 6;

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
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const navigate = useNavigate();

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get responsive grid dimensions
  const rows = isMobile ? MOBILE_ROWS : DESKTOP_ROWS;
  const cols = isMobile ? MOBILE_COLS : DESKTOP_COLS;

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

  // Touch handlers for swipe gestures
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  /* -------- TILE RENDER (ONLY FOR LAYERED SLIDES) -------- */
  const renderTiles = (slide) => {
    const tiles = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;

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
              width: `${100 / cols}%`,
              height: `${100 / rows}%`,
              top: `${(100 / rows) * row}%`,
              left: `${(100 / cols) * col}%`,
              backgroundImage: `url(${slide.background})`,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundPosition: `${(col / (cols - 1)) * 100}% ${
                (row / (rows - 1)) * 100
              }%`,
            }}
          />
        );
      }
    }

    return tiles;
  };

  /* -------- SIMPLE SLIDE VARIANTS (FOR NON-MOSAIC SLIDES) -------- */
  const slideVariants = {
    initial: {
      opacity: 0,
      scale: 1.1,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  return (
    <div
      className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[700px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
      role="region"
      aria-label="Image carousel"
    >
      {/* SLIDES */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          className="absolute inset-0 w-full h-full"
        >
          {/* MOSAIC BACKGROUND - ONLY FOR LAYERED SLIDES */}
          {slides[current].type === "layered" && renderTiles(slides[current])}

          {/* SIMPLE BACKGROUND - FOR NON-LAYERED SLIDES */}
          {slides[current].type !== "layered" && (
            <motion.div
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${
                  slides[current].type === "image" 
                    ? slides[current].image 
                    : slides[current].background
                })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          )}

          {/* CONTENT OVERLAY */}
          <div className="relative z-10 w-full h-full">
            {/* Layered Slide */}
            {slides[current].type === "layered" && (
              <div className="relative w-full h-full flex justify-center items-center">
                {slides[current].layers.map((layer, i) => (
                  <motion.img
                    key={i}
                    src={layer}
                    alt={`Banner layer ${i + 1}`}
                    loading="lazy"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: i * 0.2 },
                    }}
                    className={`absolute max-w-full max-h-full object-contain ${
                      layer === banner_1_text 
                        ? "left-4 sm:left-6 md:left-10" 
                        : ""
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Text Slide */}
            {slides[current].type === "text-with-image" && (
              <div className="flex items-center h-full px-4 sm:px-6 md:px-10">
                <motion.p
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="text-black text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold max-w-xs sm:max-w-md md:max-w-xl leading-tight"
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
          className="absolute bottom-2 sm:bottom-4 md:bottom-10 left-2 sm:left-4 md:left-10 z-20"
        >
          <ButtonAnimation2
            width={isMobile ? 180 : 220}
            height={isMobile ? 50 : 70}
            speed={3}
            stroke="#111827"
            onClick={() => navigate("/all-products")}
          >
            Shop Now
          </ButtonAnimation2>
        </motion.div>
      </AnimatePresence>

      {/* SLIDE INDICATORS */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === current 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* NAV ARROWS */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-20 text-white p-2 sm:p-3 hover:bg-black/20 rounded-full transition-colors duration-200"
        aria-label="Previous slide"
      >
        <span className="text-lg sm:text-xl">&#10094;</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-20 text-white p-2 sm:p-3 hover:bg-black/20 rounded-full transition-colors duration-200"
        aria-label="Next slide"
      >
        <span className="text-lg sm:text-xl">&#10095;</span>
      </button>
    </div>
  );
};

export default Banner;