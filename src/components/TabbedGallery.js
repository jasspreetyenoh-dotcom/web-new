import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { VscClose, VscChevronLeft, VscChevronRight, VscSearch } from "react-icons/vsc";

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
            <span style={{ color: "var(--yellow)", fontSize: "9px" }}>▶</span> Click to play
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

  const reelsRef = useRef(null);
  const graphicsRef = useRef(null);

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
        <div style={{ fontSize: "40px", marginBottom: "16px" }}>🔒</div>
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
            <div className="gallery-section-header" style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              <div style={{ alignSelf: "flex-start", padding: "6px 14px", background: "var(--paper)", border: "2px solid var(--ink)", boxShadow: "3px 3.5px 0 var(--ink)", borderRadius: "100px", fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "12px", textTransform: "uppercase", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--yellow)" }} />
                Web Platform
              </div>
              <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(24px, 4vw, 32px)", textTransform: "uppercase", margin: 0, color: "var(--ink)", lineHeight: 1.1, maxWidth: "600px" }}>
                Desktop &amp; Mobile Web Showcase
              </h3>
            </div>

            <div className="website-grid-wrap" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
              alignItems: "start"
            }}>
              {websiteItems.map((item, idx) => {
                const srcLower = (item.src || "").toLowerCase();
                const isExplicitMobile = Boolean(
                  item.isMobile || 
                  item.aspectRatio === "9/16" || 
                  srcLower.includes("mobile") || 
                  (item.caption && item.caption.toLowerCase().includes("mobile"))
                );
                const ratio = isExplicitMobile ? "9/16" : (item.aspectRatio || "16/9");
                const originalIndex = filteredGallery.indexOf(item);
                return (
                  <motion.div
                    key={idx + item.src}
                    onClick={() => openLightbox(originalIndex)}
                    whileHover={{ y: -12, scale: 1.04, boxShadow: "0 20px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={isExplicitMobile ? "mobile-web-tile" : "pc-web-tile"}
                    style={{
                      position: "relative",
                      width: "100%",
                      minWidth: 0,
                      aspectRatio: ratio,
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "#FFFFFF",
                      border: "2.5px solid var(--ink)",
                      boxShadow: "0 10px 24px rgba(0,0,0,0.14), 2px 3px 0 var(--ink)",
                      cursor: "pointer"
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.caption || (isExplicitMobile ? "Mobile View" : "Desktop View")}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top",
                        display: "block"
                      }}
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
                      <VscSearch /> {isExplicitMobile ? "Mobile View" : "Desktop View"}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 1b: YOUTUBE VIDEOS (Clean Custom Thumbnail + Simple Play Button) */}
        {allYouTube.length > 0 && isReelsTab && (
          <div>
            <div className="gallery-section-header" style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              <div style={{ alignSelf: "flex-start", padding: "6px 14px", background: "var(--paper)", border: "2px solid var(--ink)", boxShadow: "3px 3.5px 0 var(--ink)", borderRadius: "100px", fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "12px", textTransform: "uppercase", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF0000" }} />
                YouTube
              </div>
              <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(24px, 4vw, 32px)", textTransform: "uppercase", margin: 0, color: "var(--ink)", lineHeight: 1.1, maxWidth: "600px" }}>
                Video Episodes &amp; Documentaries
              </h3>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px"
            }}>
              {allYouTube.map((item, idx) => (
                <YouTubePlayCard key={idx + item.src} item={item} idx={idx} />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: REELS (9:16 RATIO) - First 4 on "All" tab, All 8 on "Reels" tab */}
        {allReels.length > 0 && isReelsTab && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div className="gallery-section-header" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ alignSelf: "flex-start", padding: "6px 14px", background: "var(--paper)", border: "2px solid var(--ink)", boxShadow: "3px 3.5px 0 var(--ink)", borderRadius: "100px", fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "12px", textTransform: "uppercase", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E1306C" }} />
                  Reels
                </div>
                <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(24px, 4vw, 32px)", textTransform: "uppercase", margin: 0, color: "var(--ink)", lineHeight: 1.1, maxWidth: "600px" }}>
                  High-Converting Reels &amp; Short Videos
                </h3>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* Scroll buttons for Horizontal Carousel */}
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
                    <VscChevronLeft size={22} />
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
                    <VscChevronRight size={22} />
                  </button>
                </div>

                {activeTab === "All" && allReels.length > 4 && (
                  <button
                    onClick={() => setActiveTab("Reels")}
                    className="btn-sm"
                    style={{
                      padding: "6px 16px",
                      fontSize: "12px"
                    }}
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
                      {/* Subtle Text at Bottom: Click to play */}
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
                        <span style={{ color: "var(--yellow)", fontSize: "9px" }}>▶</span> Click to play
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Vertical Reels Grid */}
            {verticalReels.length > 0 && (
              <div ref={reelsRef} className="reels-grid-wrap" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gridTemplateRows: "repeat(2, auto)",
                gap: "20px"
              }}>
                {verticalReels.map((item, idx) => (
                  <motion.div
                    key={"v-" + idx + item.src}
                    onClick={() => openLightbox(filteredGallery.indexOf(item))}
                    whileHover={{ y: -12, scale: 1.04, boxShadow: "0 20px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="reel-card"
                    style={{
                      position: "relative",
                      width: "100%",
                      minWidth: 0,
                      aspectRatio: item.aspectRatio || "9/16",
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
                    {/* Subtle Text at Bottom: Click to play */}
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
                      <span style={{ color: "var(--yellow)", fontSize: "9px" }}>▶</span> Click to play
                    </div>
                  </motion.div>
                ))}

              {/* ── "AND MORE" TEASER TILE (Reels) ── */}
              <Link href="/contact" style={{ textDecoration: "none", width: "100%", minWidth: 0, display: "block" }}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    position: "relative",
                    aspectRatio: "9/16",
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "linear-gradient(145deg, #F9F6ED 0%, #EFEAD9 100%)",
                    border: "2.5px solid var(--ink)",
                    boxShadow: "5px 7px 0 var(--ink)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "28px",
                    padding: "32px 20px",
                    textAlign: "center"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "42px", height: "42px" }}>
                      <rect x="2" y="2" width="20" height="20" rx="4" />
                      <path d="M7 2v20 M17 2v20 M2 12h20 M2 7h5 M2 17h5 M17 17h5 M17 7h5" />
                    </svg>
                    <div style={{
                      fontFamily: "var(--font-headings)",
                      fontWeight: 900,
                      fontSize: "30px",
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
            )}
          </div>
        )}

        {/* SECTION: INSTAGRAM GRID FEED SHOWCASE */}
        {instaGridItems.length > 0 && isGraphicsTab && (
          <div style={{ marginBottom: "50px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <div className="gallery-section-header" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ alignSelf: "flex-start", padding: "6px 14px", background: "var(--paper)", border: "2px solid var(--ink)", boxShadow: "3px 3.5px 0 var(--ink)", borderRadius: "100px", fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "12px", textTransform: "uppercase", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#dc2743" }} />
                  Feed Strategy
                </div>
                <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(24px, 4vw, 32px)", textTransform: "uppercase", margin: 0, color: "var(--ink)", lineHeight: 1.1, maxWidth: "600px" }}>
                  Curated Instagram Grid Feed
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
                  style={{
                    position: "relative",
                    width: "100%",
                    minWidth: 0,
                    aspectRatio: "9/16",
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
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
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

        {/* SECTION 3: SOCIAL POSTS & GRAPHICS (4:5 RATIO) - First 4 on "All" tab, All 8 on "Graphics"/"Social" tab */}
        {allGraphics.length > 0 && isGraphicsTab && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div className="gallery-section-header" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ alignSelf: "flex-start", padding: "6px 14px", background: "var(--paper)", border: "2px solid var(--ink)", boxShadow: "3px 3.5px 0 var(--ink)", borderRadius: "100px", fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "12px", textTransform: "uppercase", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--yellow)", border: "1px solid var(--ink)" }} />
                  Brand Assets
                </div>
                <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(24px, 4vw, 32px)", textTransform: "uppercase", margin: 0, color: "var(--ink)", lineHeight: 1.1, maxWidth: "600px" }}>
                  Social Posts &amp; Campaign Creatives
                </h3>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* Scroll buttons for Horizontal Carousel */}
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
                    <VscChevronLeft size={22} />
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
                    <VscChevronRight size={22} />
                  </button>
                </div>

                {activeTab === "All" && allGraphics.length > 4 && (
                  <button
                    onClick={() => setActiveTab("Graphics")}
                    className="btn-sm"
                    style={{
                      padding: "6px 16px",
                      fontSize: "12px"
                    }}
                  >
                    View All ({allGraphics.length}) Graphics →
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
                  style={{
                    position: "relative",
                    aspectRatio: "4/5",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#FFFFFF",
                    border: "2.5px solid var(--ink)",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.14), 2px 3px 0 var(--ink)",
                    cursor: "pointer"
                  }}
                >
                  <img 
                    src={item.src} 
                    alt={item.caption || "Brand Graphic"} 
                    style={{ width: "100%", height: "100%", objectFit: "contain", backgroundColor: "#FFFFFF" }} 
                  />
                </motion.div>
              ))}

              {/* ── "AND MORE" TEASER TILE (Graphics) ── */}
              <Link href="/contact" style={{ textDecoration: "none", width: "100%", minWidth: 0, display: "block" }}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    position: "relative",
                    aspectRatio: "4/5",
                    borderRadius: "20px",
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
                    padding: "28px 20px",
                    textAlign: "center"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "38px", height: "38px" }}>
                      <path d="M12 19l7-7 3 3-7 7-3-3z" />
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                      <path d="M2 2l7.586 7.586" />
                      <circle cx="11" cy="11" r="2" />
                    </svg>
                    <div style={{
                      fontFamily: "var(--font-headings)",
                      fontWeight: 900,
                      fontSize: "28px",
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

              {/* Left Nav Arrow Button */}
              <motion.button
                onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                whileHover={{ scale: 1.15, x: -4 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "var(--yellow)",
                  color: "var(--ink)",
                  border: "2.5px solid var(--ink)",
                  boxShadow: "3px 4px 0 var(--ink)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 100000,
                }}
              >
                <VscChevronLeft size={28} />
              </motion.button>

              {/* Right Nav Arrow Button */}
              <motion.button
                onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                whileHover={{ scale: 1.15, x: 4 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "var(--yellow)",
                  color: "var(--ink)",
                  border: "2.5px solid var(--ink)",
                  boxShadow: "3px 4px 0 var(--ink)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 100000,
                }}
              >
                <VscChevronRight size={28} />
              </motion.button>
            </motion.div>

            {/* Bottom Caption & Counter */}
            <div style={{ marginTop: "20px", textAlign: "center", color: "#FFFFFF", zIndex: 100000 }}>
              <div style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "16px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--yellow)" }}>
                {activeMedia.caption || activeMedia.category}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: "4px", fontFamily: "var(--font-headings)", fontWeight: 700 }}>
                {lightboxIndex + 1} / {filteredGallery.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
