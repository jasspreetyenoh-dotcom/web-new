"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BlurText from "./BlurText";
import HighlightText from "./HighlightText";
import ScrollCrayonLine from "./ScrollCrayonLine";
import fullLogo from "@/app/full logo.png";

export default function Hero({ startTrigger }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section className="hero" id="hero" style={{ position: "relative" }}>
      {/* Scrollable brand logo at the top-left of the Hero container */}
      {/* Scrollable brand logo at the top-left of the Hero container */}
      <div
        className="hero-logo-wrap"
        style={{
          position: "absolute",
          zIndex: 50,
          opacity: startTrigger ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        <a href="#" className="logo">
          <img src={fullLogo.src} alt="YENOH Logo" style={{ height: "40px", width: "auto" }} />
        </a>
      </div>

      {/* Decorative crayon curves at hero background */}
      {startTrigger && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", bottom: "80px", left: "5%", opacity: 0.07 }}>
            <ScrollCrayonLine
              path="M0 30 C 80 5, 200 50, 320 20 C 400 0, 500 40, 600 25"
              viewBox="0 0 600 60"
              width="600px"
              height="60px"
              stroke="var(--ink)"
              strokeWidth={3}
              delay={1.2}
            />
          </div>
          <div style={{ position: "absolute", top: "120px", right: "3%", opacity: 0.06 }}>
            <ScrollCrayonLine
              path="M0 10 C 60 30, 140 0, 200 20"
              viewBox="0 0 200 40"
              width="200px"
              height="40px"
              stroke="var(--yellow)"
              strokeWidth={5}
              delay={1.5}
            />
          </div>
        </div>
      )}

      <div className="container hero-grid">
        <motion.div
          className="hero-text"
          variants={containerVariants}
          initial="hidden"
          animate={startTrigger ? "visible" : "hidden"}
        >
          {/* Subtitle */}
          <motion.span className="hero-subtitle" variants={itemVariants} style={{ marginTop: "24px" }}>
            <svg viewBox="0 0 46 26" width="46" height="26" fill="none" style={{ overflow: "visible" }}>
              <path d="M2 18 C 12 4, 30 4, 40 14" stroke="#1D1D1D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M33 9 L41 14 L35 21" stroke="#1D1D1D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            Creative Agency
          </motion.span>

          {/* Title */}
          <motion.h1 className="hero-title" variants={itemVariants} style={{ display: "block" }}>
            <BlurText text="We Build" delay={300} animateBy="words" direction="top" style={{ marginRight: "0.25em", display: "inline-block" }} />

            <span className="sketch-underline-wrapper in-view" style={{ display: "inline-block", marginRight: "0.25em" }}>
              Brands
              <svg viewBox="0 0 300 20">
                <motion.path
                  d="M5 12 C 90 2, 210 18, 295 10"
                  initial={{ pathLength: 0 }}
                  animate={startTrigger ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
                />
              </svg>
            </span>{" "}

            <BlurText text="That" delay={700} animateBy="words" direction="top" style={{ marginRight: "0.25em", display: "inline-block" }} />
            <span className="marker-highlight in-view" style={{ display: "inline-block" }}>Grow</span>.
          </motion.h1>

          {/* Description */}
          <div style={{ marginBottom: "40px", maxWidth: "550px" }}>
            {startTrigger && (
              <BlurText
                text="Websites, Marketing, Content & Digital Experiences that create real business impact."
                delay={900}
                animateBy="words"
                direction="bottom"
                className="hero-desc"
                style={{ margin: 0 }}
              />
            )}
          </div>

          {/* CTAs */}
          <motion.div className="hero-actions" variants={itemVariants}>
            <Link href="/portfolio" className="btn btn-white">View Portfolio</Link>
            <Link href="/contact" className="hero-talk-btn">
              Let's Talk
              <svg viewBox="0 0 40 20">
                <path d="M2 10 C 14 10, 26 10, 34 10" stroke="#1D1D1D" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M28 5 L36 10 L28 15" stroke="#1D1D1D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right side graphic */}
        <div className="hero-graphic" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <svg className="hero-doodles" viewBox="0 0 400 400" fill="none">
            <path d="M40 80 C 100 60, 280 120, 340 70" stroke="rgba(30,30,30,0.06)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M60 300 C 180 320, 220 200, 360 260" stroke="rgba(246,192,0,0.12)" strokeWidth="3.5" strokeLinecap="round" />
          </svg>

          <svg className={`hero-logo-large ${startTrigger ? "draw-done" : ""}`} viewBox="0 0 100 100" fill="none">
            <motion.path
              className="hero-path-y"
              d="M20 22 C24 30, 40 55, 46 66 C50 73, 51 80, 50 86"
              initial={{ pathLength: 0 }}
              animate={startTrigger ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.path
              className="hero-path-arrow"
              d="M46 66 C58 50, 68 34, 76 20"
              initial={{ pathLength: 0 }}
              animate={startTrigger ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.4, delay: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              className="hero-path-arrow-head"
              d="M70 18 L78 19 L76 30"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </svg>

          {/* Text YENOH below hero logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            style={{ marginTop: "16px", textAlign: "center" }}
          >
            <img src={fullLogo.src} alt="YENOH" style={{ height: "clamp(32px, 4vw, 52px)", width: "auto" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
