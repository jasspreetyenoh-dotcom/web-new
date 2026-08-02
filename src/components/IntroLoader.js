"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader({
  onComplete,
  pageName = "YENOH",
  quote = "We build brands that grow.",
  accentColor = "var(--yellow)",
  iconType = "logo",
  durationMs = 1150
}) {
  const [isVisible, setIsVisible] = useState(true);

  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    // Check if we've already shown the loader in this session
    const hasSeen = sessionStorage.getItem('intro_seen');
    setHasCheckedSession(true);
    
    if (hasSeen) {
      setShouldShow(false);
      setIsVisible(false);
      if (onComplete) onComplete();
      return;
    }
    
    // If not seen, mark it as seen and run the timer
    sessionStorage.setItem('intro_seen', 'true');
    
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
      setIsVisible(false);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [onComplete, durationMs]);

  // Prevent flash during hydration/check
  if (!hasCheckedSession) return null;
  if (!shouldShow) return null;

  const smoothEase = [0.65, 0, 0.35, 1];

  const renderIcon = () => {
    switch (iconType) {
      case "story":
        return (
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
            <motion.path
              d="M20 50 C 20 25, 45 25, 50 50 C 55 75, 80 75, 80 50 C 80 25, 55 25, 50 50 C 45 75, 20 75, 20 50 Z"
              stroke="var(--ink)"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: smoothEase }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="8"
              fill={accentColor}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, delay: 0.35 }}
            />
          </svg>
        );

      case "craft":
        return (
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
            <motion.rect
              x="25"
              y="25"
              width="50"
              height="50"
              rx="12"
              stroke="var(--ink)"
              strokeWidth="7"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: smoothEase }}
            />
            <motion.path
              d="M50 15 L50 85 M15 50 L85 50"
              stroke={accentColor}
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: smoothEase, delay: 0.2 }}
            />
          </svg>
        );

      case "work":
        return (
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
            <motion.path
              d="M20 35 L20 20 L35 20 M65 20 L80 20 L80 35 M80 65 L80 80 L65 80 M35 80 L20 80 L20 65"
              stroke="var(--ink)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, ease: smoothEase }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="12"
              fill={accentColor}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 350, delay: 0.3 }}
            />
          </svg>
        );

      case "talk":
        return (
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
            <motion.path
              d="M20 25 C 20 20, 80 20, 80 45 C 80 70, 45 70, 35 82 C 35 72, 20 70, 20 45 Z"
              stroke="var(--ink)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, ease: smoothEase }}
            />
            <motion.path
              d="M38 45 H62 M62 45 L52 37 M62 45 L52 53"
              stroke={accentColor}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: smoothEase, delay: 0.25 }}
            />
          </svg>
        );

      case "logo":
      default:
        return (
          <svg className="intro-logo-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
            {/* Charcoal Y leg path */}
            <motion.path
              className="logo-y-path"
              d="M20 22 C24 30, 40 55, 46 66 C50 73, 51 80, 50 86"
              stroke="var(--ink)"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: smoothEase }}
            />
            
            {/* Yellow arrow shaft path */}
            <motion.path
              className="logo-arrow-path"
              d="M46 66 C58 50, 68 34, 76 20"
              stroke={accentColor}
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: smoothEase, delay: 0.15 }}
            />
            
            {/* Yellow arrow head */}
            <motion.g
              initial={{ opacity: 0, scale: 0.6, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20, delay: 0.35 }}
            >
              <path
                d="M70 18 L78 19 L76 30"
                stroke={accentColor}
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </motion.g>
          </svg>
        );
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="intro-loader"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          style={{ willChange: "opacity, transform", padding: "0 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
        >
          {/* Animated YENOH Logo Only */}
          <div className="intro-logo-wrap" style={{ width: "110px", height: "110px" }}>
            <svg className="intro-logo-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
              {/* Charcoal Y leg path */}
              <motion.path
                className="logo-y-path"
                d="M20 22 C24 30, 40 55, 46 66 C50 73, 51 80, 50 86"
                stroke="var(--ink)"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: smoothEase }}
              />
              
              {/* Yellow arrow shaft path */}
              <motion.path
                className="logo-arrow-path"
                d="M46 66 C58 50, 68 34, 76 20"
                stroke="var(--yellow)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: smoothEase, delay: 0.15 }}
              />
              
              {/* Yellow arrow head */}
              <motion.g
                initial={{ opacity: 0, scale: 0.6, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20, delay: 0.35 }}
              >
                <path
                  d="M70 18 L78 19 L76 30"
                  stroke="var(--yellow)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </motion.g>
            </svg>
          </div>
          
          <motion.div 
            className="intro-mobile-msg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            BEST VIEWED ON DESKTOP
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
