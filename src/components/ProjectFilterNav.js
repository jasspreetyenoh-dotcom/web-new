"use client";

import { motion } from "framer-motion";

const CATEGORIES = [
  "All",
  "Websites",
  "Social Media",
  "Performance Marketing",
  "Video Production",
  "Political",
  "Education",
  "Immigration",
  "Restaurants",
  "Software"
];

export default function ProjectFilterNav({ activeCategory, onSelect }) {
  return (
    <div style={{
      position: "sticky",
      top: "70px", // Below the main navbar if there is one
      zIndex: 90,
      background: "rgba(250,249,246,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--line-color)",
      padding: "16px 40px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      overflowX: "auto",
      // Hide scrollbar but keep functionality
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }} className="hide-scroll">
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>

      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <motion.button
            key={cat}
            onClick={() => onSelect(cat)}
            whileTap={{ scale: 0.95 }}
            style={{
              whiteSpace: "nowrap",
              padding: "8px 18px",
              borderRadius: "100px",
              border: `1.5px solid ${isActive ? "var(--yellow)" : "var(--line-color)"}`,
              background: isActive ? "rgba(246,192,0,0.15)" : "transparent",
              fontFamily: "var(--font-headings)",
              fontWeight: 700,
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: isActive ? "var(--ink)" : "var(--ink-70)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: isActive ? "2px 3px 0 rgba(246,192,0,0.3)" : "none",
            }}
          >
            {cat}
          </motion.button>
        );
      })}
    </div>
  );
}
