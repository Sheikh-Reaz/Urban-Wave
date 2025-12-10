import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const ButtonAnimation = ({
  onClick,
  speed = 1.2,
  className = "",
  width = 200,
  height = 60,
  gapSize = 20,
  children,

  // ✅ NEW PROPS FOR REUSABILITY
  as = "button",     // button | a | Link | div
  type = "button",  // submit | button
  href,
  ...rest
}) => {
  const controls = useAnimation();
  const Component = motion[as] || motion.button;

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

  return (
    <Component
      type={as === "button" ? type : undefined}
      href={as === "a" ? href : undefined}
      onClick={onClick}
      style={{ width, height }}
      className={`relative inline-block cursor-pointer select-none ${className}`}
      initial="rest"
      whileHover="hover"
      {...rest}
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
        className="relative flex items-center justify-center overflow-hidden"
        style={{ width, height }}
        variants={{
          rest: { x: 0, y: 0 },
          hover: {
            x: moveDistance,
            y: moveDistance,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          },
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
            animate={controls}
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
        </svg>

        {/* Button content */}
        <motion.div
          className="relative z-10 font-medium pointer-events-none"
          style={{ color: "#000" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </Component>
  );
};

export default ButtonAnimation;
