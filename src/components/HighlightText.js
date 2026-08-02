"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * HighlightText — renders text with an organic marker-style sweep
 * behind the text when scrolled into view.
 * Uses a linear-gradient background animation that wraps perfectly
 * across multiple lines on mobile without overflowing.
 */
export default function HighlightText({
  children,
  color = "var(--highlighter-color)",
  height = "var(--highlighter-height)",
  delay = 0,
  className = "",
  style = {},
  as: Tag = "span",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        display: "inline",
        position: "relative",
        ...style,
      }}
    >
      <motion.span
        initial={{ backgroundSize: `0% ${height}` }}
        animate={isInView ? { backgroundSize: `100% ${height}` } : { backgroundSize: `0% ${height}` }}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.25, 1, 0.5, 1],
        }}
        style={{
          display: "inline",
          backgroundImage: `linear-gradient(${color}, ${color})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 90%",
          backgroundSize: `0% ${height}`,
          padding: "0 2px",
          borderRadius: "4px",
          // Avoid hard clipping to ensure text is fully visible
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
        }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
