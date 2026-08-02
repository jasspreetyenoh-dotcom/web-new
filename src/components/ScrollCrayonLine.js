"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/**
 * ScrollCrayonLine — decorative SVG path that draws itself on scroll.
 * Placed in section gutters, corners, between sections as decoration.
 */
export default function ScrollCrayonLine({
  path,
  viewBox = "0 0 400 80",
  width = "100%",
  height = "80px",
  stroke = "var(--yellow)",
  strokeWidth = 4,
  delay = 0,
  style = {},
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.svg
      ref={ref}
      viewBox={viewBox}
      width={width}
      height={height}
      fill="none"
      style={{
        pointerEvents: "none",
        overflow: "visible",
        ...style,
      }}
    >
      <motion.path
        d={path}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{
          pathLength: { duration: 1.2, delay, ease: "easeInOut" },
          opacity: { duration: 0.3, delay },
        }}
      />
    </motion.svg>
  );
}
