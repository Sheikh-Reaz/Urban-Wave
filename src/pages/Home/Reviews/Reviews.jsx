import React, { use, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReviewCard from "./ReviewCard";

const cardsPerGroup = {
  mobile: 1,
  sm: 1,
  md: 2,
  lg: 4,
};

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  const carouselRef = useRef(null);
  const [cardsToShow, setCardsToShow] = useState(cardsPerGroup.lg);
  const [width, setWidth] = useState(0);

  // Responsive cards
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setCardsToShow(cardsPerGroup.mobile);
      else if (w < 768) setCardsToShow(cardsPerGroup.sm);
      else if (w < 1024) setCardsToShow(cardsPerGroup.md);
      else setCardsToShow(cardsPerGroup.lg);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate width of carousel
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth);
    }
  }, [cardsToShow, reviews]);

  return (
    <div className="w-full py-12 px-4 sm:px-6 md:px-12">


      <div className="overflow-hidden cursor-grab">
        <motion.div
          ref={carouselRef}
          className="flex gap-6"
          drag="x"
          dragConstraints={{ left: -width, right: 0 }}
          dragElastic={0.2}
          animate={{ x: ["0%", "-100%"] }}
          transition={{ x: { repeat: Infinity, repeatType: "loop", duration: reviews.length * 2, ease: "linear" } }}
        >
          {/* Duplicate reviews for seamless looping */}
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full sm:w-full md:w-1/2 lg:w-1/4`}
            >
              <ReviewCard
                review={review}
                className="rounded-2xl bg-white p-6 h-full flex flex-col justify-between shadow-xl"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews;
