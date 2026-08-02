"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Dock({
  items = [],
  panelHeight = 68,
  baseItemSize = 50,
  magnification = 70,
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      className="global-dock-outer"
      style={{
        position: "fixed",
        bottom: "32px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9000,
        pointerEvents: "auto",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Dock Body */}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "12px",
          height: `${panelHeight}px`,
          padding: "10px 16px",
          backgroundColor: "rgba(250, 249, 246, 0.85)",
          backdropFilter: "blur(12px)",
          border: "2px solid var(--ink)",
          borderRadius: "24px",
          boxShadow: "0 10px 40px rgba(30, 30, 30, 0.08)",
        }}
      >
        {items.map((item, idx) => (
          <DockIcon
            key={idx}
            mouseX={mouseX}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            baseSize={baseItemSize}
            magnification={magnification}
          />
        ))}
      </motion.div>
    </div>
  );
}

function DockIcon({ mouseX, icon, label, onClick, baseSize, magnification }) {
  const ref = useRef(null);

  // Calculate cursor distance from icon horizontal center
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate magnification scale relative to cursor distance
  const sizeTransform = useTransform(
    distance,
    [-150, 0, 150],
    [baseSize, magnification, baseSize]
  );

  // Apply spring animation to smooth out the magnification resize
  const size = useSpring(sizeTransform, {
    stiffness: 280,
    damping: 24,
  });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "16px",
        border: "1.5px solid var(--ink)",
        backgroundColor: "var(--paper)",
        cursor: "pointer",
        position: "relative",
        boxShadow: "2px 2px 0px var(--ink)",
        padding: 0,
        outline: "none",
      }}
      whileHover={{
        y: -6,
        backgroundColor: "var(--yellow-soft)",
        boxShadow: "3px 4px 0px var(--ink)",
      }}
      whileTap={{
        scale: 0.95,
      }}
      title={label}
    >
      {/* Icon Wrapper */}
      <div 
        style={{ 
          transform: "scale(1.25)", 
          color: "var(--ink)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center" 
        }}
      >
        {icon}
      </div>
      
      {/* Tooltip on hover */}
      <div className="dock-tooltip">
        {label}
      </div>

      <style jsx global>{`
        .dock-tooltip {
          position: absolute;
          bottom: 130%;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          background-color: var(--ink);
          color: var(--paper);
          padding: 6px 12px;
          border-radius: 8px;
          font-family: var(--font-headings);
          font-weight: 700;
          font-size: 12px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        button:hover .dock-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      `}</style>
    </motion.button>
  );
}
