"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ALL_PROJECTS } from "@/data/projects";
import TabbedGallery from "@/components/TabbedGallery";
import PresentationMode from "@/components/PresentationMode";
import BlurText from "@/components/BlurText";
import { VscClose, VscArrowLeft, VscArrowRight } from "react-icons/vsc";
import IntroLoader from "@/components/IntroLoader";

const ACCURATE_COLORS = {
  "punjab-immigration": "#F6C000",       // Vibrant Gold Yellow (Punjab Immigration)
  "dolma-aunti-momos": "#DC2626",        // Rich Crimson Red (Dolma Aunti)
  "chaat-king-india": "#16A34A",         // Rich Emerald Green (Chaat King)
  "samarth-academy": "#B91C1C",          // Deep Rose Crimson Red (Smarth)
  "learnmatics": "#0891B2",              // Rich Dark Cyan (Learnmatic)
  "books-route": "#15803D",              // Rich Plant Green (Books Route)
  "dsidein": "#0284C7",                  // Rich Cobalt Blue (Dside In)
  "bds-blossoms": "#DB2777",             // Vibrant Deep Pink (BDS Blossoms)
  "first-drive": "#991B1B",              // Darker Burgundy Red (First Drive)
  "yug-chintak": "#78350F",              // Darker Warm Coffee Brown (Yug Chintak)
  "elect-punjab": "#047857",             // Deep Forest Green (Elect Punjab)
  "harman-sekhon": "#EA580C",            // Rich Deep Orange (Harman Sekhon)
  "advocate-amarjeet-singh": "#1E3A8A",  // Deep Navy Blue (Adv Amajit Singh)
  "biinaii-studios": "#831843",          // Dark Plum Maroon (Biinaii)
  "political-pr-projects": "#475569"     // Dark Slate Grey (Political pages)
};

function ClientLogo({ project, size = "large" }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [project?.id, project?.logo]);

  if (!project) return null;

  const initial = project.name ? project.name.charAt(0).toUpperCase() : "C";
  const dim = size === "large" ? 64 : 48;

  if (project.logo && !imgError) {
    return (
      <div 
        className="cs-hero-logo-badge"
        style={{
          width: `${dim}px`,
          height: `${dim}px`,
          aspectRatio: "1/1",
          borderRadius: "50%",
          background: "#FFFFFF",
          border: "3px solid var(--ink)",
          boxShadow: "3px 3.5px 0 var(--ink)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0
        }}
      >
        <img 
          src={project.logo} 
          alt={`${project.name} Logo`} 
          onError={() => setImgError(true)} 
          style={{ 
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block"
          }} 
        />
      </div>
    );
  }

  return (
    <div 
      className="cs-hero-logo-badge fallback"
      style={{
        width: `${dim}px`,
        height: `${dim}px`,
        borderRadius: "50%",
        background: "#FFFFFF",
        border: "3px solid var(--ink)",
        boxShadow: "3px 3.5px 0 var(--ink)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-headings)",
        fontWeight: 900,
        fontSize: size === "large" ? "20px" : "16px",
        color: "var(--ink)",
        textTransform: "uppercase",
        flexShrink: 0
      }}
    >
      {initial}
    </div>
  );
}

export default function PortfolioSPA({ params: paramsPromise }) {
  const params = paramsPromise ? use(paramsPromise) : null;
  const [activeProject, setActiveProject] = useState(null);
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  useEffect(() => {
    if (params?.slug && params.slug[0]) {
      const proj = ALL_PROJECTS.find(p => p.slug === params.slug[0]);
      if (proj) setActiveProject(proj);
    }
  }, [params]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const match = path.match(/\/portfolio\/([^/]+)/);
      if (match && match[1]) {
        const proj = ALL_PROJECTS.find(p => p.slug === match[1]);
        if (proj) setActiveProject(proj);
      } else {
        setActiveProject(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (activeProject) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [activeProject]);

  const openProject = (project) => {
    window.history.pushState({}, '', `/portfolio/${project.slug}`);
    setActiveProject(project);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const closeProject = () => {
    window.history.pushState({}, '', '/portfolio');
    setActiveProject(null);
  };

  const goToNextProject = (e) => {
    e.stopPropagation();
    if (!activeProject) return;
    const currentIndex = ALL_PROJECTS.findIndex(p => p.id === activeProject.id);
    const next = ALL_PROJECTS[(currentIndex + 1) % ALL_PROJECTS.length];
    
    // We can do a smooth transition or just instant set
    window.history.pushState({}, '', `/portfolio/${next.slug}`);
    setActiveProject(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <>
      <IntroLoader
        onComplete={() => setIsIntroFinished(true)}
        pageName="SELECTED WORK"
        quote="Work built to leave a lasting impression."
        iconType="work"
        accentColor="#00C2A8"
      />
      <div
        style={{
          opacity: isIntroFinished ? 1 : 0,
          transition: "opacity 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
          pointerEvents: isIntroFinished ? "auto" : "none",
          minHeight: "100vh",
          background: "var(--paper)",
          overflowX: "hidden",
          position: "relative"
        }}
      >
        {/* ── TOP NAV ── */}
        <AnimatePresence>
          {!activeProject && (
            <motion.nav 
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              className="portfolio-nav"
            style={{
              position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
              background: "rgba(250,249,246,0.9)", backdropFilter: "blur(12px)",
              padding: "0 40px", display: "flex", alignItems: "center",
              justifyContent: "space-between", height: "70px",
            }}
          >
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <svg viewBox="0 0 100 100" fill="none" style={{ width: "30px", height: "30px" }}>
                <path d="M20 22 C24 30, 40 55, 46 66 C50 73, 51 80, 50 86" stroke="#1D1D1D" strokeWidth="11" strokeLinecap="round" />
                <path d="M46 66 C58 50, 68 34, 76 20 M70 18 L78 19 L76 30" stroke="#F6C000" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "20px", color: "var(--ink)" }}>yenoh</span>
            </Link>
            <Link href="/" style={{
              fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: "13px",
              color: "var(--ink-70)", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px",
            }}>
              <VscArrowLeft size={16} /> Back Home
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── IMMERSIVE VIEW ── */}
      <AnimatePresence mode="wait">
        {!activeProject ? (
          <motion.div key="shelf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            {/* Shelf Intro */}
            <section className="portfolio-header" style={{ padding: "160px 40px 100px", textAlign: "center", maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 10 }}>
              <h1 className="portfolio-title" style={{ fontFamily: "var(--font-headings)", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1 }}>
                Port<span style={{ position: "relative" }}>folio
                  <svg viewBox="0 0 200 20" style={{ position: "absolute", bottom: "-10px", left: 0, width: "100%", height: "20px", pointerEvents: "none" }}>
                    <path d="M5 15 Q 50 5, 100 10 T 195 15" fill="none" stroke="var(--yellow)" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="portfolio-p" style={{ fontSize: "20px", color: "var(--ink-70)", maxWidth: "600px", margin: "32px auto 0", lineHeight: 1.6 }}>
                A collection of brands we've helped grow through strategy, creativity, marketing, and technology.
              </p>
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ marginTop: "60px", color: "var(--ink-45)" }}
              >
                ↓ Scroll
              </motion.div>
            </section>

            {/* The Shelf */}
            <div style={{ display: "flex", flexDirection: "column", gap: "60px", paddingBottom: "140px" }}>
              {ALL_PROJECTS.map((project, idx) => (
                <div key={project.id} style={{ padding: "0 20px" }}>
                  <motion.div
                    layoutId={`project-container-${project.id}`}
                    onClick={() => openProject(project)}
                    className="shelf-cover"
                    style={{
                      position: "relative",
                      maxWidth: "1340px",
                      margin: "0 auto",
                      borderRadius: "32px",
                      overflow: "hidden",
                      cursor: "pointer",
                      background: "var(--card-bg)",
                      border: "2.5px solid var(--ink)",
                      boxShadow: "6px 8px 0 var(--ink)",
                      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      "--proj-accurate-color": ACCURATE_COLORS[project.id] || project.color || "#F6C000",
                      "--proj-text-color": project.id === "punjab-immigration" ? "#1D1D1D" : "#FFFFFF",
                      "--proj-subtext-color": project.id === "punjab-immigration" ? "rgba(29, 29, 29, 0.82)" : "rgba(255, 255, 255, 0.88)",
                      "--proj-chip-bg": project.id === "punjab-immigration" ? "#FFFFFF" : "rgba(255, 255, 255, 0.16)",
                      "--proj-chip-color": project.id === "punjab-immigration" ? "#1D1D1D" : "#FFFFFF",
                      "--proj-chip-border": project.id === "punjab-immigration" ? "#1D1D1D" : "rgba(255, 255, 255, 0.35)"
                    }}
                  >
                    <style>{`
                      .shelf-cover:hover { transform: translateY(-8px); box-shadow: 12px 16px 0 var(--ink) !important; }
                      .shelf-cover:hover .cover-img { transform: scale(1.05) rotate(0.5deg); }
                      .shelf-cover:hover .shelf-btn-action { background: var(--yellow) !important; color: var(--ink) !important; transform: scale(1.04); }
                      .shelf-cover:hover .shelf-btn-action svg { transform: translateX(6px); }
                      @media (max-width: 768px) {
                        .shelf-cover {
                          background: var(--proj-accurate-color, #F6C000) !important;
                          border-radius: 24px !important;
                          border: 2.5px solid var(--ink) !important;
                          box-shadow: 4px 6px 0 var(--ink) !important;
                        }
                        .shelf-tile-split { grid-template-columns: 1fr !important; min-height: auto !important; }
                        .shelf-tile-img-stage { display: none !important; }
                        .shelf-overlay {
                          background: transparent !important;
                          padding: 32px 24px !important;
                        }
                        .shelf-overlay h2 { color: var(--proj-text-color, #FFFFFF) !important; }
                        .shelf-overlay p { color: var(--proj-subtext-color, rgba(255, 255, 255, 0.88)) !important; }
                        .shelf-category-text {
                          color: var(--proj-subtext-color, rgba(255, 255, 255, 0.88)) !important;
                        }
                        .shelf-deliverable-chip {
                          background: var(--proj-chip-bg, rgba(255, 255, 255, 0.16)) !important;
                          color: var(--proj-chip-color, #FFFFFF) !important;
                          border: 1.5px solid var(--proj-chip-border, rgba(255, 255, 255, 0.35)) !important;
                          box-shadow: 1.5px 2px 0 var(--ink) !important;
                        }
                        /* WHITE View Case Study Button on Mobile */
                        .shelf-btn-action {
                          background: #FFFFFF !important;
                          color: var(--ink) !important;
                          border: 2px solid var(--ink) !important;
                          box-shadow: 3px 3.5px 0 var(--ink) !important;
                          font-weight: 900 !important;
                        }
                        .shelf-btn-action svg {
                          stroke: var(--ink) !important;
                          color: var(--ink) !important;
                        }
                        .shelf-mobile-header {
                          display: flex !important;
                          align-items: center !important;
                          justify-content: flex-end !important;
                          margin-bottom: 16px !important;
                        }
                        .shelf-mobile-industry {
                          color: var(--proj-subtext-color, rgba(255, 255, 255, 0.85)) !important;
                          font-family: var(--font-headings) !important;
                          font-weight: 700 !important;
                          font-size: 12px !important;
                          text-transform: uppercase !important;
                          letter-spacing: 0.12em !important;
                        }
                      }
                      @media (min-width: 769px) {
                        .shelf-mobile-header { display: none !important; }
                      }
                    `}</style>

                    {/* Content Split: Left Info + Right Stage */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "520px", "--proj-color": project.color || "#111111" }} className="shelf-tile-split">
                      
                      {/* Left Info Area */}
                      <div className="shelf-overlay" style={{ padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FFFFFF", zIndex: 10, position: "relative" }}>
                        
                        <div>
                          {/* Mobile-Only Subtle Industry Header */}
                          <div className="shelf-mobile-header">
                            <span className="shelf-mobile-industry">{project.industry}</span>
                          </div>

                          {/* Client Logo replacing Number + Category */}
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                            {project.logo ? (
                              <div className="shelf-client-logo-badge" style={{
                                width: "64px",
                                height: "64px",
                                aspectRatio: "1/1",
                                borderRadius: "50%",
                                background: "#FFFFFF",
                                border: "3px solid var(--ink)",
                                boxShadow: "3px 3.5px 0 var(--ink)",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                flexShrink: 0
                              }}>
                                <img src={project.logo} alt={project.name} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                              </div>
                            ) : (
                              <div className="shelf-client-logo-text" style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "50%",
                                background: "#FFFFFF",
                                border: "3px solid var(--ink)",
                                boxShadow: "3px 3.5px 0 var(--ink)",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "var(--font-headings)",
                                fontWeight: 900,
                                fontSize: "20px",
                                color: "var(--ink)",
                                textTransform: "uppercase",
                                flexShrink: 0
                              }}>
                                {project.name.charAt(0)}
                              </div>
                            )}

                            <span className="shelf-category-text" style={{ fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--ink-45)" }}>
                              {project.category || "Case Study"}
                            </span>
                          </div>

                          <motion.h2 layoutId={`project-title-${project.id}`} style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(32px, 4.5vw, 56px)", textTransform: "uppercase", color: "var(--ink)", lineHeight: 0.95, marginBottom: "20px", maxWidth: "600px" }}>
                            {project.name}
                          </motion.h2>

                          <p style={{ fontSize: "16px", color: "var(--ink-70)", maxWidth: "520px", lineHeight: 1.6, marginBottom: "32px" }}>
                            {project.summary}
                          </p>
                        </div>

                        <div>
                          {/* Deliverables Tags */}
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
                            {project.services.slice(0, 4).map(s => (
                              <div key={s} className="shelf-deliverable-chip" style={{ padding: "6px 16px", borderRadius: "100px", background: "rgba(0,0,0,0.04)", border: "1.5px solid var(--line-color)", color: "var(--ink)", fontSize: "12px", fontFamily: "var(--font-headings)", fontWeight: 700, textTransform: "uppercase" }}>
                                {s}
                              </div>
                            ))}
                          </div>

                          <button className="shelf-btn-action btn-sm" style={{
                            padding: "11px 24px",
                            fontSize: "13.5px",
                            textTransform: "uppercase",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px"
                          }}>
                            View Case Study <VscArrowRight size={18} style={{ transition: "transform 0.3s ease" }} />
                          </button>
                        </div>
                      </div>

                      {/* Right Stage: What We Did Highlights Card (No Video Reels on Outer Tile) */}
                      <motion.div
                        layoutId={`project-image-container-${project.id}`}
                        className="shelf-tile-img-stage"
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          background: project.color || "#111111",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          padding: "36px 32px",
                          overflow: "hidden",
                          borderLeft: "2.5px solid var(--ink)"
                        }}
                      >
                        {/* Top Badge: What We Did */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "16px", zIndex: 10 }}>
                          <div style={{
                            background: "var(--yellow)",
                            color: "var(--ink)",
                            border: "1.5px solid var(--ink)",
                            boxShadow: "2px 2px 0 var(--ink)",
                            borderRadius: "100px",
                            padding: "6px 14px",
                            fontFamily: "var(--font-headings)",
                            fontWeight: 900,
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em"
                          }}>
                            What We Did
                          </div>

                          <div style={{
                            background: "rgba(255, 255, 255, 0.15)",
                            backdropFilter: "blur(4px)",
                            color: "#FFFFFF",
                            borderRadius: "8px",
                            padding: "5px 12px",
                            fontFamily: "var(--font-headings)",
                            fontWeight: 700,
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em"
                          }}>
                            {project.industry}
                          </div>
                        </div>

                        {/* Main Text Content: Deliverables & Key Impact Highlights in slight text */}
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "14px", zIndex: 10 }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {(project.deliverables || project.services || []).slice(0, 4).map((item, dIdx) => (
                              <div 
                                key={dIdx} 
                                style={{ 
                                  display: "flex", 
                                  alignItems: "flex-start", 
                                  gap: "10px", 
                                  fontSize: "14px", 
                                  color: "rgba(255, 255, 255, 0.95)",
                                  fontFamily: "var(--font-body)",
                                  fontWeight: 400,
                                  lineHeight: 1.4
                                }}
                              >
                                <span style={{ color: "var(--yellow)", fontWeight: 900, fontSize: "13px", marginTop: "1px" }}>✓</span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>

                          {/* Key Results / Metrics Badges in slight text */}
                          {project.results && project.results.length > 0 && (
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
                              {project.results.slice(0, 2).map((res, rIdx) => (
                                <div key={rIdx} style={{
                                  padding: "6px 12px",
                                  borderRadius: "8px",
                                  background: "rgba(0, 0, 0, 0.35)",
                                  border: "1px solid rgba(255, 255, 255, 0.2)",
                                  color: "#FFFFFF",
                                  fontSize: "12px",
                                  fontFamily: "var(--font-headings)",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px"
                                }}>
                                  <strong style={{ color: "var(--yellow)", fontWeight: 900 }}>{res.metric}</strong>
                                  <span style={{ opacity: 0.85, fontSize: "11px" }}>{res.label}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Bottom Subtle Hint */}
                        <div style={{
                          fontSize: "11px",
                          color: "rgba(255, 255, 255, 0.65)",
                          fontFamily: "var(--font-headings)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginTop: "16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          zIndex: 10
                        }}>
                          <span>Click tile to view case study & reels</span> →
                        </div>
                      </motion.div>

                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="case-study" style={{ position: "relative", zIndex: 200, background: "var(--paper)", minHeight: "100vh" }}>
            
            {/* Animated Close Button Inside Case Study */}
            <div style={{ position: "fixed", top: "24px", right: "24px", zIndex: 300 }}>
              <motion.button 
                onClick={closeProject}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                style={{
                  width: "52px", height: "52px", borderRadius: "50%",
                  background: "var(--paper)", backdropFilter: "blur(10px)",
                  border: "2.5px solid var(--ink)", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "3px 4px 0 var(--ink)",
                  color: "var(--ink)"
                }}
                className="btn-close-case"
              >
                <motion.div
                  variants={{
                    rest: { rotate: 0, scale: 1 },
                    hover: { rotate: 180, scale: 1.12 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <VscClose size={26} />
                </motion.div>
              </motion.button>
            </div>
            
            {/* EXPANDED HERO (Solid Brand Color - No Shadows or Vignettes) */}
            <motion.div 
              layoutId={`project-container-${activeProject.id}`}
              className="cs-hero-container"
              style={{ width: "100%", height: "55vh", minHeight: "360px", position: "relative", background: activeProject.color || "var(--ink)", overflow: "hidden" }}
            >
              <motion.div layoutId={`project-image-container-${activeProject.id}`} style={{ position: "absolute", inset: 0, background: activeProject.color || "var(--ink)" }} />
              
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "40px", zIndex: 10 }}>
                {/* Client Logo Badge in Hero */}
                <motion.div 
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginBottom: "20px" }}
                >
                  <ClientLogo project={activeProject} size="large" />
                </motion.div>

                {/* Case Study Title (Crisp Solid Text, No Shadows) */}
                <motion.h1 layoutId={`project-title-${activeProject.id}`} className="cs-hero-title" style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(36px, 6.5vw, 100px)", textTransform: "uppercase", color: "var(--paper)", lineHeight: 0.95, margin: 0, width: "100%", overflow: "hidden", padding: "0 20px" }}>
                  <BlurText key={activeProject.id} text={activeProject.name} delay={200} animateBy="letters" direction="bottom" />
                </motion.h1>

                {/* Clean Hero Summary Subtitle */}
                {activeProject.summary && (
                  <p className="cs-hero-summary" style={{
                    fontSize: "clamp(14px, 2.2vw, 18px)",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "var(--font-body)",
                    maxWidth: "680px",
                    margin: "18px auto 0",
                    lineHeight: 1.5,
                    padding: "0 20px"
                  }}>
                    {activeProject.summary}
                  </p>
                )}
              </div>
            </motion.div>

            {/* CONTENT */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
              
              {/* Key Deliverables Section */}
              {activeProject.deliverables && activeProject.deliverables.length > 0 && (
                <section className="cs-deliverables-section" style={{ padding: "60px 24px 20px", maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
                  <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: "100px", background: "var(--yellow)", color: "var(--ink)", border: "2px solid var(--ink)", boxShadow: "2.5px 3px 0 var(--ink)", fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px" }}>
                    Key Deliverables
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }} className="cs-pills-wrap">
                    {activeProject.deliverables.map(d => (
                      <motion.div 
                        key={d} 
                        whileHover={{ y: -3, boxShadow: "4px 5px 0 var(--ink)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{ 
                          padding: "11px 22px", 
                          borderRadius: "100px", 
                          background: "#FFFFFF", 
                          border: "2px solid var(--ink)", 
                          boxShadow: "3px 3.5px 0 var(--ink)", 
                          fontFamily: "var(--font-headings)", 
                          fontWeight: 800, 
                          fontSize: "14px", 
                          color: "var(--ink)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px"
                        }}
                      >
                        <span style={{ color: "var(--yellow)", background: "var(--ink)", borderRadius: "50%", width: "18px", height: "18px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 900 }}>✓</span>
                        <span>{d}</span>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* What We Did (Services Tags) Section */}
              {activeProject.services && activeProject.services.length > 0 && (
                <section className="cs-services-section" style={{ padding: "28px 24px 80px", maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
                  <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(20px, 3.5vw, 28px)", textTransform: "uppercase", marginBottom: "24px", color: "var(--ink)", letterSpacing: "0.02em" }}>
                    What We Did
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }} className="cs-pills-wrap">
                    {activeProject.services.map(s => (
                      <motion.div 
                        key={s} 
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{ 
                          padding: "9px 18px", 
                          borderRadius: "100px", 
                          background: "rgba(246, 192, 0, 0.12)", 
                          border: "2px solid var(--ink)", 
                          boxShadow: "2.5px 3px 0 var(--ink)", 
                          fontFamily: "var(--font-headings)", 
                          fontWeight: 800, 
                          fontSize: "13px", 
                          textTransform: "uppercase", 
                          letterSpacing: "0.05em", 
                          color: "var(--ink)" 
                        }}
                      >
                        {s}
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* Categorized Gallery */}
              <section className="cs-section" style={{ padding: "0 40px 120px", maxWidth: "1400px", margin: "0 auto" }}>
                <TabbedGallery gallery={activeProject.gallery} />
              </section>

              {/* Results Wall */}
              {((activeProject.results && activeProject.results.length > 0) || activeProject.viralSpotlight || activeProject.adminPortalSpotlight) && (
                <section className="cs-impact-section" style={{ background: "radial-gradient(circle at 50% 20%, #20202A 0%, #121215 100%)", color: "var(--paper)", padding: "100px 40px", textAlign: "center", position: "relative" }}>
                  <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    {activeProject.results && activeProject.results.length > 0 && (
                      <>
                        <div style={{ padding: "8px 22px", background: "var(--yellow)", color: "var(--ink)", display: "inline-block", borderRadius: "100px", fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "13px", textTransform: "uppercase", marginBottom: "20px", boxShadow: "3px 3px 0 var(--ink)", border: "2px solid var(--ink)" }}>
                          Campaign Results
                        </div>
                        <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(32px, 5vw, 64px)", textTransform: "uppercase", marginBottom: "64px", color: "var(--paper)", letterSpacing: "-0.01em" }}>
                          The Impact
                        </h3>

                        <div className="cs-impact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "28px", marginBottom: "80px" }}>
                          {activeProject.results.map((res, i) => {
                            const strLen = (res.metric || "").length;
                            const fontSize = strLen > 10 ? "clamp(20px, 2.8vw, 32px)" : strLen > 5 ? "clamp(28px, 3.8vw, 46px)" : "clamp(44px, 6vw, 76px)";
                            return (
                              <div key={i} className="cs-impact-card" style={{ padding: "36px 20px", background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)", backdropFilter: "blur(12px)", borderRadius: "28px", border: "2px solid rgba(255,255,255,0.12)", transition: "transform 0.3s ease, border-color 0.3s ease", overflow: "hidden" }}>
                                <div style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize, color: "var(--yellow)", lineHeight: 1.15, wordBreak: "break-word", textTransform: "uppercase" }}>
                                  {res.metric}
                                </div>
                                <div style={{ width: "32px", height: "3px", background: "var(--yellow)", margin: "14px auto", borderRadius: "100px" }} />
                                <div style={{ fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", letterSpacing: "0.08em" }}>
                                  {res.label}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}

                  {/* SPECIAL VIRAL REEL SPOTLIGHT CARD (DAREEL1) */}
                  {activeProject.viralSpotlight && (
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="cs-viral-spotlight-container"
                      style={{
                        background: "var(--paper)",
                        backgroundImage: "radial-gradient(var(--ink-10) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                        border: "3.5px solid var(--ink)",
                        borderRadius: "32px",
                        padding: "52px 40px",
                        position: "relative",
                        overflow: "hidden",
                        textAlign: "left",
                        boxShadow: "12px 16px 0 var(--ink)",
                        marginTop: "50px"
                      }}
                    >
                      {/* Decorative Background Crayon Wave */}
                      <div style={{ position: "absolute", top: "-10px", right: "-10px", opacity: 0.15, pointerEvents: "none" }}>
                        <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
                          <circle cx="100" cy="100" r="80" stroke="var(--yellow)" strokeWidth="12" strokeDasharray="16 20" />
                        </svg>
                      </div>

                      <div className="cs-viral-grid" style={{ display: "grid", gridTemplateColumns: "minmax(280px, 340px) 1fr", gap: "50px", alignItems: "center", position: "relative", zIndex: 2 }}>
                        
                        {/* Video Reel Phone Player Stage */}
                        <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
                          {/* Yellow Offset Backdrop Frame */}
                          <div style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            maxWidth: "320px",
                            aspectRatio: "9/16",
                            background: "var(--yellow)",
                            borderRadius: "28px",
                            border: "3px solid var(--ink)",
                            transform: "rotate(-3deg) scale(0.98)",
                            boxShadow: "6px 8px 0 var(--ink)",
                            pointerEvents: "none"
                          }} />

                          {/* Smartphone Frame Container */}
                          <motion.div 
                            className="cs-viral-player" 
                            whileHover={{ y: -6, rotate: 1, boxShadow: "12px 14px 0 var(--ink)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            onClick={() => {
                              const gallerySection = document.querySelector(".cs-section");
                              if (gallerySection) gallerySection.scrollIntoView({ behavior: "smooth" });
                            }}
                            style={{
                              position: "relative",
                              width: "100%",
                              maxWidth: "320px",
                              aspectRatio: "9/16",
                              borderRadius: "26px",
                              overflow: "hidden",
                              border: "3.5px solid var(--ink)",
                              boxShadow: "8px 10px 0 var(--ink)",
                              background: "#000000",
                              cursor: "pointer",
                              zIndex: 2
                            }}
                          >
                            {/* Smartphone Speaker Notch */}
                            <div style={{
                              position: "absolute",
                              top: "10px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              width: "70px",
                              height: "14px",
                              background: "var(--ink)",
                              borderRadius: "100px",
                              zIndex: 10,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}>
                              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#111" }} />
                            </div>

                            <video 
                              src={`${activeProject.viralSpotlight.video}#t=0.1`} 
                              preload="metadata" 
                              playsInline 
                              autoPlay
                              loop
                              muted
                              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
                            />

                            {/* Instagram Action Overlay UI (Heart, Shares, Audio Disc) */}
                            <div style={{
                              position: "absolute",
                              right: "12px",
                              bottom: "60px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "14px",
                              zIndex: 5,
                              color: "#FFFFFF",
                              textShadow: "0 2px 8px rgba(0,0,0,0.6)"
                            }}>
                              <div style={{ textAlign: "center" }}>
                                <span style={{ fontSize: "20px" }}>❤️</span>
                                <div style={{ fontSize: "10px", fontWeight: 900, fontFamily: "var(--font-headings)" }}>2.6K</div>
                              </div>
                              <div style={{ textAlign: "center" }}>
                                <span style={{ fontSize: "20px" }}>💬</span>
                                <div style={{ fontSize: "10px", fontWeight: 900, fontFamily: "var(--font-headings)" }}>184</div>
                              </div>
                              <div style={{ textAlign: "center" }}>
                                <span style={{ fontSize: "20px" }}>🚀</span>
                                <div style={{ fontSize: "10px", fontWeight: 900, fontFamily: "var(--font-headings)" }}>4.5K</div>
                              </div>
                            </div>

                            {/* Click to Expand Pill */}
                            <div style={{
                              position: "absolute",
                              bottom: "14px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              padding: "6px 16px",
                              borderRadius: "100px",
                              background: "rgba(15, 15, 15, 0.88)",
                              backdropFilter: "blur(6px)",
                              border: "1.5px solid var(--yellow)",
                              color: "#FFFFFF",
                              fontFamily: "var(--font-headings)",
                              fontWeight: 900,
                              fontSize: "11px",
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              pointerEvents: "none",
                              whiteSpace: "nowrap",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                              zIndex: 6
                            }}>
                              <span style={{ color: "var(--yellow)", fontSize: "10px" }}>▶</span> Click to View in Full Gallery
                            </div>
                          </motion.div>
                        </div>

                        {/* Text Story & Creative 2x2 Metrics Grid */}
                        <div style={{ position: "relative" }}>
                          
                          {/* Header Badge + Arrow */}
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
                            <span style={{
                              background: "var(--yellow)",
                              color: "var(--ink)",
                              padding: "6px 16px",
                              borderRadius: "100px",
                              fontFamily: "var(--font-headings)",
                              fontWeight: 900,
                              fontSize: "12px",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              border: "2px solid var(--ink)",
                              boxShadow: "3px 4px 0 var(--ink)"
                            }}>
                              🔥 Viral Content Focus
                            </span>

                            {/* Hand-drawn curved arrow pointing left towards video player */}
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <svg width="44" height="24" viewBox="0 0 44 24" fill="none">
                                <path d="M38 18 C 28 22, 16 16, 8 8" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
                                <path d="M14 6 L 6 7 L 9 15" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "12px", textTransform: "uppercase", color: "var(--ink-70)" }}>
                                224K+ Organic Reach
                              </span>
                            </div>
                          </div>

                          <h4 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(26px, 4vw, 44px)", textTransform: "uppercase", color: "var(--ink)", lineHeight: 1.05, marginBottom: "16px" }}>
                            {activeProject.viralSpotlight.title}
                          </h4>

                          <p style={{ fontSize: "15px", color: "var(--ink-70)", fontFamily: "var(--font-body)", lineHeight: 1.6, marginBottom: "28px", maxWidth: "540px" }}>
                            This single reel unlocked massive market demand by capitalizing on the local gap in food content. It drove insane organic viral reach across Instagram within days.
                          </p>

                          {/* Reel Specific Metrics Grid (Forced 2-Column Grid) */}
                          <div className="cs-viral-metrics-container" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
                            {activeProject.viralSpotlight.metrics.map((m, idx) => {
                              const icon = m.label === "Views" ? "👁️" : (m.label === "Shares" ? "🚀" : (m.label === "Likes" ? "❤️" : "🔖"));
                              return (
                                <motion.div 
                                  key={idx} 
                                  whileHover={{ y: -4, boxShadow: "6px 7px 0 var(--ink)" }}
                                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                  style={{
                                    background: "#FFFFFF",
                                    padding: "20px 22px",
                                    borderRadius: "20px",
                                    border: "2.5px solid var(--ink)",
                                    boxShadow: "4px 5px 0 var(--ink)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px"
                                  }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: "18px" }}>{icon}</span>
                                    <span style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "11px", textTransform: "uppercase", color: "var(--ink-45)", letterSpacing: "0.06em" }}>
                                      Metric 0{idx + 1}
                                    </span>
                                  </div>

                                  <div style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "32px", color: "var(--ink)", lineHeight: 1.1, marginTop: "6px" }}>
                                    {m.value}
                                  </div>

                                  <div style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "12px", textTransform: "uppercase", color: "var(--ink-70)", letterSpacing: "0.04em" }}>
                                    {m.label}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {/* ADMIN PORTAL SPOTLIGHT CARD */}
                  {activeProject.adminPortalSpotlight && (
                    <motion.div
                      className="cs-admin-spotlight"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      style={{
                        background: "linear-gradient(135deg, #0f1923 0%, #0a2540 100%)",
                        border: "3px solid #3b82f6",
                        borderRadius: "28px",
                        padding: "56px 40px",
                        marginTop: "40px",
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: "0 0 60px rgba(59,130,246,0.2)"
                      }}
                    >
                      {/* Background glow orb */}
                      <div className="cs-admin-glow" style={{ position: "absolute", top: "-80px", right: "-80px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(59,130,246,0.12)", filter: "blur(40px)", pointerEvents: "none" }} />

                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                        <div className="cs-admin-badge" style={{ padding: "6px 16px", background: "#3b82f6", borderRadius: "100px", fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#fff" }}>
                          🛠️ Platform Feature
                        </div>
                      </div>

                      <h4 className="cs-admin-title" style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(24px, 3.5vw, 42px)", textTransform: "uppercase", color: "#fff", lineHeight: 1.1, marginBottom: "12px" }}>
                        {activeProject.adminPortalSpotlight.title}
                      </h4>
                      <p className="cs-admin-desc" style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", marginBottom: "40px", maxWidth: "600px" }}>
                        A fully custom content management system built into the platform — giving the Samarth Academy team complete control without any developer dependency.
                      </p>

                      <div className="cs-admin-features" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
                        {activeProject.adminPortalSpotlight.features.map((feat, idx) => (
                          <div key={idx} className="cs-admin-card" style={{
                            padding: "24px 20px",
                            background: "rgba(59,130,246,0.1)",
                            borderRadius: "16px",
                            border: "1px solid rgba(59,130,246,0.3)",
                            backdropFilter: "blur(8px)"
                          }}>
                            <div className="cs-admin-card-icon" style={{ fontSize: "32px", marginBottom: "12px" }}>{feat.icon}</div>
                            <div className="cs-admin-card-label" style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "16px", color: "#93c5fd", textTransform: "uppercase", marginBottom: "8px" }}>{feat.label}</div>
                            <div className="cs-admin-card-desc" style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{feat.desc}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </section>
            )}

              {/* Testimonial */}
              {activeProject.testimonial && (
                <section className="cs-testimonial-section" style={{ padding: "160px 40px", maxWidth: "1000px", margin: "0 auto", textAlign: "center", position: "relative" }}>
                  <div style={{ position: "absolute", top: "80px", left: "50%", transform: "translateX(-50%)", fontSize: "200px", color: "var(--yellow)", lineHeight: 0.5, fontFamily: "var(--font-headings)", fontWeight: 900, opacity: 0.3, zIndex: 0 }}>"</div>
                  <h3 className="cs-testimonial-quote" style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: "clamp(24px, 4vw, 48px)", lineHeight: 1.3, color: "var(--ink)", marginBottom: "40px" }}>
                    {activeProject.testimonial.quote}
                  </h3>
                  <div style={{ position: "relative", zIndex: 1, fontSize: "18px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-70)" }}>
                    — {activeProject.testimonial.author}
                  </div>
                </section>
              )}

              {/* NEXT PROJECT FOOTER (The Page Flip) */}
              <section 
                onClick={goToNextProject}
                style={{ 
                  padding: "160px 40px", 
                  background: "var(--yellow)", 
                  cursor: "pointer", 
                  textAlign: "center", 
                  transition: "background 0.3s ease" 
                }}
                className="cs-next-footer"
              >
                <style>{`
                  .next-project-footer:hover { background: #E6B300 !important; }
                  .next-project-footer:hover .next-arrow { transform: translateX(20px); }
                `}</style>
                <div style={{ fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: "16px", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--ink-70)", marginBottom: "24px" }}>
                  Next Case Study
                </div>
                <h2 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(48px, 8vw, 120px)", textTransform: "uppercase", color: "var(--ink)", lineHeight: 0.9, display: "flex", alignItems: "center", justifyContent: "center", gap: "24px" }}>
                  {ALL_PROJECTS[(ALL_PROJECTS.findIndex(p => p.id === activeProject.id) + 1) % ALL_PROJECTS.length].name}
                  <div className="next-arrow" style={{ transition: "transform 0.4s ease" }}>
                    <VscArrowRight />
                  </div>
                </h2>
              </section>

              <PresentationMode />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
}
