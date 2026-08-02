"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PresentationMode() {
  const [isPresenting, setIsPresenting] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsPresenting(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const togglePresentation = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <>
      <style>{`
        /* When in fullscreen (presentation mode), hide main nav and dock */
        :fullscreen nav, 
        :fullscreen .dock-container,
        :fullscreen header {
          display: none !important;
        }
        /* Style adjustments when in fullscreen */
        :fullscreen body {
          background: var(--paper);
          overflow-y: auto;
          padding-bottom: 0 !important;
        }
      `}</style>
      
      <motion.button
        onClick={togglePresentation}
        whileHover={{ scale: 1.05, boxShadow: "2px 3px 0 #000" }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 9999,
          background: isPresenting ? "#ef4444" : "var(--yellow)",
          border: "2px solid #000",
          borderRadius: "100px",
          padding: "10px 16px",
          fontFamily: "var(--font-headings)",
          fontWeight: 700,
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#000",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        title="Toggle Presentation Mode for Client Meetings"
      >
        {isPresenting ? (
          <>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>
            Exit Present
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
            Present
          </>
        )}
      </motion.button>
    </>
  );
}
