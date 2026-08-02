"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function StickerPeel({
  num = "01",
  name = "Service",
  desc = "Description here.",
  initialPosition = { x: 0, y: 0 },
  constraintsRef,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Realistic peel fold size (pre-peeled resting state matches the sticker's corner radius)
  const maxPeel = isMobile ? 28 : 45;
  const minPeel = isMobile ? 16 : 24;
  const peelSize = isHovered ? maxPeel : minPeel;

  // Constant border-radius matching the sticker base (24px on desktop, 16px on mobile)
  const flapRadius = isMobile ? 16 : 24;

  const cardClipPath = `polygon(0 0, calc(100% - ${peelSize}px) 0, 100% ${peelSize}px, 100% 100%, 0 100%)`;

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={false}
      initial={initialPosition}
      animate={initialPosition}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, rotate: -1.5, zIndex: 60 }}
      whileDrag={{ scale: 1.04, rotate: 2, cursor: "grabbing", zIndex: 70 }}
      className="sticker-peel"
      style={{
        position: "absolute",
        zIndex: isHovered ? 50 : 10,
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      {/* Crayon shadow background */}
      <div
        className="sticker-shadow"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(30, 30, 30, 0.05)",
          borderRadius: isMobile ? "16px" : "24px",
          filter: isHovered ? "blur(8px)" : "blur(3px)",
          transform: isHovered ? "translate(8px, 12px)" : "translate(2px, 3px)",
          transition: "transform 0.2s ease, filter 0.2s ease, clip-path 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          pointerEvents: "none",
          clipPath: cardClipPath,
          willChange: "transform, clip-path",
        }}
      />

      {/* Main Sticker Frame (Die-cut layout) */}
      <div
        className="sticker-inner"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          transition: "clip-path 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          // Dynamic clip-path chops the top-right corner when hovered/resting with rounded card corners
          clipPath: cardClipPath,
          willChange: "clip-path",
          transform: "translateZ(0)",
        }}
      >
        <span className="sticker-num" style={{ color: "var(--yellow)" }}>
          {num}
        </span>
        <h3 className="sticker-title" style={{ textTransform: "uppercase", fontFamily: "var(--font-headings)", fontWeight: 900 }}>
          {name}
        </h3>
        <p className="sticker-desc" style={{ color: "var(--ink-70)", margin: 0 }}>
          {desc}
        </p>
      </div>

      {/* Flap Wrapper with Drop Shadow that respects clip-path */}
      <div
        style={{
          position: "absolute",
          top: "-1.5px",
          right: "-1.5px",
          width: `${peelSize}px`,
          height: `${peelSize}px`,
          transition: "width 0.35s cubic-bezier(0.25, 1, 0.5, 1), height 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          pointerEvents: "none",
          zIndex: 2,
          filter: "drop-shadow(-3px 3px 4px rgba(30, 30, 30, 0.16))"
        }}
      >
        {/* Peeled Flap Corner Overlay (curved roll backing) */}
        <div
          style={{
            width: "100%",
            height: "100%",
            // Folds top-right corner to point back down-left with a soft gradient
            background: "linear-gradient(225deg, #FFFFFF 0%, #F4F3EF 50%, rgba(30, 30, 30, 0.12) 100%)",
            borderRadius: `0 0 0 ${flapRadius}px`,
            borderLeft: "1px solid rgba(30, 30, 30, 0.12)",
            borderBottom: "1px solid rgba(30, 30, 30, 0.12)",
            clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)",
          }}
        />
      </div>
    </motion.div>
  );
}
