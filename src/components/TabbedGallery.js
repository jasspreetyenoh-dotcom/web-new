import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { VscClose, VscChevronLeft, VscChevronRight, VscSearch, VscLock, VscPlay } from "react-icons/vsc";

// Clean Custom YouTube Play Card (No noisy YouTube overlays before play, matching other reels)
const YouTubePlayCard = ({ item, idx }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getYouTubeId = (url) => {
    if (!url) return "";
    const match = url.match(/(?:embed\/|v=|vi\/|youtu\.be\/|\/v\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : "";
  };

  const youtubeId = getYouTubeId(item.src);
  const thumbnailUrl = item.thumbnail || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : "");
  const autoplaySrc = item.src ? (item.src.includes("?") ? `${item.src}&autoplay=1` : `${item.src}?autoplay=1`) : "";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        borderRadius: "16px",
        overflow: "hidden",
        border: "2.5px solid var(--ink)",
        boxShadow: "5px 7px 0 var(--ink)",
        background: "#000"
      }}
    >
      {isPlaying ? (
        <iframe
          src={autoplaySrc}
          title={item.caption || `Video ${idx + 1}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      ) : (
        <div
          onClick={() => setIsPlaying(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            cursor: "pointer"
          }}
        >
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt={item.caption || "Video thumbnail"}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}

          {/* Small Pill Button matching other reels */}
          <div style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "5px 14px",
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
            <VscPlay size={10} style={{ color: "var(--yellow)" }} /> Click to play
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Home-Screen Style PC Web Tile Container
const PCWebTile = ({ item, openLightbox, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      onClick={() => openLightbox(index)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -8 : 0,
        scale: isHovered ? 1.015 : 1,
        boxShadow: isHovered
          ? "0 22px 38px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)"
          : "0 12px 24px rgba(0,0,0,0.14), 3px 4px 0 var(--ink)"
      }}
      transition={{ type: "spring", stiffness: 220, damping: 25 }}
      style={{
        position: "relative",
        width: "100%",
        gridColumn: "1 / -1",
        borderRadius: "16px",
        border: "2.5px solid var(--ink)",
        overflow: "hidden",
        background: "#0f172a",
        cursor: "pointer"
      }}
    >
      {/* PC Browser Header Bar */}
      <div
        style={{
          width: "100%",
          background: "var(--ink)",
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27C93F" }} />
        </div>
        <div style={{ fontSize: "11px", color: "var(--yellow)", fontWeight: 800, fontFamily: "var(--font-headings)", textTransform: "uppercase" }}>
          Desktop Web Showcase
        </div>
      </div>

      <div style={{ width: "100%", aspectRatio: "16/9", background: "#000", overflow: "hidden" }}>
        <img
          src={item.src}
          alt={item.caption || "Desktop screenshot"}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
        />
      </div>

      {item.caption && (
        <div style={{ padding: "10px 16px", background: "var(--ink)", color: "#FFF", fontSize: "12px", fontFamily: "var(--font-headings)", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>{item.caption}</span>
          <span style={{ color: "var(--yellow)", display: "inline-flex", alignItems: "center", gap: "6px" }}><VscSearch /> Click to Expand</span>
        </div>
      )}
    </motion.div>
  );
};

// Custom Home-Screen Style Mobile Web Tile Container
const MobileWebTile = ({ item, openLightbox, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      onClick={() => openLightbox(index)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -8 : 0,
        scale: isHovered ? 1.03 : 1,
        boxShadow: isHovered
          ? "0 18px 32px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)"
          : "0 10px 20px rgba(0,0,0,0.14), 2.5px 3.5px 0 var(--ink)"
      }}
      transition={{ type: "spring", stiffness: 220, damping: 25 }}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "320px",
        margin: "0 auto",
        borderRadius: "16px",
        border: "2.5px solid var(--ink)",
        overflow: "hidden",
        background: "#0f172a",
        cursor: "pointer"
      }}
    >
      {/* Mobile Header Bar */}
      <div
        style={{
          width: "100%",
          background: "var(--ink)",
          padding: "6px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#27C93F" }} />
        </div>
        <div style={{ fontSize: "10px", color: "var(--yellow)", fontWeight: 800, fontFamily: "var(--font-headings)", textTransform: "uppercase" }}>
          Mobile Web View
        </div>
      </div>

      {/* Image Container with Contain to avoid cropping cropped mobile screenshots */}
      <div style={{ width: "100%", aspectRatio: "9/16", background: "#000", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src={item.src}
          alt={item.caption || "Mobile screenshot"}
          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "top", display: "block" }}
        />
      </div>

      {/* Caption Bar */}
      {item.caption && (
        <div style={{ padding: "8px 12px", background: "var(--ink)", color: "#FFF", fontSize: "11px", fontFamily: "var(--font-headings)", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.caption}</span>
          <span style={{ color: "var(--yellow)" }}><VscSearch /></span>
        </div>
      )}
    </motion.div>
  );
};

export default function TabbedGallery({ gallery = [] }) {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const reelsRef = useRef(null);
  const graphicsRef = useRef(null);

  const handleReelScroll = (e) => {
    const container = e.target;
    const scrollPosition = container.scrollLeft;
    const itemWidth = (container.firstElementChild?.offsetWidth || 260) + 16;
    const index = Math.round(scrollPosition / itemWidth);
    if (index !== activeReelIndex) {
      setActiveReelIndex(Math.min(Math.max(index, 0), 12));
    }
  };

  const scrollContainer = (ref, direction) => {
    if (ref && ref.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const safeGallery = gallery || [];

  // Extract unique categories from gallery items
  const categories = ["All", ...new Set(safeGallery.map(item => item.category).filter(Boolean))];

  const filteredGallery = activeTab === "All" 
    ? safeGallery 
    : safeGallery.filter(item => item.category === activeTab);

  // Toggle body class to hide Global Dock when Lightbox is active
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [lightboxIndex]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextMedia = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevMedia = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextMedia();
      if (e.key === "ArrowLeft") prevMedia();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredGallery.length]);

  const activeMedia = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  // Separate website views (PC & Mobile) vs Reels vs Graphics
  const websiteItems = safeGallery.filter(i => i.category === "Website" || (i.src && (i.src.toLowerCase().includes("pcview") || i.src.toLowerCase().includes("mobile"))));
  const pcWebItem = websiteItems.find(i => (i.src && i.src.includes("PCVIEW")) || (i.caption && i.caption.toLowerCase().includes("desktop")));
  const mobileWebItem = websiteItems.find(i => (i.src && i.src.toLowerCase().includes("mobile")) || (i.caption && i.caption.toLowerCase().includes("mobile")));

  const allYouTube = safeGallery.filter(i => i.type === "youtube");
  const allReels = safeGallery.filter(i => (i.category === "Reels" || i.type === "video") && i.type !== "youtube");
  const horizontalReels = allReels.filter(i => i.aspectRatio === "16/9");
  const verticalReels = allReels.filter(i => i.aspectRatio !== "16/9");
  const instaGridItems = safeGallery.filter(i => i.category === "Social Grid" || i.category === "Instagram Grid" || (i.src && (i.src.toLowerCase().includes("img_1597") || i.src.toLowerCase().includes("img_1616") || i.src.toLowerCase().includes("img_1617") || i.src.toLowerCase().includes("img_1605") || i.src.toLowerCase().includes("img_1606"))));
  const allGraphics = safeGallery.filter(i => i.category !== "Reels" && i.type !== "video" && i.type !== "youtube" && !websiteItems.includes(i) && !instaGridItems.includes(i));

  const isWebTab = activeTab === "All" || activeTab.toLowerCase().includes("web") || activeTab.toLowerCase().includes("software");
  const isReelsTab = activeTab === "All" || activeTab.toLowerCase().includes("reel") || activeTab.toLowerCase().includes("video");
  const isGraphicsTab = activeTab === "All" || activeTab.toLowerCase().includes("graphic") || activeTab.toLowerCase().includes("social") || activeTab.toLowerCase().includes("brand");

  if (safeGallery.length === 0) {
    return (
      <div style={{
        padding: "60px 32px",
        background: "var(--ink)",
        color: "var(--paper)",
        borderRadius: "28px",
        textAlign: "center",
        border: "3px solid var(--yellow)",
        maxWidth: "900px",
        margin: "40px auto 0",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
      }}>
        <div style={{ fontSize: "40px", marginBottom: "16px", color: "var(--ink-45)" }}><VscLock /></div>
        <h4 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "28px", color: "var(--yellow)", textTransform: "uppercase", marginBottom: "12px" }}>
          Confidential Political PR Portfolio
        </h4>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
          Under strict non-disclosure agreements (NDA) and confidentiality protocols, specific client names, campaign photos, and video media are protected. Performance statistics above reflect real verified deliverables.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "40px" }}>
      <style>{`
        .horizontal-reels-slider {
          display: flex !important;
          flex-direction: row !important;
          overflow-x: auto !important;
          scroll-snap-type: x mandatory !important;
          -webkit-overflow-scrolling: touch !important;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
          width: 100% !important;
          padding-top: 16px !important;
          padding-bottom: 16px !important;
          padding-left: 20px !important;
          padding-right: 20px !important;
          margin-top: -12px !important;
          gap: 16px !important;
        }
        .horizontal-reels-slider::-webkit-scrollbar {
          display: none !important;
        }

        @media (max-width: 768px) {
          .website-grid-wrap,
          .insta-grid-wrap,
          .graphics-grid-wrap,
          .youtube-grid-wrap {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            gap: 24px !important;
          }

          .mobile-web-tile,
          .pc-web-tile,
          .insta-grid-tile,
          .graphic-card {
            max-width: 310px !important;
            width: 100% !important;
            margin: 0 auto !important;
          }

          .horizontal-reels-slider .reel-card {
            flex: 0 0 75vw !important;
            width: 75vw !important;
            max-width: 240px !important;
            aspect-ratio: 9/16 !important;
            margin: 0 !important;
            scroll-snap-align: center !important;
            border: 1.5px solid rgba(15,23,42,0.25) !important;
            box-shadow: 0 6px 16px rgba(0,0,0,0.08) !important;
            border-radius: 14px !important;
          }

          .youtube-card-wrap {
            max-width: 360px !important;
            width: 100% !important;
            margin: 0 auto !important;
          }

          .gallery-section-header-wrap {
            width: 100% !important;
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            margin-bottom: 20px !important;
          }

          .gallery-header-badge {
            display: none !important;
          }
        }
      `}</style>

      {/* Category Tabs */}
      {categories.length > 2 && (
        <div style={{ 
          display: "flex", 
          gap: "12px", 
          marginBottom: "40px", 
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveTab(cat)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 2, boxShadow: "0px 0px 0 var(--ink)" }}
              style={{
                position: "relative",
                padding: "8px 24px",
                borderRadius: "100px",
                background: activeTab === cat ? "var(--ink)" : "var(--paper)",
                border: "2.5px solid var(--ink)",
                boxShadow: activeTab === cat ? "2px 2px 0 var(--ink)" : "4px 4px 0 var(--ink)",
                fontFamily: "var(--font-headings)",
                fontWeight: 800,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: activeTab === cat ? "var(--yellow)" : "var(--ink)",
                cursor: "pointer",
                transition: "background 0.1s ease, color 0.1s ease, box-shadow 0.1s ease",
                zIndex: 1,
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      )}

      {/* Main Gallery Container with Structured Ratios */}
      <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
        
        {/* SECTION 1: ALL WEBSITE SCREENSHOTS */}
        {websiteItems.length > 0 && isWebTab && (
          <div>
            <div className="gallery-section-header-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--yellow)" }} />
                <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(20px, 4vw, 32px)", textTransform: "uppercase", margin: 0, color: "var(--ink)", lineHeight: 1.1 }}>
                  {isMobile ? "WEBSITE VIEW" : "Desktop & Mobile Web Showcase"}
                </h3>
              </div>
            </div>

            {/* PC: side-by-side — fixed height row so both cards actually render */}
            {!isMobile ? (
              <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "24px",
                alignItems: "stretch",
                height: "clamp(260px, 34vw, 500px)"
              }}>
                {/* Left: Desktop screenshot */}
                {pcWebItem && (
                  <motion.div
                    onClick={() => openLightbox(filteredGallery.indexOf(pcWebItem))}
                    whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      position: "relative",
                      flex: "1 1 0",
                      minWidth: 0,
                      height: "100%",
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "#FFFFFF",
                      border: "2.5px solid var(--ink)",
                      boxShadow: "0 10px 24px rgba(0,0,0,0.14), 2px 3px 0 var(--ink)",
                      cursor: "pointer"
                    }}
                  >
                    <img
                      src={pcWebItem.src}
                      alt={pcWebItem.caption || "Desktop View"}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                    />
                    <div style={{
                      position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)",
                      padding: "5px 14px", borderRadius: "100px",
                      background: "rgba(15,15,15,0.75)", backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.2)", color: "#FFF",
                      fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: "11px",
                      textTransform: "uppercase", letterSpacing: "0.06em",
                      pointerEvents: "none", whiteSpace: "nowrap",
                      display: "flex", alignItems: "center", gap: "6px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                    }}>
                      <VscSearch /> Desktop View
                    </div>
                  </motion.div>
                )}

                {/* Right: Phone mockup — width derived from row height × 9/16 */}
                {mobileWebItem && (
                  <motion.div
                    onClick={() => openLightbox(filteredGallery.indexOf(mobileWebItem))}
                    whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      position: "relative",
                      flex: "0 0 auto",
                      width: "calc(clamp(260px, 34vw, 500px) * 9 / 16)",
                      height: "100%",
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "#FFFFFF",
                      border: "2.5px solid var(--ink)",
                      boxShadow: "0 10px 24px rgba(0,0,0,0.14), 2px 3px 0 var(--ink)",
                      cursor: "pointer"
                    }}
                  >
                    <img
                      src={mobileWebItem.src}
                      alt={mobileWebItem.caption || "Mobile View"}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                    />
                    <div style={{
                      position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)",
                      padding: "5px 14px", borderRadius: "100px",
                      background: "rgba(15,15,15,0.75)", backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.2)", color: "#FFF",
                      fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: "11px",
                      textTransform: "uppercase", letterSpacing: "0.06em",
                      pointerEvents: "none", whiteSpace: "nowrap",
                      display: "flex", alignItems: "center", gap: "6px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                    }}>
                      <VscSearch /> Mobile View
                    </div>
                  </motion.div>
                )}

                {/* Fallback: if no pc/mobile split, render all website items */}
                {!pcWebItem && !mobileWebItem && websiteItems.map((item, idx) => {
                  const isExplicitMobile = Boolean(item.isMobile || item.aspectRatio === "9/16" || (item.src || "").toLowerCase().includes("mobile") || (item.caption && item.caption.toLowerCase().includes("mobile")));
                  return (
                    <motion.div
                      key={idx + item.src}
                      onClick={() => openLightbox(filteredGallery.indexOf(item))}
                      whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{
                        position: "relative",
                        flex: isExplicitMobile ? "0 0 auto" : "1 1 0",
                        width: isExplicitMobile ? "calc(clamp(260px, 34vw, 500px) * 9 / 16)" : undefined,
                        height: "100%",
                        borderRadius: "16px", overflow: "hidden", background: "#FFFFFF",
                        border: "2.5px solid var(--ink)", boxShadow: "0 10px 24px rgba(0,0,0,0.14), 2px 3px 0 var(--ink)", cursor: "pointer"
                      }}
                    >
                      <img src={item.src} alt={item.caption || "Web View"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* Mobile: stacked, each card with its natural aspect ratio */
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", width: "100%" }}>
                {websiteItems.map((item, idx) => {
                  const isExplicitMobile = Boolean(item.isMobile || item.aspectRatio === "9/16" || (item.src || "").toLowerCase().includes("mobile") || (item.caption && item.caption.toLowerCase().includes("mobile")));
                  const ratio = isExplicitMobile ? "9/16" : "16/9";
                  return (
                    <motion.div
                      key={idx + item.src}
                      onClick={() => openLightbox(filteredGallery.indexOf(item))}
                      style={{
                        position: "relative",
                        width: "100%",
                        maxWidth: isExplicitMobile ? "260px" : "340px",
                        aspectRatio: ratio,
                        borderRadius: "14px",
                        overflow: "hidden",
                        background: "#FFFFFF",
                        border: "1.5px solid rgba(15,23,42,0.2)",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                        cursor: "pointer"
                      }}
                    >
                      <img
                        src={item.src}
                        alt={item.caption || (isExplicitMobile ? "Mobile View" : "Desktop View")}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                      />
                      <div style={{
                        position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)",
                        padding: "4px 12px", borderRadius: "100px",
                        background: "rgba(15,15,15,0.75)", backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255,255,255,0.2)", color: "#FFF",
                        fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: "10px",
                        textTransform: "uppercase", letterSpacing: "0.06em",
                        pointerEvents: "none", whiteSpace: "nowrap",
                        display: "flex", alignItems: "center", gap: "5px"
                      }}>
                        <VscSearch /> {isExplicitMobile ? "Mobile View" : "Desktop View"}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SECTION 1b: YOUTUBE VIDEOS */}
        {allYouTube.length > 0 && isReelsTab && (
          <div>
            <div className="gallery-section-header-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF0000" }} />
                <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(20px, 4vw, 32px)", textTransform: "uppercase", margin: 0, color: "var(--ink)", lineHeight: 1.1 }}>
                  {isMobile ? "REELS" : "Video Episodes & Documentaries"}
                </h3>
              </div>
            </div>
            <div className="youtube-grid-wrap" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px"
            }}>
              {allYouTube.map((item, idx) => (
                <div key={idx + item.src} className="youtube-card-wrap">
                  <YouTubePlayCard item={item} idx={idx} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: REELS (9:16 RATIO) */}
        {allReels.length > 0 && isReelsTab && (
          <div>
            <div className="gallery-section-header-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", width: "100%", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E1306C" }} />
                <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(20px, 4vw, 32px)", textTransform: "uppercase", margin: 0, color: "var(--ink)", lineHeight: 1.1 }}>
                  {isMobile ? "REELS" : "High-Converting Reels & Short Videos"}
                </h3>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                {/* Scroll buttons down at title level */}
                <div className="carousel-nav-btns" style={{ display: "flex", gap: "6px" }}>
                  <button 
                    onClick={() => scrollContainer(reelsRef, "left")} 
                    style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: "rgba(15, 23, 42, 0.05)", border: "none",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--ink)", transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(15, 23, 42, 0.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(15, 23, 42, 0.05)"}
                    aria-label="Scroll left"
                  >
                    <VscChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => scrollContainer(reelsRef, "right")} 
                    style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: "rgba(15, 23, 42, 0.05)", border: "none",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--ink)", transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(15, 23, 42, 0.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(15, 23, 42, 0.05)"}
                    aria-label="Scroll right"
                  >
                    <VscChevronRight size={20} />
                  </button>
                </div>

                {activeTab === "All" && allReels.length > 4 && !isMobile && (
                  <button
                    onClick={() => setActiveTab("Reels")}
                    className="btn-sm"
                    style={{ padding: "6px 16px", fontSize: "12px" }}
                  >
                    View All ({allReels.length}) Reels →
                  </button>
                )}
              </div>
            </div>

            {/* Horizontal Reels Grid (3 per row) */}
            {horizontalReels.length > 0 && (
              <div style={{ marginBottom: verticalReels.length > 0 ? "32px" : "0" }}>
                <div 
                  className="horizontal-reels-grid" 
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px"
                  }}
                >
                  {horizontalReels.map((item, idx) => (
                    <motion.div
                      key={"h-" + idx + item.src}
                      onClick={() => openLightbox(filteredGallery.indexOf(item))}
                      whileHover={{ y: -12, scale: 1.04, boxShadow: "0 20px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="reel-card"
                      style={{
                        position: "relative",
                        width: "100%",
                        minWidth: 0,
                        aspectRatio: item.aspectRatio || "16/9",
                        borderRadius: "16px",
                        overflow: "hidden",
                        background: "#000000",
                        border: "2.5px solid var(--ink)",
                        boxShadow: "0 10px 24px rgba(0,0,0,0.14), 2px 3px 0 var(--ink)",
                        cursor: "pointer"
                      }}
                    >
                      <video 
                        src={`${item.src}#t=0.1`} 
                        preload="metadata" 
                        playsInline 
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
                      />
                      <div style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "5px 14px",
                        borderRadius: "100px",
                        background: "rgba(15, 15, 15, 0.75)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
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
                        <VscPlay size={10} style={{ color: "var(--yellow)" }} /> Click to play
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Vertical Reels Horizontal Scroll Slider */}
            {verticalReels.length > 0 && (
              <div>
                <div 
                  ref={reelsRef} 
                  onScroll={handleReelScroll}
                  className="horizontal-reels-slider" 
                  style={{
                    display: "flex",
                    overflowX: "auto",
                    scrollSnapType: "x mandatory",
                    gap: "16px",
                    paddingBottom: "12px",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none"
                  }}
                >
                  {verticalReels.map((item, idx) => (
                    <motion.div
                      key={"v-" + idx + item.src}
                      onClick={() => openLightbox(filteredGallery.indexOf(item))}
                      whileHover={!isMobile ? { y: -8, scale: 1.03, boxShadow: "0 20px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)" } : {}}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="reel-card"
                      style={{
                        flex: isMobile ? "0 0 72vw" : "0 0 220px",
                        width: isMobile ? "72vw" : "220px",
                        maxWidth: isMobile ? "230px" : "none",
                        minWidth: isMobile ? "0" : "220px",
                        scrollSnapAlign: "center",
                        position: "relative",
                        aspectRatio: "9/16",
                        borderRadius: "14px",
                        overflow: "hidden",
                        background: "#000000",
                        border: isMobile ? "1px solid rgba(15,23,42,0.18)" : "2px solid var(--ink)",
                        boxShadow: isMobile ? "0 4px 12px rgba(0,0,0,0.08)" : "0 8px 20px rgba(0,0,0,0.1), 2px 3px 0 var(--ink)",
                        cursor: "pointer"
                      }}
                    >
                      <video 
                        src={`${item.src}#t=0.1`} 
                        preload="metadata" 
                        playsInline 
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
                      />
                      <div style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "5px 14px",
                        borderRadius: "100px",
                        background: "rgba(15, 15, 15, 0.75)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
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
                        <VscPlay size={10} style={{ color: "var(--yellow)" }} /> Click to play
                      </div>
                    </motion.div>
                  ))}

                  {/* ── "AND MORE" TEASER TILE (Reels) ── */}
                  <Link href="/contact" style={{ textDecoration: "none", flex: "0 0 180px", minWidth: "180px", scrollSnapAlign: "start" }}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{
                        position: "relative",
                        height: "100%",
                        aspectRatio: "9/16",
                        borderRadius: "16px",
                        overflow: "hidden",
                        background: "linear-gradient(145deg, #F9F6ED 0%, #EFEAD9 100%)",
                        border: "2.5px solid var(--ink)",
                        boxShadow: "5px 7px 0 var(--ink)",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "20px",
                        padding: "20px 16px",
                        textAlign: "center"
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "36px", height: "36px" }}>
                          <rect x="2" y="2" width="20" height="20" rx="4" />
                          <path d="M7 2v20 M17 2v20 M2 12h20 M2 7h5 M2 17h5 M17 17h5 M17 7h5" />
                        </svg>
                        <div style={{
                          fontFamily: "var(--font-headings)",
                          fontWeight: 900,
                          fontSize: "24px",
                          color: "var(--ink)",
                          lineHeight: 1,
                          textTransform: "uppercase"
                        }}>
                          +more
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </div>

                {/* Dots Navigation */}
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "16px"
                }}>
                  {verticalReels.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (reelsRef.current) {
                          const itemWidth = (reelsRef.current.firstElementChild?.offsetWidth || 260) + 16;
                          reelsRef.current.scrollTo({ left: i * itemWidth, behavior: "smooth" });
                          setActiveReelIndex(i);
                        }
                      }}
                      style={{
                        width: activeReelIndex === i ? "24px" : "8px",
                        height: "8px",
                        borderRadius: "100px",
                        background: activeReelIndex === i ? "var(--yellow)" : "rgba(15, 23, 42, 0.2)",
                        border: activeReelIndex === i ? "1.5px solid var(--ink)" : "none",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        padding: 0
                      }}
                      aria-label={`Go to reel ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Subtle Scroll Text Right Below Dots */}
                <div style={{
                  textAlign: "center",
                  fontSize: "11px",
                  fontFamily: "var(--font-headings)",
                  fontWeight: 800,
                  color: "var(--ink-45)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginTop: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px"
                }}>
                  Swipe horizontally to explore reels →
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION: INSTAGRAM GRID FEED SHOWCASE */}
        {instaGridItems.length > 0 && isGraphicsTab && (
          <div style={{ marginBottom: "50px" }}>
            <div className="gallery-section-header-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#dc2743" }} />
                <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(20px, 4vw, 32px)", textTransform: "uppercase", margin: 0, color: "var(--ink)", lineHeight: 1.1 }}>
                  {isMobile ? "INSTA GRID" : "Curated Instagram Grid Feed"}
                </h3>
              </div>
            </div>

            {/* Instagram Grid Feed Showcase (Same size and grid as vertical reels) */}
            <div className="insta-grid-wrap" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
              justifyContent: "flex-start"
            }}>
              {instaGridItems.map((item, idx) => (
                <motion.div
                  key={"ig-" + idx + item.src}
                  onClick={() => openLightbox(filteredGallery.indexOf(item))}
                  whileHover={{ y: -12, scale: 1.04, boxShadow: "0 20px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="insta-grid-tile"
                  style={{
                    position: "relative",
                    width: "100%",
                    minWidth: 0,
                    borderRadius: "16px",
                    border: "2.5px solid var(--ink)",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.14), 2px 3px 0 var(--ink)",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "#000000",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  {/* Full Resolution Instagram Feed Screenshot */}
                  <img 
                    src={item.src} 
                    alt={item.caption || "Instagram Grid Screenshot"} 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />

                  {/* Glassmorphic Bottom Pill Overlay */}
                  <div style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "5px 12px",
                    borderRadius: "100px",
                    background: "rgba(15, 15, 15, 0.75)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
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
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><VscSearch /> Click to view</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: SOCIAL POSTS & GRAPHICS */}
        {allGraphics.length > 0 && isGraphicsTab && (
          <div>
            <div className="gallery-section-header-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", width: "100%", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--yellow)", border: "1px solid var(--ink)" }} />
                <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(20px, 4vw, 32px)", textTransform: "uppercase", margin: 0, color: "var(--ink)", lineHeight: 1.1 }}>
                  {isMobile ? "POSTS" : "Social Posts & Campaign Creatives"}
                </h3>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                {/* Scroll buttons down at title level */}
                <div className="carousel-nav-btns" style={{ display: "flex", gap: "6px" }}>
                  <button 
                    onClick={() => scrollContainer(graphicsRef, "left")} 
                    style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: "rgba(15, 23, 42, 0.05)", border: "none",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--ink)", transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(15, 23, 42, 0.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(15, 23, 42, 0.05)"}
                    aria-label="Scroll left"
                  >
                    <VscChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => scrollContainer(graphicsRef, "right")} 
                    style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: "rgba(15, 23, 42, 0.05)", border: "none",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--ink)", transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(15, 23, 42, 0.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(15, 23, 42, 0.05)"}
                    aria-label="Scroll right"
                  >
                    <VscChevronRight size={20} />
                  </button>
                </div>

                {activeTab === "All" && allGraphics.length > 4 && !isMobile && (
                  <button
                    onClick={() => setActiveTab("Graphics")}
                    className="btn-sm"
                    style={{ padding: "6px 16px", fontSize: "12px" }}
                  >
                    View All ({allGraphics.length}) Posts →
                  </button>
                )}
              </div>
            </div>

            <div ref={graphicsRef} className="graphics-grid-wrap" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "24px",
              alignItems: "start"
            }}>
              {allGraphics.map((item, idx) => (
                <motion.div
                  key={idx + item.src}
                  onClick={() => openLightbox(filteredGallery.indexOf(item))}
                  whileHover={{ y: -12, scale: 1.04, boxShadow: "0 20px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="graphic-card"
                  style={{
                    position: "relative",
                    width: "100%",
                    minWidth: 0,
                    borderRadius: "16px",
                    border: "2.5px solid var(--ink)",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.14), 2px 3px 0 var(--ink)",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "#000000",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <img 
                    src={item.src} 
                    alt={item.caption || "Brand Graphic"} 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />
                  <div style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "5px 12px",
                    borderRadius: "100px",
                    background: "rgba(15, 15, 15, 0.75)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
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
                    <VscSearch /> Click to view
                  </div>
                </motion.div>
              ))}

              {/* ── "AND MORE" TEASER TILE (Graphics) ── */}
              <Link href="/contact" className="graphic-card" style={{ textDecoration: "none", width: "100%", maxWidth: "310px", margin: "0 auto", display: "block" }}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    position: "relative",
                    aspectRatio: "4/5",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "linear-gradient(145deg, #F9F6ED 0%, #EFEAD9 100%)",
                    border: "2px solid var(--ink)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1), 2px 3px 0 var(--ink)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    padding: "24px 16px",
                    textAlign: "center"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "36px", height: "36px" }}>
                      <path d="M12 19l7-7 3 3-7 7-3-3z" />
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                      <path d="M2 2l7.586 7.586" />
                      <circle cx="11" cy="11" r="2" />
                    </svg>
                    <div style={{
                      fontFamily: "var(--font-headings)",
                      fontWeight: 900,
                      fontSize: "24px",
                      color: "var(--ink)",
                      lineHeight: 1,
                      textTransform: "uppercase"
                    }}>
                      +more
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* ── FULLSCREEN LIGHTBOX MODAL (Z-INDEX 999999 - COVERS GLOBAL DOCK) ── */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              background: "rgba(10, 10, 10, 0.96)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            {/* Animated Close Button */}
            <motion.button
              onClick={closeLightbox}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "var(--paper)",
                color: "var(--ink)",
                border: "2.5px solid var(--ink)",
                boxShadow: "3px 3px 0 var(--ink)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100000,
              }}
            >
              <motion.div
                variants={{
                  rest: { rotate: 0, scale: 1 },
                  hover: { rotate: 180, scale: 1.15 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <VscClose size={28} />
              </motion.div>
            </motion.button>

            {/* Main Full Content Display (Actual Uncropped Aspect Ratio) */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              style={{
                maxWidth: "92vw",
                maxHeight: "82vh",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "24px",
                overflow: "hidden",
                border: "none",
                boxShadow: "0 24px 60px rgba(0,0,0,0.8)",
                background: "transparent",
                marginTop: "6vh"
              }}
            >
              {activeMedia.type === "video" ? (
                <video
                  src={activeMedia.src}
                  controls
                  autoPlay
                  playsInline
                  style={{
                    maxWidth: "100%",
                    maxHeight: "82vh",
                    width: "auto",
                    objectFit: "contain",
                    borderRadius: "20px",
                    display: "block",
                    background: "transparent"
                  }}
                />
              ) : (
                <img
                  src={activeMedia.src}
                  alt={activeMedia.caption || "Full view"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "82vh",
                    objectFit: "contain",
                    borderRadius: "20px",
                    display: "block",
                    background: "transparent"
                  }}
                />
              )}

            </motion.div>

            {/* Bottom Caption & Navigation Controls aligned on exact same row */}
            <div style={{ 
              marginTop: "20px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: "20px", 
              zIndex: 100000,
              maxWidth: "92vw" 
            }}>
              {/* Left Nav Arrow Button */}
              <motion.button
                onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "var(--yellow)",
                  color: "var(--ink)",
                  border: "2.5px solid var(--ink)",
                  boxShadow: "2.5px 3.5px 0 var(--ink)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
                aria-label="Previous Reel"
              >
                <VscChevronLeft size={26} />
              </motion.button>

              {/* Center Caption & Counter */}
              <div style={{ textAlign: "center", color: "#FFFFFF" }}>
                <div style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "16px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--yellow)" }}>
                  {activeMedia.caption || activeMedia.category}
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: "4px", fontFamily: "var(--font-headings)", fontWeight: 700 }}>
                  {lightboxIndex + 1} / {filteredGallery.length}
                </div>
              </div>

              {/* Right Nav Arrow Button */}
              <motion.button
                onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "var(--yellow)",
                  color: "var(--ink)",
                  border: "2.5px solid var(--ink)",
                  boxShadow: "2.5px 3.5px 0 var(--ink)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
                aria-label="Next Reel"
              >
                <VscChevronRight size={26} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
