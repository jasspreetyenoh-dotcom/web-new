"use client";

import { motion } from "framer-motion";

export default function BlurText({
  text = "",
  delay = 200,          // Initial delay in ms
  animateBy = "words",   // "words" or "letters"
  direction = "top",     // "top" or "bottom"
  onAnimationComplete,
  className = "",
  style = {}
}) {
  // Split elements
  const elements = animateBy === "words" ? text.split(" ") : Array.from(text);

  // Direction offsets
  const yOffset = direction === "top" ? -30 : direction === "bottom" ? 30 : 0;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: animateBy === "words" ? 0.12 : 0.04,
        delayChildren: delay / 1000,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      filter: "blur(10px)",
      opacity: 0,
      y: yOffset
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 14,
      }
    },
  };

  // Split into words first to prevent letter-wrapping/word-splitting issues
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      style={{ 
        display: "inline-flex", 
        flexWrap: "wrap",
        ...style 
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      onAnimationComplete={onAnimationComplete}
    >
      {words.map((word, wordIdx) => {
        // If animateBy is "words", animate the whole word at once
        if (animateBy === "words") {
          return (
            <motion.span
              key={wordIdx}
              variants={itemVariants}
              style={{ 
                display: "inline-block", 
                marginRight: "0.25em",
              }}
            >
              {word}&nbsp;
            </motion.span>
          );
        }

        // If animateBy is "letters", animate each letter but wrap in a word container to prevent breaking
        const letters = Array.from(word);
        return (
          <span 
            key={wordIdx} 
            style={{ 
              display: "inline-block", 
              whiteSpace: "nowrap", 
              marginRight: "0.25em" 
            }}
          >
            {letters.map((letter, letterIdx) => (
              <motion.span
                key={letterIdx}
                variants={itemVariants}
                style={{ 
                  display: "inline-block",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        );
      })}
    </motion.span>
  );
}
