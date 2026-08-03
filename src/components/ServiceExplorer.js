"use client";
import { VscPlayCircle, VscLocation, VscSearch, VscLock, VscDeviceCameraVideo, VscLibrary } from "react-icons/vsc";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getCloudinaryUrl } from "@/utils/cloudinary";

// Custom Clean Floating Tile Component (Home screen style)
const CustomTile = ({ children, aspectRatio = "9/16", width = "100%", style = {}, isHoverable = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => isHoverable && setIsHovered(true)}
      onHoverEnd={() => isHoverable && setIsHovered(false)}
      animate={{
        y: isHovered ? -8 : 0,
        scale: isHovered ? 1.03 : 1,
        boxShadow: isHovered
          ? "0 18px 32px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)"
          : "0 10px 20px rgba(0,0,0,0.12), 2.5px 3.5px 0 var(--ink)",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 25 }}
      style={{
        position: "relative",
        width,
        aspectRatio,
        borderRadius: "16px",
        border: "2.5px solid var(--ink)",
        overflow: "hidden",
        background: "#000",
        cursor: "pointer",
        ...style
      }}
    >
      {children}
    </motion.div>
  );
};

// Website Development Container with PC Browser Header & Direct Case Study Button
const WebSlideshow = () => {
  const webSlides = [
    { title: "Punjab Immigration Platform", slug: "punjab-immigration", url: "punjabimmigration.com", img: getCloudinaryUrl("/projects/punjab-immigration/PCVIEW-PI.png"), mobileImg: getCloudinaryUrl("/projects/punjab-immigration/MOBILE VIEW.jpeg"), tag: "Immigration & Visa Platform" },
    { title: "Samarth Academy Portal", slug: "samarth-academy", url: "samarthacademy.in", img: getCloudinaryUrl("/projects/samarth-academy/PCVIEW-SAMARTH.png"), mobileImg: getCloudinaryUrl("/projects/samarth-academy/mobile1.PNG"), tag: "EdTech Learning Portal" },
    { title: "Dolma Aunti Momos Brand", slug: "dolma-aunti-momos", url: "dolmaauntimomos.com", img: getCloudinaryUrl("/projects/dolma-aunti-momos/PCVIEW-DOLMA.png"), mobileImg: getCloudinaryUrl("/projects/dolma-aunti-momos/MOBILE VIEW DOLMA.png"), tag: "F&B Digital Storefront" },
    { title: "BDS Blossoms School", slug: "bds-blossoms", url: "bdsblossoms.edu", img: getCloudinaryUrl("/projects/bds-blossoms/PCVIEW1.png"), mobileImg: getCloudinaryUrl("/projects/bds-blossoms/mobile1.PNG"), tag: "Educational Portal" },
    { title: "Dsidein Studio", slug: "dsidein", url: "dsidein.com", img: getCloudinaryUrl("/projects/dsidein/PCVIEW1.png"), mobileImg: getCloudinaryUrl("/projects/dsidein/MOBILEVIEW1.png"), tag: "Creative Studio Web App" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % webSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [webSlides.length]);

  const current = webSlides[currentIndex];
  const activeImage = isMobile ? (current.mobileImg || current.img) : current.img;

  return (
    <div style={{ width: "100%", maxWidth: isMobile ? "280px" : "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
      {/* PC / Mobile Monitor Frame Tile Wrapper */}
      <motion.div
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: isMobile ? "9/18" : "16/9",
          borderRadius: isMobile ? "28px" : "18px",
          border: "3px solid var(--ink)",
          overflow: "hidden",
          background: "#0F172A",
          boxShadow: isMobile ? "0 14px 28px rgba(0,0,0,0.22), 3px 5px 0 var(--ink)" : "0 16px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)",
          cursor: "pointer"
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#0F172A" }}>
          {/* Header Bar */}
          <div style={{ width: "100%", background: "#1E293B", padding: isMobile ? "8px 12px" : "10px 16px", display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #334155", zIndex: 20, flexShrink: 0 }}>
            {!isMobile && (
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F" }} />
              </div>
            )}
            {/* Address Bar */}
            <div style={{ flex: 1, background: "#0F172A", borderRadius: "8px", padding: "4px 10px", fontSize: isMobile ? "11px" : "13px", color: "#94A3B8", fontFamily: "monospace", display: "flex", alignItems: "center", gap: "6px", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", whiteSpace: "nowrap" }}>
              <span style={{ color: "#22C55E", display: "inline-flex", alignItems: "center" }}><VscLock size={12} /></span> https://{current.url}
            </div>
            <div style={{ fontSize: isMobile ? "10px" : "12px", color: "var(--yellow)", fontWeight: 800, fontFamily: "var(--font-headings)", padding: "2px 8px", background: "rgba(246,192,0,0.15)", borderRadius: "6px" }}>
              {currentIndex + 1} / {webSlides.length}
            </div>
          </div>

          {/* Website Screenshot Display Area */}
          <div style={{ position: "relative", flex: 1, overflow: "hidden", background: "#000" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={current.title}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: isMobile ? "contain" : "cover",
                  objectPosition: isMobile ? "center" : "top",
                  display: "block"
                }}
              />
            </AnimatePresence>

            {/* Bottom Controls Overlay */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)", padding: isMobile ? "14px 14px 10px" : "20px 24px 16px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ color: "var(--yellow)", fontSize: isMobile ? "10px" : "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", fontFamily: "var(--font-headings)" }}>{current.tag}</div>
                <div style={{ color: "#FFF", fontSize: isMobile ? "14px" : "20px", fontFamily: "var(--font-headings)", fontWeight: 900 }}>{current.title}</div>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => setCurrentIndex((prev) => (prev - 1 + webSlides.length) % webSlides.length)}
                  style={{ width: isMobile ? "28px" : "36px", height: isMobile ? "28px" : "36px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(6px)", border: "1.5px solid rgba(255,255,255,0.4)", color: "#FFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? "13px" : "16px", fontWeight: 900 }}
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % webSlides.length)}
                  style={{ width: isMobile ? "28px" : "36px", height: isMobile ? "28px" : "36px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(6px)", border: "1.5px solid rgba(255,255,255,0.4)", color: "#FFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? "13px" : "16px", fontWeight: 900 }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", justifyContent: "center", marginTop: "8px" }}>
        <Link
          href={`/portfolio/${current.slug}`}
          className="btn-sm"
        >
          View {current.title.split(" ")[0]} Case Study →
        </Link>
        <Link
          href="/showcase"
          className="btn-sm btn-ghost"
        >
          View All Websites →
        </Link>
      </div>
    </div>
  );
};

// Dual Vertical Container Showcase: Left 9:16 Auto-playing/scrolling reel, Right 9:16 Step-scrolling Instagram Grid
const DualVerticalShowcase = () => {
  const reels = [
    { title: "Zikr Randhawa Teaser", client: "Biinaii Studios", slug: "biinaii-studios", src: getCloudinaryUrl("/projects/biinaii-studios/teaserbn.mp4"), tag: "Official Teaser" },
    { title: "Punjab Immigration Reel", client: "Punjab Immigration", slug: "punjab-immigration", src: getCloudinaryUrl("/projects/punjab-immigration/_punjabimmigration_1779962453_3906930387473549860_67354189286.mp4"), tag: "Visa Campaign" },
    { title: "Dolma Momos Viral Reel", client: "Dolma Aunti Momos", slug: "dolma-aunti-momos", src: getCloudinaryUrl("/projects/dolma-aunti-momos/DAREEL1.mp4"), tag: "224K+ Views" },
    { title: "Harman Sekhon PR Reel", client: "Harman Sekhon", slug: "harman-sekhon", src: getCloudinaryUrl("/projects/harman-sekhon/hs1.mp4"), tag: "PR & Personal Brand" },
    { title: "Samarth Academy Reel", client: "Samarth Academy", slug: "samarth-academy", src: getCloudinaryUrl("/projects/samarth-academy/gs1.mp4"), tag: "EdTech Campaign" },
    { title: "Chaat King India Reel", client: "Chaat King India", slug: "chaat-king-india", src: getCloudinaryUrl("/projects/chaat-king-india/cki1.mp4"), tag: "F&B Franchise" },
  ];

  const instaGrids = [
    { title: "Punjab Immigration Grid", client: "Punjab Immigration", slug: "punjab-immigration", img: getCloudinaryUrl("/projects/punjab-immigration/IMG_1597.PNG"), tag: "Instagram Curation" },
    { title: "Dolma Momos Grid 01", client: "Dolma Aunti Momos", slug: "dolma-aunti-momos", img: getCloudinaryUrl("/projects/dolma-aunti-momos/IMG_1599.PNG"), tag: "Viral Brand Grid" },
    { title: "Dolma Momos Grid 02", client: "Dolma Aunti Momos", slug: "dolma-aunti-momos", img: getCloudinaryUrl("/projects/dolma-aunti-momos/IMG_1600.PNG"), tag: "Launch Aesthetics" },
    { title: "Chaat King India Grid 01", client: "Chaat King India", slug: "chaat-king-india", img: getCloudinaryUrl("/projects/chaat-king-india/IMG_1603.PNG"), tag: "Franchise Curation" },
    { title: "Chaat King India Grid 02", client: "Chaat King India", slug: "chaat-king-india", img: getCloudinaryUrl("/projects/chaat-king-india/IMG_1604.PNG"), tag: "Street Food Aesthetics" },
    { title: "Harman Sekhon Grid 01", client: "Harman Sekhon", slug: "harman-sekhon", img: getCloudinaryUrl("/projects/harman-sekhon/IMG_1616.PNG"), tag: "PR Feed Curation" },
    { title: "Harman Sekhon Grid 02", client: "Harman Sekhon", slug: "harman-sekhon", img: getCloudinaryUrl("/projects/harman-sekhon/IMG_1617.PNG"), tag: "Leadership Feed" },
  ];

  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [currentGridIndex, setCurrentGridIndex] = useState(0);

  // Auto scroll reels: wait 5.5s then scroll
  useEffect(() => {
    const reelTimer = setInterval(() => {
      setCurrentReelIndex((prev) => (prev + 1) % reels.length);
    }, 5500);
    return () => clearInterval(reelTimer);
  }, [reels.length]);

  // Auto scroll Instagram grids: wait 5.5s then scroll
  useEffect(() => {
    const gridTimer = setInterval(() => {
      setCurrentGridIndex((prev) => (prev + 1) % instaGrids.length);
    }, 5500);
    return () => clearInterval(gridTimer);
  }, [instaGrids.length]);

  const activeReel = reels[currentReelIndex];
  const activeGrid = instaGrids[currentGridIndex];

  return (
    <div style={{ display: "flex", gap: "32px", justifyContent: "center", width: "100%", maxWidth: "760px", margin: "0 auto", flexWrap: "wrap" }}>
      
      {/* 1. LEFT CONTAINER: VERTICAL AUTO-PLAYING & SCROLLING REEL */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%", maxWidth: "330px", alignItems: "center" }}>
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 220, damping: 25 }}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "9/16",
            borderRadius: "20px",
            border: "3px solid var(--ink)",
            overflow: "hidden",
            background: "#000",
            boxShadow: "0 16px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)"
          }}
        >
          {/* Top Frame Header */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)", padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 20 }}>
            <div style={{ fontSize: "11px", color: "var(--yellow)", fontWeight: 900, fontFamily: "var(--font-headings)", textTransform: "uppercase", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF0050" }} />
              Featured Reel
            </div>
            <div style={{ fontSize: "11px", color: "#FFF", fontWeight: 800, background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "100px", fontFamily: "var(--font-headings)" }}>
              {currentReelIndex + 1} / {reels.length}
            </div>
          </div>

          {/* Vertical Reel Player Container */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReel.src}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
                style={{ position: "absolute", inset: 0 }}
              >
                <video
                  src={`${activeReel.src}#t=0.1`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Reel Caption Overlay */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 70%, transparent 100%)", padding: "16px 16px 14px", zIndex: 20, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ color: "var(--yellow)", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "var(--font-headings)" }}>{activeReel.tag}</div>
              <div style={{ color: "#FFF", fontSize: "15px", fontFamily: "var(--font-headings)", fontWeight: 900 }}>{activeReel.client}</div>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={() => setCurrentReelIndex((prev) => (prev - 1 + reels.length) % reels.length)}
                style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.4)", color: "#FFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}
              >
                ↑
              </button>
              <button
                onClick={() => setCurrentReelIndex((prev) => (prev + 1) % reels.length)}
                style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.4)", color: "#FFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}
              >
                ↓
              </button>
            </div>
          </div>
        </motion.div>

        {/* Premium Case Study Link Button */}
        <Link
          href={`/portfolio/${activeReel.slug}`}
          className="btn-sm"
          style={{
            width: "100%",
            padding: "10px 18px",
            fontSize: "13px"
          }}
        >
          View {activeReel.client.split(" ")[0]} Case Study →
        </Link>
      </div>

      {/* 2. RIGHT CONTAINER: VERTICAL INSTAGRAM GRID (PAUSE THEN STEP SCROLL) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%", maxWidth: "330px", alignItems: "center" }}>
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 220, damping: 25 }}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "9/16",
            borderRadius: "20px",
            border: "3px solid var(--ink)",
            overflow: "hidden",
            background: "#0F172A",
            boxShadow: "0 16px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)"
          }}
        >
          {/* Top Frame Header */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)", padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 20 }}>
            <div style={{ fontSize: "11px", color: "var(--yellow)", fontWeight: 900, fontFamily: "var(--font-headings)", textTransform: "uppercase", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E1306C" }} />
              Instagram Grid Feed
            </div>
            <div style={{ fontSize: "11px", color: "#FFF", fontWeight: 800, background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "100px", fontFamily: "var(--font-headings)" }}>
              {currentGridIndex + 1} / {instaGrids.length}
            </div>
          </div>

          {/* Vertical Instagram Grid Step-Scroll Area */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGrid.img}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
                style={{ position: "absolute", inset: 0 }}
              >
                <img
                  src={activeGrid.img}
                  alt={activeGrid.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Instagram Grid Overlay */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 70%, transparent 100%)", padding: "16px 16px 14px", zIndex: 20, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ color: "var(--yellow)", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "var(--font-headings)" }}>{activeGrid.tag}</div>
              <div style={{ color: "#FFF", fontSize: "15px", fontFamily: "var(--font-headings)", fontWeight: 900 }}>{activeGrid.client}</div>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={() => setCurrentGridIndex((prev) => (prev - 1 + instaGrids.length) % instaGrids.length)}
                style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.4)", color: "#FFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}
              >
                ↑
              </button>
              <button
                onClick={() => setCurrentGridIndex((prev) => (prev + 1) % instaGrids.length)}
                style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.4)", color: "#FFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}
              >
                ↓
              </button>
            </div>
          </div>
        </motion.div>

        {/* Premium Portfolio Link Button */}
        <Link
          href={`/portfolio/${activeGrid.slug}`}
          className="btn-sm"
          style={{
            width: "100%",
            padding: "10px 18px",
            fontSize: "13px"
          }}
        >
          View {activeGrid.client.split(" ")[0]} Grid →
        </Link>
      </div>

    </div>
  );
};

// Video Production Showcase (Biinaii Studios Zikr Randhawa Teaser + Golden Batt BTS + Yug Chintak + Books Route + Case Study Redirects)
const VideoProductionShowcase = () => {
  const [activeTab, setActiveTab] = useState("biinaii-studios");

  const biinaiiVideos = [
    { title: "Golden Batt Music Video BTS (Official Behind The Scenes)", type: "youtube", id: "ZVHXu8a-NJI", embedUrl: "https://www.youtube.com/embed/ZVHXu8a-NJI?si=FLdU-qXg-oHnkORQ", thumbnail: "https://img.youtube.com/vi/ZVHXu8a-NJI/maxresdefault.jpg", tag: "Golden Batt BTS Shoot" },
    { title: "Biinaii Studios - Zikr Randhawa Official Teaser", type: "video", slug: "biinaii-studios", src: getCloudinaryUrl("/projects/biinaii-studios/teaserbn.mp4"), tag: "Official Teaser Release" },
    { title: "Biinaii Studios - Reel 01", type: "video", slug: "biinaii-studios", src: getCloudinaryUrl("/projects/biinaii-studios/bn1.mp4"), tag: "Artist Reel 01" },
    { title: "Biinaii Studios - Reel 02", type: "video", slug: "biinaii-studios", src: getCloudinaryUrl("/projects/biinaii-studios/bn2.mp4"), tag: "Artist Reel 02" },
    { title: "Biinaii Studios - Reel 03", type: "video", slug: "biinaii-studios", src: getCloudinaryUrl("/projects/biinaii-studios/bn3.mp4"), tag: "Artist Reel 03" },
    { title: "Biinaii Studios - Reel 04", type: "video", slug: "biinaii-studios", src: getCloudinaryUrl("/projects/biinaii-studios/bn4.mp4"), tag: "Artist Reel 04" },
  ];

  const yugChintakEpisodes = [
    { title: "Yug Chintak - Town Hall Amritsar (Ep 1)", slug: "yug-chintak", id: "amm9OPukoEA", thumbnail: "https://img.youtube.com/vi/amm9OPukoEA/maxresdefault.jpg" },
    { title: "Yug Chintak - Heritage & Culture (Ep 2)", slug: "yug-chintak", id: "z_DqiYL1Y1Y", thumbnail: "https://img.youtube.com/vi/z_DqiYL1Y1Y/maxresdefault.jpg" },
    { title: "Yug Chintak - Historical Legacy (Ep 3)", slug: "yug-chintak", id: "MeLX6j-nPp0", thumbnail: "https://img.youtube.com/vi/MeLX6j-nPp0/maxresdefault.jpg" },
  ];

  const booksRouteVideos = [
    { title: "Books Route Documentary 1", slug: "books-route", src: getCloudinaryUrl("/projects/books-route/sp1.mp4") },
    { title: "Books Route Documentary 2", slug: "books-route", src: getCloudinaryUrl("/projects/books-route/sp2.mp4") },
    { title: "Books Route Documentary 3", slug: "books-route", src: getCloudinaryUrl("/projects/books-route/sp4.mp4") },
    { title: "Books Route Documentary 4", slug: "books-route", src: getCloudinaryUrl("/projects/books-route/sp5.mp4") },
  ];

  const [activeBiinaiiIndex, setActiveBiinaiiIndex] = useState(0);
  const [activeYugIndex, setActiveYugIndex] = useState(0);
  const [activeBooksIndex, setActiveBooksIndex] = useState(0);
  const [isBiinaiiPlaying, setIsBiinaiiPlaying] = useState(false);
  const [isYugPlaying, setIsYugPlaying] = useState(false);

  const activeSlug =
    activeTab === "biinaii-studios"
      ? "biinaii-studios"
      : activeTab === "yug-chintak"
      ? "yug-chintak"
      : "books-route";

  const videoTabs = [
    {
      id: "biinaii-studios",
      label: "Biinaii Studios",
      tag: "BTS & Teaser",
      icon: <VscPlayCircle />,
      radius: "255px 15px 225px 15px / 15px 225px 15px 255px",
      rotation: "-1.2deg"
    },
    {
      id: "yug-chintak",
      label: "Yug Chintak",
      tag: "Series",
      icon: <VscDeviceCameraVideo />,
      radius: "18px 255px 15px 225px / 225px 15px 255px 18px",
      rotation: "0.8deg"
    },
    {
      id: "books-route",
      label: "Books Route",
      tag: "Documentaries",
      icon: <VscLibrary />,
      radius: "225px 15px 255px 15px / 15px 225px 15px 255px",
      rotation: "-0.8deg"
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", maxWidth: "860px", margin: "0 auto", alignItems: "center" }}>
      {/* Creative Crayon Video Showcase Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
        {videoTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === "biinaii-studios") setIsBiinaiiPlaying(false);
                if (tab.id === "yug-chintak") setIsYugPlaying(false);
              }}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "10px 22px",
                borderRadius: tab.radius,
                border: "2.5px solid var(--ink)",
                background: isActive ? "var(--yellow)" : "var(--paper)",
                color: "var(--ink)",
                fontFamily: "var(--font-headings)",
                fontWeight: 900,
                fontSize: "13px",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: isActive ? "5px 5.5px 0 var(--ink)" : "3px 3.5px 0 var(--ink)",
                transform: isActive ? `rotate(${tab.rotation}) translateY(-3px)` : `rotate(${tab.rotation})`,
                transition: "all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                position: "relative"
              }}
            >
              <span style={{ fontSize: "16px", lineHeight: 1 }}>{tab.icon}</span>
              <span>
                {tab.label}{" "}
                <span style={{ opacity: 0.7, fontWeight: 700, fontSize: "11px", marginLeft: "2px" }}>
                  ({tab.tag})
                </span>
              </span>
              {isActive && (
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#E11D48",
                    display: "inline-block",
                    boxShadow: "0 0 0 2.5px rgba(225, 29, 72, 0.3)",
                    marginLeft: "2px"
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Main Video Display Container */}
      <CustomTile aspectRatio="16/9" width="100%">
        {activeTab === "biinaii-studios" ? (
          biinaiiVideos[activeBiinaiiIndex].type === "youtube" ? (
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              {isBiinaiiPlaying ? (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ZVHXu8a-NJI?si=FLdU-qXg-oHnkORQ&autoplay=1"
                  title="Biinaii Studios — Golden Batt Music Video BTS"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              ) : (
                <div
                  onClick={() => setIsBiinaiiPlaying(true)}
                  style={{ width: "100%", height: "100%", position: "relative", cursor: "pointer" }}
                >
                  <img
                    src="https://img.youtube.com/vi/ZVHXu8a-NJI/maxresdefault.jpg"
                    alt="Golden Batt BTS"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  {/* Small Pill Button matching other reels */}
                  <div style={{
                    position: "absolute",
                    bottom: "14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "6px 16px",
                    borderRadius: "100px",
                    background: "rgba(15, 15, 15, 0.8)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-headings)",
                    fontWeight: 700,
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                  }}>
                    <span style={{ color: "var(--yellow)", fontSize: "9px" }}>▶</span> Click to play
                  </div>
                </div>
              )}
            </div>
          ) : (
            <video
              key={biinaiiVideos[activeBiinaiiIndex].src}
              src={`${biinaiiVideos[activeBiinaiiIndex].src}#t=0.1`}
              controls
              autoPlay
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "contain", background: "#000", display: "block" }}
            />
          )
        ) : activeTab === "yug-chintak" ? (
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            {isYugPlaying ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${yugChintakEpisodes[activeYugIndex].id}?autoplay=1`}
                title={yugChintakEpisodes[activeYugIndex].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              />
            ) : (
              <div
                onClick={() => setIsYugPlaying(true)}
                style={{ width: "100%", height: "100%", position: "relative", cursor: "pointer" }}
              >
                <img
                  src={yugChintakEpisodes[activeYugIndex].thumbnail}
                  alt={yugChintakEpisodes[activeYugIndex].title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Small Pill Button matching Biinaii Studios */}
                <div style={{
                  position: "absolute",
                  bottom: "14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "6px 16px",
                  borderRadius: "100px",
                  background: "rgba(15, 15, 15, 0.8)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-headings)",
                  fontWeight: 700,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                }}>
                  <span style={{ color: "var(--yellow)", fontSize: "9px" }}>▶</span> Click to play
                </div>
              </div>
            )}
          </div>
        ) : (
          <video
            key={booksRouteVideos[activeBooksIndex].src}
            src={`${booksRouteVideos[activeBooksIndex].src}#t=0.1`}
            controls
            autoPlay
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
      </CustomTile>

      {/* Video Selector Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", width: "100%" }}>
        {activeTab === "biinaii-studios"
          ? biinaiiVideos.map((bv, idx) => (
              <button
                key={bv.title}
                onClick={() => setActiveBiinaiiIndex(idx)}
                className={idx >= 2 ? "desktop-only-video-btn" : ""}
                style={{
                  padding: "8px",
                  borderRadius: "12px",
                  border: "2px solid var(--ink)",
                  background: activeBiinaiiIndex === idx ? "var(--ink)" : "#FFF",
                  color: activeBiinaiiIndex === idx ? "var(--yellow)" : "var(--ink)",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px"
                }}
              >
                <div style={{ width: "100%", aspectRatio: "16/9", background: "#000", borderRadius: "6px", overflow: "hidden", position: "relative" }}>
                  {bv.type === "youtube" ? (
                    <img src={bv.thumbnail} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <video src={`${bv.src}#t=0.1`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </div>
                <div style={{ fontSize: "11px", fontFamily: "var(--font-headings)", fontWeight: 800 }}>{bv.title}</div>
              </button>
            ))
          : activeTab === "yug-chintak"
          ? yugChintakEpisodes.map((ep, idx) => (
              <button
                key={ep.id}
                onClick={() => {
                  setActiveYugIndex(idx);
                  setIsYugPlaying(false);
                }}
                style={{
                  padding: "8px",
                  borderRadius: "12px",
                  border: "2px solid var(--ink)",
                  background: activeYugIndex === idx ? "var(--ink)" : "#FFF",
                  color: activeYugIndex === idx ? "var(--yellow)" : "var(--ink)",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px"
                }}
              >
                <img src={ep.thumbnail} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: "6px" }} />
                <div style={{ fontSize: "11px", fontFamily: "var(--font-headings)", fontWeight: 800 }}>{ep.title}</div>
              </button>
            ))
          : booksRouteVideos.map((vid, idx) => (
              <button
                key={vid.src}
                onClick={() => setActiveBooksIndex(idx)}
                style={{
                  padding: "8px",
                  borderRadius: "12px",
                  border: "2px solid var(--ink)",
                  background: activeBooksIndex === idx ? "var(--ink)" : "#FFF",
                  color: activeBooksIndex === idx ? "var(--yellow)" : "var(--ink)",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px"
                }}
              >
                <div style={{ width: "100%", aspectRatio: "16/9", background: "#111", borderRadius: "6px", overflow: "hidden" }}>
                  <video src={`${vid.src}#t=0.1`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ fontSize: "11px", fontFamily: "var(--font-headings)", fontWeight: 800 }}>{vid.title}</div>
              </button>
            ))}
      </div>

      {/* Button below in Y direction to redirect to the active project case study */}
      <Link
        href={`/portfolio/${activeSlug}`}
        className="btn-sm"
        style={{
          padding: "10px 24px",
          marginTop: "8px"
        }}
      >
        View Case Study →
      </Link>
    </div>
  );
};

const serviceData = [
  {
    id: "01",
    title: "Website Development",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", width: "100%" }}>
        <h3 className="service-card-h3" style={{ fontFamily: "var(--font-headings)", fontSize: "clamp(20px, 4vw, 32px)", textAlign: "center", maxWidth: "550px" }}>Websites that convert visitors into loyal customers.</h3>
        <WebSlideshow />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "16px" }}>
          {["Corporate Websites", "Landing Pages", "Portfolio Websites", "EdTech Platforms", "CMS Integration", "Responsive Design", "SEO Optimized", "Fast Performance"].map(tag => (
            <span key={tag} style={{ padding: "8px 16px", borderRadius: "100px", border: "1.5px solid var(--ink)", background: "var(--paper)", fontSize: "13px", fontFamily: "var(--font-headings)", fontWeight: 700, boxShadow: "2px 2px 0 var(--ink)" }}>{tag}</span>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "02",
    title: "Social Media & Reels",
    content: (
      <div className="social-media-service-row" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <h3 style={{ fontFamily: "var(--font-headings)", fontSize: "clamp(22px, 4vw, 32px)", textAlign: "center" }}>Social Media Strategy & Dual Feed Showcase</h3>
        <DualVerticalShowcase />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "12px" }}>
          {["Viral Reels", "Instagram Management", "Content Planning", "Community Growth", "Visual Feed Curation"].map(tag => (
            <span key={tag} style={{ padding: "8px 16px", borderRadius: "100px", border: "1.5px solid var(--ink)", background: "var(--yellow)", color: "var(--ink)", fontSize: "13px", fontFamily: "var(--font-headings)", fontWeight: 800, boxShadow: "2px 2px 0 var(--ink)" }}>{tag}</span>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "03",
    title: "Performance Marketing",
    content: (
      <div className="growth-section-card" style={{ background: "#FFFFFF", padding: "36px 32px", borderRadius: "28px", width: "100%", border: "3px solid var(--ink)", boxShadow: "8px 10px 0 var(--ink)", display: "flex", flexDirection: "column", gap: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-headings)", fontWeight: 900, textTransform: "uppercase", color: "var(--ink-45)", letterSpacing: "1.5px" }}>Growth & ROI Engine</div>
            <h3 style={{ fontFamily: "var(--font-headings)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, textTransform: "uppercase", color: "var(--ink)", marginTop: "4px" }}>Performance Marketing Dashboard</h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#ECFDF5", color: "#065F46", padding: "6px 14px", borderRadius: "100px", border: "1.5px solid #10B981", fontSize: "12px", fontFamily: "var(--font-headings)", fontWeight: 800 }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }} />
            Live Campaigns Active
          </div>
        </div>

        <div className="perf-marketing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
          {[
            { label: "Weekly Leads", value: "50+ Leads", sub: "+310% vs baseline", accent: "#3B82F6", fill: "#EFF6FF" },
            { label: "Avg ROAS", value: "4.8x ROI", sub: "Optimized ad spend", accent: "#10B981", fill: "#ECFDF5" },
            { label: "Video Views", value: "10M+ Views", sub: "Organic + Meta ads", accent: "#8B5CF6", fill: "#F5F3FF" }
          ].map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              style={{ background: m.fill, padding: "20px 18px", borderRadius: "18px", border: `2px solid ${m.accent}`, display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <div style={{ fontSize: "12px", fontFamily: "var(--font-headings)", fontWeight: 800, color: "var(--ink-70)", textTransform: "uppercase" }}>{m.label}</div>
              <div style={{ fontSize: "24px", fontFamily: "var(--font-headings)", fontWeight: 900, color: "var(--ink)" }}>{m.value}</div>
              <div style={{ fontSize: "11px", color: m.accent, fontWeight: 800, fontFamily: "var(--font-headings)" }}>{m.sub}</div>
              <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.2 }} style={{ height: "6px", background: m.accent, borderRadius: "3px", marginTop: "4px" }} />
            </motion.div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {["Google Search Ads", "Meta Reels Ads", "High-Converting Funnels", "50+ Weekly Leads", "ROAS Optimization", "Retargeting"].map(tag => (
            <span key={tag} style={{ padding: "8px 16px", borderRadius: "100px", border: "2px solid var(--ink)", background: "var(--paper)", color: "var(--ink)", fontSize: "13px", fontFamily: "var(--font-headings)", fontWeight: 800, boxShadow: "2.5px 2.5px 0 var(--ink)" }}>{tag}</span>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "04",
    title: "Video Production",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", width: "100%" }}>
        <h3 style={{ fontFamily: "var(--font-headings)", fontSize: "clamp(22px, 4vw, 32px)", textAlign: "center" }}>Teasers, Documentaries & Horizontal Video Production</h3>
        <VideoProductionShowcase />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "16px" }}>
          {["Zikr Randhawa Teaser", "Biinaii Studios", "Yug Chintak Series", "Books Route Documentaries", "Commercials", "Color Grading"].map(tag => (
            <span key={tag} style={{ padding: "8px 16px", borderRadius: "100px", border: "1.5px solid var(--ink)", background: "var(--paper)", fontSize: "13px", fontFamily: "var(--font-headings)", fontWeight: 700, boxShadow: "2px 2px 0 var(--ink)" }}>{tag}</span>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "05",
    title: "Branding",
    content: (
      <div style={{ background: "#FFFFFF", padding: "36px 32px", borderRadius: "28px", width: "100%", border: "3px solid var(--ink)", boxShadow: "8px 10px 0 var(--ink)", display: "flex", flexDirection: "column", gap: "28px" }}>
        <div>
          <div style={{ fontSize: "11px", fontFamily: "var(--font-headings)", fontWeight: 900, textTransform: "uppercase", color: "var(--ink-45)", letterSpacing: "1.5px" }}>Identity & Visual Strategy</div>
          <h3 style={{ fontFamily: "var(--font-headings)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, textTransform: "uppercase", color: "var(--ink)", marginTop: "4px" }}>Complete Brand Systems & Logo Suites</h3>
        </div>

        <div className="branding-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "16px" }}>
          <motion.div whileHover={{ y: -4 }} style={{ height: "130px", background: "var(--ink)", borderRadius: "18px", color: "var(--yellow)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2.5px solid var(--ink)", boxShadow: "4px 4px 0 var(--yellow)" }}>
            <span style={{ fontSize: "28px", fontFamily: "var(--font-headings)", fontWeight: 900 }}>DSIDE</span>
            <span style={{ fontSize: "10px", letterSpacing: "2px", color: "#FFF", textTransform: "uppercase", marginTop: "2px" }}>Brand Kit</span>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} style={{ height: "130px", background: "#FEF3C7", borderRadius: "18px", color: "#92400E", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2.5px solid #F59E0B", padding: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "32px", fontFamily: "serif", fontWeight: 700 }}>Aa Bb</span>
            <span style={{ fontSize: "11px", fontFamily: "var(--font-headings)", fontWeight: 800, marginTop: "4px" }}>Typography Suite</span>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} style={{ height: "130px", background: "linear-gradient(135deg, #10B981 0%, #065F46 100%)", borderRadius: "18px", color: "#FFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2.5px solid var(--ink)", padding: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "13px", fontFamily: "var(--font-headings)", fontWeight: 900, textTransform: "uppercase" }}>Harmonious Palettes</span>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
              {["#F59E0B", "#10B981", "#6366F1", "#EC4899"].map(c => (
                <span key={c} style={{ width: "14px", height: "14px", borderRadius: "50%", background: c, border: "1.5px solid #FFF" }} />
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {["Logo Design", "Brand Guidelines Kit", "Typography Pairing", "Color Palette System", "Packaging Design", "Social Brand Identity"].map(tag => (
            <span key={tag} style={{ padding: "8px 16px", borderRadius: "100px", border: "2px solid var(--ink)", background: "var(--paper)", color: "var(--ink)", fontSize: "13px", fontFamily: "var(--font-headings)", fontWeight: 800, boxShadow: "2.5px 2.5px 0 var(--ink)" }}>{tag}</span>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "06",
    title: "SEO & Google Business",
    content: (
      <div className="gmb-section-card" style={{ background: "#FFFFFF", padding: "36px 32px", borderRadius: "28px", width: "100%", border: "3px solid var(--ink)", boxShadow: "8px 10px 0 var(--ink)", display: "flex", flexDirection: "column", gap: "28px" }}>
        <div>
          <div style={{ fontSize: "11px", fontFamily: "var(--font-headings)", fontWeight: 900, textTransform: "uppercase", color: "var(--ink-45)", letterSpacing: "1.5px" }}>Search Dominance & Maps</div>
          <h3 style={{ fontFamily: "var(--font-headings)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, textTransform: "uppercase", color: "var(--ink)", marginTop: "4px" }}>Local SEO & Google Business Profile Optimization</h3>
        </div>

        {/* Interactive Simulated Google Search & Maps Card */}
        <div className="gmb-simulated-card" style={{ background: "var(--paper)", padding: "20px", borderRadius: "20px", border: "2.5px solid var(--ink)", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div className="gmb-search-bar-row" style={{ display: "flex", alignItems: "center", gap: "12px", background: "#FFF", padding: "12px 18px", borderRadius: "100px", border: "2px solid var(--ink)", boxShadow: "2px 3px 0 var(--ink)" }}>
            <span style={{ fontSize: "16px", flexShrink: 0, display: "inline-flex", alignItems: "center" }}><VscSearch /></span>
            <span className="gmb-search-query-text" style={{ fontFamily: "var(--font-headings)", fontWeight: 800, fontSize: "14px", color: "var(--ink)" }}>Best Immigration & Dining Near Me</span>
            <span className="gmb-rank-badge" style={{ marginLeft: "auto", background: "#3B82F6", color: "#FFF", padding: "4px 10px", borderRadius: "100px", fontSize: "11px", fontFamily: "var(--font-headings)", fontWeight: 900, flexShrink: 0 }}>#1 Ranked</span>
          </div>

          <div className="gmb-result-box" style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center", background: "#FFF", padding: "16px", borderRadius: "14px", border: "1.5px solid rgba(0,0,0,0.1)" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#FEF3C7", border: "2px solid #F59E0B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}><VscLocation /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="gmb-result-title" style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "15px" }}>Punjab Immigration & Dolma Momos</div>
              <div className="gmb-result-sub" style={{ fontSize: "12.5px", color: "#059669", fontWeight: 800, marginTop: "2px" }}>★★★★★ 4.9 (150+ Verified Google Reviews) • GMB First Drive Ready</div>
            </div>
          </div>
        </div>

        <div className="gmb-tags-container" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {["Google Business Profile (GMB)", "GMB First Drive Optimization", "Local Maps Ranking", "Review Management", "Technical On-Page SEO", "Schema Markup"].map(tag => (
            <span key={tag} className="gmb-tag-chip" style={{ padding: "8px 16px", borderRadius: "100px", border: "2px solid var(--ink)", background: "var(--paper)", color: "var(--ink)", fontSize: "13px", fontFamily: "var(--font-headings)", fontWeight: 800, boxShadow: "2.5px 2.5px 0 var(--ink)" }}>{tag}</span>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "07",
    title: "Political PR",
    content: (
      <div className="growth-section-card political-pr-section-card" style={{ background: "#FFFFFF", padding: "36px 32px", borderRadius: "28px", width: "100%", border: "3px solid var(--ink)", boxShadow: "8px 10px 0 var(--ink)", display: "flex", flexDirection: "column", gap: "28px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-headings)", fontWeight: 900, textTransform: "uppercase", color: "var(--ink-45)", letterSpacing: "1.5px" }}>
              Public Authority & Leadership
            </div>
            <div className="mobile-anonymous-badge">
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#FFF1F2",
                color: "#BE123C",
                border: "1.5px solid #FB7185",
                padding: "4px 12px",
                borderRadius: "100px",
                fontSize: "11px",
                fontFamily: "var(--font-headings)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Completely Anonymous
              </span>
            </div>
          </div>
          <h3 style={{ fontFamily: "var(--font-headings)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, textTransform: "uppercase", color: "var(--ink)", marginTop: "4px" }}>
            Political PR & Strategic Public Communication
          </h3>
        </div>

        <div className="political-pr-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          {[
            {
              title: "Personal Branding",
              desc: "15K+ Followers Growth",
              tag: "Authority & Image",
              accent: "#2563EB",
              bg: "#EFF6FF",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              )
            },
            {
              title: "PR Projections",
              desc: "1M+ Organic Views",
              tag: "National Media Reach",
              accent: "#D97706",
              bg: "#FEF3C7",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 11 18-5v12L3 14v-3z"/>
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
                </svg>
              )
            },
            {
              title: "Campaign Strategy",
              desc: "Constituency Outreach",
              tag: "Targeted Groundwork",
              accent: "#7C3AED",
              bg: "#F5F3FF",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              )
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{
                background: item.bg,
                border: `2px solid ${item.accent}`,
                borderRadius: "20px",
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                boxShadow: `0 4px 12px rgba(0,0,0,0.03)`
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "#FFFFFF",
                  border: `2px solid ${item.accent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.accent,
                  boxShadow: `2px 2px 0 ${item.accent}`
                }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-headings)", fontWeight: 800, color: item.accent, background: "#FFFFFF", padding: "3px 10px", borderRadius: "100px", border: `1px solid ${item.accent}` }}>
                  {item.tag}
                </span>
              </div>

              <div>
                <div style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "17px", color: "var(--ink)" }}>
                  {item.title}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 800, color: item.accent, fontFamily: "var(--font-headings)", marginTop: "4px" }}>
                  {item.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {["15K+ Follower Growth", "1M+ PR Video Views", "Leadership Branding", "Meta Ads Campaign", "Constituency Media", "Press Outreach"].map(tag => (
            <span key={tag} style={{ padding: "8px 16px", borderRadius: "100px", border: "2px solid var(--ink)", background: "var(--paper)", color: "var(--ink)", fontSize: "13px", fontFamily: "var(--font-headings)", fontWeight: 800, boxShadow: "2.5px 2.5px 0 var(--ink)" }}>{tag}</span>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "08",
    title: "AI Solutions",
    content: (
      <div style={{ background: "#FFFFFF", padding: "36px 32px", borderRadius: "28px", width: "100%", border: "3px solid var(--ink)", boxShadow: "8px 10px 0 var(--ink)", display: "flex", flexDirection: "column", gap: "28px" }}>
        <div>
          <div style={{ fontSize: "11px", fontFamily: "var(--font-headings)", fontWeight: 900, textTransform: "uppercase", color: "#6366F1", letterSpacing: "1.5px" }}>Next-Gen Automation</div>
          <h3 style={{ fontFamily: "var(--font-headings)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, textTransform: "uppercase", color: "var(--ink)", marginTop: "4px" }}>AI Chatbots, Workflows & Agents</h3>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {["AI Customer Chatbots", "Automated Lead Qualifying", "AI Content Systems", "Custom Workflow Automation", "CRM Integration"].map(tag => (
            <motion.span key={tag} whileHover={{ scale: 1.05, y: -2 }} style={{ padding: "10px 20px", borderRadius: "100px", border: "2px solid var(--ink)", background: "var(--paper)", color: "var(--ink)", boxShadow: "3px 3px 0 var(--ink)", fontSize: "13.5px", fontFamily: "var(--font-headings)", fontWeight: 800 }}>{tag}</motion.span>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "09",
    title: "Influencer PR & Hype",
    content: (
      <div style={{ background: "#FFFFFF", padding: "36px 32px", borderRadius: "28px", width: "100%", border: "3px solid var(--ink)", boxShadow: "8px 10px 0 var(--ink)", display: "flex", flexDirection: "column", gap: "28px" }}>
        <div>
          <div style={{ fontSize: "11px", fontFamily: "var(--font-headings)", fontWeight: 900, textTransform: "uppercase", color: "#8B5CF6", letterSpacing: "1.5px" }}>Organic Hype & Viral Outreach</div>
          <h3 style={{ fontFamily: "var(--font-headings)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, textTransform: "uppercase", color: "var(--ink)", marginTop: "4px" }}>Creator Partnerships & Viral Seeding</h3>
          <p style={{ fontSize: "15px", color: "var(--ink-70)", maxWidth: "580px", lineHeight: 1.6, marginTop: "8px" }}>Connecting top creators and influencers with your brand to trigger organic word-of-mouth hype and launch momentum.</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {[
            { tag: "Creator Seeding", bg: "#EFF6FF", color: "#1D4ED8", border: "#3B82F6" },
            { tag: "Event Management", bg: "#FEF3C7", color: "#B45309", border: "#F59E0B" },
            { tag: "Viral Launch PR", bg: "#FCE7F3", color: "#BE185D", border: "#EC4899" },
            { tag: "Brand Collaborations", bg: "#ECFDF5", color: "#047857", border: "#10B981" },
            { tag: "Press Outreach", bg: "#F5F3FF", color: "#6D28D9", border: "#8B5CF6" },
            { tag: "Campaign Hype", bg: "#FFF7ED", color: "#C2410C", border: "#F97316" }
          ].map(item => (
            <motion.span
              key={item.tag}
              whileHover={{ scale: 1.05, y: -2 }}
              style={{
                padding: "10px 20px",
                borderRadius: "100px",
                border: `2px solid ${item.border}`,
                background: item.bg,
                color: item.color,
                fontSize: "13.5px",
                fontFamily: "var(--font-headings)",
                fontWeight: 900,
                boxShadow: `2.5px 2.5px 0 ${item.border}`,
                transition: "all 0.2s ease"
              }}
            >
              {item.tag}
            </motion.span>
          ))}
        </div>
      </div>
    )
  }
];

export default function ServiceExplorer() {
  const [activeId, setActiveId] = useState("01");
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id.replace("service-", ""));
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    serviceData.forEach((s) => {
      const el = document.getElementById(`service-${s.id}`);
      if (el) observer.observe(el);
    });

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(`service-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="service-explorer-section" style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 40px" }}>
      <style>{`
        .service-explorer-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 56px;
          align-items: start;
        }
        .service-nav-sticky {
          position: sticky;
          top: 110px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 40;
        }
        .service-nav-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .service-content-col {
          display: flex;
          flex-direction: column;
          gap: 80px;
          width: 100%;
          min-width: 0;
        }
        .service-card-item {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          scroll-margin-top: 130px;
        }

        @media (max-width: 900px) {
          .service-explorer-section {
            padding: 32px 16px !important;
          }
          .service-explorer-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .service-nav-sticky {
            position: sticky !important;
            top: 70px !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 8px 0 !important;
            margin: 0 0 20px 0 !important;
            width: 100% !important;
            background: transparent !important;
            border-bottom: none !important;
            z-index: 60 !important;
            pointer-events: none;
          }
          .service-nav-header {
            display: none !important;
          }
          .service-nav-list {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            margin: 0 auto !important;
            pointer-events: auto;
          }
          .service-nav-btn {
            display: none !important;
          }
          .service-nav-btn.active {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            background: rgba(30, 30, 30, 0.85) !important;
            backdrop-filter: blur(14px) !important;
            -webkit-backdrop-filter: blur(14px) !important;
            color: var(--yellow) !important;
            border: 2px solid var(--ink) !important;
            padding: 8px 22px !important;
            border-radius: 100px !important;
            font-size: 13.5px !important;
            font-family: var(--font-headings) !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2), 3px 4px 0 var(--ink) !important;
            margin: 0 auto !important;
            white-space: nowrap !important;
          }
          .active-dot {
            display: inline-block !important;
            background: var(--yellow) !important;
            margin-left: 4px !important;
          }
          .desktop-only-video-btn {
            display: none !important;
          }
          .growth-section-card,
          .gmb-section-card {
            padding: 20px 16px !important;
            border-radius: 20px !important;
            box-shadow: 4px 5px 0 var(--ink) !important;
            gap: 18px !important;
          }
          .growth-section-card h3,
          .gmb-section-card h3 {
            font-size: 18px !important;
            line-height: 1.25 !important;
          }
          .gmb-simulated-card {
            padding: 14px 12px !important;
            gap: 10px !important;
            border-radius: 16px !important;
          }
          .gmb-search-bar-row {
            padding: 10px 12px !important;
            border-radius: 14px !important;
            gap: 8px !important;
          }
          .gmb-search-query-text {
            font-size: 12px !important;
            line-height: 1.3 !important;
          }
          .gmb-rank-badge {
            font-size: 9.5px !important;
            padding: 3px 7px !important;
          }
          .gmb-result-box {
            padding: 12px 10px !important;
            gap: 10px !important;
          }
          .gmb-result-title {
            font-size: 13.5px !important;
          }
          .gmb-result-sub {
            font-size: 11px !important;
          }
          .gmb-tag-chip {
            padding: 6px 12px !important;
            font-size: 11px !important;
            box-shadow: 1.5px 2px 0 var(--ink) !important;
          }
          .perf-marketing-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .service-content-col {
            gap: 56px !important;
          }
          .branding-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .political-pr-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .mobile-anonymous-badge {
            display: inline-flex !important;
          }
          .service-card-item h3 {
            font-size: 22px !important;
          }
          .service-card-item p {
            font-size: 14.5px !important;
          }
        }
        .mobile-anonymous-badge {
          display: none;
        }
      `}</style>

      <div className="service-explorer-grid">
        
        {/* Navigation Bar (Sticky Left on PC, Swipable Pills Bar on Mobile) */}
        <div className="service-nav-sticky">
          <div className="service-nav-header" style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "var(--ink-45)", marginBottom: "16px" }}>
            Interactive Explorer
          </div>
          <div className="service-nav-list">
            {serviceData.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`service-nav-btn ${activeId === s.id ? "active" : ""}`}
                style={{
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  fontFamily: "var(--font-headings)",
                  fontSize: "19px",
                  fontWeight: 900,
                  color: activeId === s.id ? "var(--ink)" : "var(--ink-45)",
                  cursor: "pointer",
                  padding: "6px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap"
                }}
              >
                <span style={{ fontSize: "14px", color: "var(--yellow)", width: "20px" }}>{s.id}</span>
                {s.title}
                {activeId === s.id && (
                  <motion.div layoutId="active-indicator" className="active-dot" style={{ width: "8px", height: "8px", background: "var(--yellow)", borderRadius: "50%", marginLeft: "auto" }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Scrollable Content */}
        <div className="service-content-col">
          {serviceData.map((s) => (
            <div 
              key={s.id} 
              id={`service-${s.id}`} 
              className="service-card-item"
            >
              {s.content}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
