import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const ButtonAnimation2 = ({
  onClick,
  speed = 1.2,
  className = "",
  width = 200,
  height = 60,
  gapSize = 20,
  children,
  textColor = "#ffffff",
  hoverTextColor = "#000000",
}) => {
  const controls = useAnimation();

  const w = width - 2;
  const h = height - 2;
  const perimeter = 2 * (w + h);

  const dashLength = (perimeter - 2 * gapSize) / 2;
  const dashArray = `${dashLength} ${gapSize} ${dashLength} ${gapSize}`;
  const initialOffset = dashLength / 2 + gapSize / 2;

  useEffect(() => {
    controls.start({
      strokeDashoffset: -perimeter + initialOffset,
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        duration: speed,
      },
    });
  }, [controls, perimeter, initialOffset, speed]);

  const moveDistance = 3;

  // Text color variants
  const textVariants = {
    rest: { color: textColor },
    hover: { color: hoverTextColor, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      style={{ width, height }}
      className={`relative inline-block ${className}`}
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Shadow layer */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "#000", borderRadius: 0 }}
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1, transition: { duration: 0.3 } },
        }}
      />

      {/* Main button */}
      <motion.div
        className="relative flex items-center justify-center overflow-hidden cursor-pointer"
        style={{ width, height }}
        variants={{
          rest: { x: 0, y: 0 },
          hover: { x: moveDistance, y: moveDistance, transition: { type: "spring", stiffness: 300, damping: 20 } },
        }}
      >
        {/* White background layer */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: "#fff", borderRadius: 0 }}
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1, transition: { duration: 0.3 } },
          }}
        />

        {/* Animated dashed border */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          <motion.rect
            x="1"
            y="1"
            width={w}
            height={h}
            fill="none"
            stroke="#FF0000"
            strokeWidth="2.2"
            strokeDasharray={dashArray}
            initial={{ strokeDashoffset: initialOffset }}
            animate={controls} // stroke animation always running
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
        </svg>

        {/* Button content (text changes color on hover of button) */}
        <motion.div
          className="relative z-10 font-medium"
          variants={textVariants}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ButtonAnimation2;
