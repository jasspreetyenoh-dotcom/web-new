"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ALL_PROJECTS } from "@/data/projects";
import fullLogo from "@/app/full logo.png";
import GlobalDock from "@/components/GlobalDock";
import HighlightText from "@/components/HighlightText";
import ScrollCrayonLine from "@/components/ScrollCrayonLine";

// ─── Normalize Industry Categories ──────────────────────────────────────────
const getNormalizedIndustry = (p) => {
  const ind = (p.industry || p.category || "").toLowerCase();
  if (ind.includes("immigration")) return "Immigration";
  if (ind.includes("food") || ind.includes("restaurant") || ind.includes("f&b")) return "Food & Beverage";
  if (ind.includes("edtech") || ind.includes("education") || ind.includes("school") || ind.includes("coaching")) return "Education & EdTech";
  if (ind.includes("pr") || ind.includes("personal") || ind.includes("public figure")) return "PR & Personal Brand";
  if (ind.includes("political") || ind.includes("governance") || ind.includes("legal")) return "Political & Legal";
  if (ind.includes("music") || ind.includes("entertainment") || ind.includes("infotainment") || ind.includes("media") || ind.includes("publishing") || ind.includes("book")) return "Entertainment & Media";
  return "Creative & Business";
};

// ─── Extract All Content Dynamically ─────────────────────────────────────────
const WEBSITES_DATA = [
  { id: "web-pi", title: "Punjab Immigration Platform", client: "Punjab Immigration", industry: "Immigration", url: "punjabimmigration.com", tag: "Immigration & Visa", slug: "punjab-immigration", img: "/projects/punjab-immigration/PCVIEW-PI.png" },
  { id: "web-sa", title: "Samarth Academy Portal", client: "Samarth Academy", industry: "Education & EdTech", url: "samarthacademy.in", tag: "EdTech Learning Portal", slug: "samarth-academy", img: "/projects/samarth-academy/PCVIEW-SAMARTH.png" },
  { id: "web-da", title: "Dolma Aunti Momos Storefront", client: "Dolma Aunti Momos", industry: "Food & Beverage", url: "dolmaauntimomos.com", tag: "F&B Digital Storefront", slug: "dolma-aunti-momos", img: "/projects/dolma-aunti-momos/PCVIEW-DOLMA.png" },
  { id: "web-bds", title: "BDS Blossoms School", client: "BDS Blossoms", industry: "Education & EdTech", url: "bdsblossoms.edu", tag: "7-Page Educational Portal", slug: "bds-blossoms", img: "/projects/bds-blossoms/PCVIEW1.png" },
  { id: "web-ds", title: "DSIDEIN Studio App", client: "DSIDEIN Studio", industry: "Creative & Business", url: "dsidein.com", tag: "Enterprise Web Application", slug: "dsidein", img: "/projects/dsidein/PCVIEW1.png" },
];

const INDUSTRIES_LIST = [
  "All Industries",
  "Immigration",
  "Food & Beverage",
  "Education & EdTech",
  "PR & Personal Brand",
  "Political & Legal",
  "Entertainment & Media",
  "Creative & Business"
];

// ─── Custom Containers (Home Screen Style) ───────────────────────────────────

// 1. PC Browser Website Container
function PCBrowserTile({ site }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y: hovered ? -8 : 0,
        scale: hovered ? 1.015 : 1,
        boxShadow: hovered
          ? "0 22px 42px rgba(0,0,0,0.18), 4px 5px 0 var(--ink)"
          : "0 8px 24px rgba(0,0,0,0.1), 2.5px 3px 0 var(--ink)",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      style={{
        borderRadius: 16,
        border: "2.5px solid var(--ink)",
        overflow: "hidden",
        background: "#FFFFFF",
        cursor: "pointer",
        width: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* PC Browser Header Bar */}
      <div style={{ background: "var(--ink)", padding: "8px 14px", display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F56" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFBD2E" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27C93F" }} />
        <div style={{ flex: 1, margin: "0 12px", background: "rgba(255,255,255,0.12)", borderRadius: 5, padding: "3px 12px", overflow: "hidden" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.75)", letterSpacing: "0.02em" }}>https://{site.url}</span>
        </div>
      </div>
      {/* Screenshot Container */}
      <div style={{ width: "100%", overflow: "hidden", position: "relative", background: "var(--paper)" }}>
        <img src={site.img} alt={site.title} style={{ width: "100%", display: "block", objectFit: "cover" }} />
      </div>
      {/* Bottom Meta & Action */}
      <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, borderTop: "2px solid var(--line-color)", background: "#FFFFFF" }}>
        <div>
          <div style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: 16, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "-0.01em" }}>{site.client}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-70)", marginTop: 2 }}>{site.tag}</div>
        </div>
        <Link href={`/portfolio/${site.slug}`} className="btn-sm" style={{ padding: "8px 18px", fontSize: "12px", textDecoration: "none" }}>
          Case Study →
        </Link>
      </div>
    </motion.div>
  );
}

// 2. 9:16 Vertical Reel Video Container
function ReelTileContainer({ reel }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const isLandscape = reel.aspectRatio === "16/9";

  return (
    <motion.div
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
      animate={{
        y: hovered ? -8 : 0,
        scale: hovered ? 1.025 : 1,
        boxShadow: hovered
          ? "0 22px 40px rgba(0,0,0,0.24), 3.5px 4.5px 0 var(--ink)"
          : "0 8px 20px rgba(0,0,0,0.12), 2px 3px 0 var(--ink)",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      style={{
        borderRadius: 16,
        border: "2.5px solid var(--ink)",
        overflow: "hidden",
        background: "#0D0D0D",
        cursor: "pointer",
        position: "relative",
        aspectRatio: isLandscape ? "16/9" : "9/16",
        width: "100%"
      }}
    >
      {reel.isYoutube ? (
        <iframe
          src={reel.src}
          title={reel.caption || reel.client}
          style={{ width: "100%", height: "100%", border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          ref={videoRef}
          src={`${reel.src}#t=0.1`}
          muted
          loop
          playsInline
          preload="metadata"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      )}

      {/* Dark Overlay Gradient for Client Tag */}
      {!reel.isYoutube && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 16px 14px", background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)", pointerEvents: "none" }}>
          <span style={{ display: "inline-block", background: "var(--yellow)", color: "var(--ink)", fontFamily: "var(--font-headings)", fontWeight: 800, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 4, marginBottom: 6 }}>
            {reel.client}
          </span>
          <div style={{ fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: 13, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.25 }}>
            {reel.caption || reel.client}
          </div>
        </div>
      )}

      {/* Yellow Play Icon Badge (when idle) */}
      {!hovered && !reel.isYoutube && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 48, height: 48, borderRadius: "50%", background: "rgba(246,192,0,0.92)", border: "2px solid var(--ink)", boxShadow: "2px 3px 0 var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s ease", pointerEvents: "none" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--ink)"><polygon points="4,2 14,8 4,14" /></svg>
        </div>
      )}
    </motion.div>
  );
}

// 3. Campaign Graphic / Post Container
function GraphicPostContainer({ graphic }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y: hovered ? -8 : 0,
        scale: hovered ? 1.02 : 1,
        boxShadow: hovered
          ? "0 22px 40px rgba(0,0,0,0.18), 3.5px 4.5px 0 var(--ink)"
          : "0 8px 20px rgba(0,0,0,0.08), 2px 3px 0 var(--ink)",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      style={{
        borderRadius: 16,
        border: "2.5px solid var(--ink)",
        overflow: "hidden",
        background: "#FFFFFF",
        cursor: "pointer",
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ width: "100%", overflow: "hidden", position: "relative", background: "#FAF9F6" }}>
        <img src={graphic.img} alt={graphic.caption || graphic.client} style={{ width: "100%", display: "block", objectFit: "cover" }} />
      </div>
      <div style={{ padding: "14px 16px", background: "#FFFFFF", borderTop: "2px solid var(--line-color)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: 14, color: "var(--ink)", textTransform: "uppercase" }}>{graphic.client}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--ink-70)", marginTop: 2 }}>{graphic.caption || graphic.industry}</div>
        </div>
        <Link href={`/portfolio/${graphic.slug}`} className="btn-sm btn-ghost" style={{ padding: "6px 14px", fontSize: "11px", textDecoration: "none" }}>
          View →
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Main Showcase Page ───────────────────────────────────────────────────────
export default function ShowcasePage() {
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedCategory, setSelectedCategory] = useState("All Work");

  // Collect All Reels and All Graphics dynamically from ALL_PROJECTS
  const { allReels, allGraphics } = useMemo(() => {
    const reelsArr = [];
    const graphicsArr = [];

    ALL_PROJECTS.forEach((proj) => {
      const ind = getNormalizedIndustry(proj);

      if (proj.gallery && Array.isArray(proj.gallery)) {
        proj.gallery.forEach((item, idx) => {
          if (item.type === "video" || item.type === "youtube") {
            reelsArr.push({
              id: `${proj.id}-reel-${idx}`,
              client: proj.name,
              industry: ind,
              slug: proj.slug,
              src: item.src,
              caption: item.caption || `${proj.name} Campaign Reel`,
              aspectRatio: item.aspectRatio || "9/16",
              isYoutube: item.type === "youtube"
            });
          } else if (item.type === "image" && item.category !== "Website" && item.category !== "Social Grid") {
            // Explicitly EXCLUDE Insta Grids per user directive!
            graphicsArr.push({
              id: `${proj.id}-graphic-${idx}`,
              client: proj.name,
              industry: ind,
              slug: proj.slug,
              img: item.src,
              caption: item.caption || `${proj.name} Creative Post`
            });
          }
        });
      }

      if (proj.viralSpotlight?.video && !reelsArr.some(r => r.src === proj.viralSpotlight.video)) {
        reelsArr.unshift({
          id: `${proj.id}-viral`,
          client: proj.name,
          industry: ind,
          slug: proj.slug,
          src: proj.viralSpotlight.video,
          caption: proj.viralSpotlight.title || `${proj.name} Viral Reel`,
          aspectRatio: "9/16"
        });
      }
    });

    return { allReels: reelsArr, allGraphics: graphicsArr };
  }, []);

  // Filtered Lists based on selected industry
  const filteredWebsites = useMemo(() => {
    if (selectedIndustry === "All Industries") return WEBSITES_DATA;
    return WEBSITES_DATA.filter(w => w.industry === selectedIndustry);
  }, [selectedIndustry]);

  const filteredReels = useMemo(() => {
    if (selectedIndustry === "All Industries") return allReels;
    return allReels.filter(r => r.industry === selectedIndustry);
  }, [selectedIndustry, allReels]);

  const filteredGraphics = useMemo(() => {
    if (selectedIndustry === "All Industries") return allGraphics;
    return allGraphics.filter(g => g.industry === selectedIndustry);
  }, [selectedIndustry, allGraphics]);

  const totalItemsCount = filteredWebsites.length + filteredReels.length + filteredGraphics.length;

  return (
    <>
      <main style={{ background: "var(--paper)", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>

        {/* ── Fixed Header Nav ── */}
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 900, padding: "16px 5vw", backdropFilter: "blur(12px)", background: "rgba(250,249,246,0.88)", borderBottom: "1px solid var(--line-color)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <img src={fullLogo.src} alt="YENOH Logo" style={{ height: "32px", width: "auto" }} />
          </Link>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Link href="/portfolio" className="btn-sm btn-ghost" style={{ textDecoration: "none" }}>
              Portfolio
            </Link>
            <Link href="/contact" className="btn-sm" style={{ textDecoration: "none" }}>
              Let's Talk →
            </Link>
          </div>
        </header>

        {/* ── Hero Title Section ── */}
        <section style={{ paddingTop: "140px", paddingBottom: "50px", paddingLeft: "5vw", paddingRight: "5vw", maxWidth: "1240px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ fontFamily: "var(--font-headings)", fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--ink-70)", display: "inline-block", marginBottom: 12 }}>
              YENOH Creative Engine Showcase
            </span>
            <h1 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(42px, 7vw, 84px)", textTransform: "uppercase", letterSpacing: "-0.03em", color: "var(--ink)", lineHeight: 0.95, marginBottom: 20 }}>
              Websites.<br />
              <HighlightText delay={0.2}>Reels & Content</HighlightText>.<br />
              Brand Graphics.
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--ink-70)", maxWidth: 580, lineHeight: 1.6 }}>
              Explore our full repository of digital products, viral video reels, and brand campaign posts — filtered by industry.
            </p>
          </motion.div>
        </section>

        {/* ── Industry Filter Bar Above ── */}
        <section style={{ position: "sticky", top: "70px", zIndex: 800, background: "rgba(250,249,246,0.94)", backdropFilter: "blur(12px)", borderTop: "1px solid var(--line-color)", borderBottom: "1px solid var(--line-color)", padding: "16px 5vw" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
            
            {/* Industry Filter Chips */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", overflowX: "auto", paddingBottom: "4px", scrollbarWidth: "none" }}>
              <span style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-70)", marginRight: 6, flexShrink: 0 }}>
                Industry:
              </span>
              {INDUSTRIES_LIST.map((ind) => {
                const active = selectedIndustry === ind;
                return (
                  <button
                    key={ind}
                    onClick={() => setSelectedIndustry(ind)}
                    style={{
                      fontFamily: "var(--font-headings)",
                      fontWeight: 800,
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      border: active ? "2px solid var(--ink)" : "1.5px solid var(--line-color)",
                      background: active ? "var(--yellow)" : "#FFFFFF",
                      color: "var(--ink)",
                      cursor: "pointer",
                      boxShadow: active ? "2px 3px 0 var(--ink)" : "none",
                      transition: "all 0.2s ease",
                      flexShrink: 0
                    }}
                  >
                    {ind}
                  </button>
                );
              })}
            </div>

            {/* Content Type Filter Pills */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { id: "All Work", label: `All Work (${totalItemsCount})` },
                  { id: "Websites", label: `Websites (${filteredWebsites.length})` },
                  { id: "Reels & Videos", label: `Reels & Videos (${filteredReels.length})` },
                  { id: "Graphics & Posts", label: `Graphics (${filteredGraphics.length})` }
                ].map((tab) => {
                  const active = selectedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id)}
                      style={{
                        fontFamily: "var(--font-headings)",
                        fontWeight: active ? 900 : 700,
                        fontSize: "12.5px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "6px 14px",
                        borderRadius: "8px",
                        border: "1.5px solid var(--ink)",
                        background: active ? "var(--ink)" : "transparent",
                        color: active ? "#FFFFFF" : "var(--ink)",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ fontFamily: "var(--font-headings)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--ink-70)" }}>
                Showing {totalItemsCount} Assets
              </div>
            </div>

          </div>
        </section>

        {/* ── Content Grid Sections ── */}
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "60px 5vw 120px", display: "flex", flexDirection: "column", gap: "80px" }}>

          {/* 1. WEBSITES SECTION */}
          {(selectedCategory === "All Work" || selectedCategory === "Websites") && filteredWebsites.length > 0 && (
            <section>
              <div style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-headings)", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--yellow)" }}>01. WEBSITES</span>
                  <h2 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(28px, 4vw, 44px)", textTransform: "uppercase", color: "var(--ink)", marginTop: 4 }}>
                    Web Platforms & Storefronts
                  </h2>
                </div>
                <ScrollCrayonLine path="M0 10 C 50 0, 150 20, 200 10" width="120px" height="20px" stroke="var(--ink)" delay={0.2} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))", gap: 32 }}>
                {filteredWebsites.map((site) => (
                  <PCBrowserTile key={site.id} site={site} />
                ))}
              </div>
            </section>
          )}

          {/* 2. REELS & VIDEOS SECTION */}
          {(selectedCategory === "All Work" || selectedCategory === "Reels & Videos") && filteredReels.length > 0 && (
            <section>
              <div style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-headings)", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--yellow)" }}>02. REELS & VIDEO CONTENT</span>
                  <h2 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(28px, 4vw, 44px)", textTransform: "uppercase", color: "var(--ink)", marginTop: 4 }}>
                    Viral Reels & Production Videos ({filteredReels.length})
                  </h2>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 210px), 1fr))", gap: 24 }}>
                {filteredReels.map((reel) => (
                  <ReelTileContainer key={reel.id} reel={reel} />
                ))}
              </div>
            </section>
          )}

          {/* 3. GRAPHICS & CAMPAIGNS SECTION */}
          {(selectedCategory === "All Work" || selectedCategory === "Graphics & Posts") && filteredGraphics.length > 0 && (
            <section>
              <div style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-headings)", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--yellow)" }}>03. BRAND GRAPHICS & CREATIVES</span>
                  <h2 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(28px, 4vw, 44px)", textTransform: "uppercase", color: "var(--ink)", marginTop: 4 }}>
                    Social Campaign Graphics ({filteredGraphics.length})
                  </h2>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: 24 }}>
                {filteredGraphics.map((graphic) => (
                  <GraphicPostContainer key={graphic.id} graphic={graphic} />
                ))}
              </div>
            </section>
          )}

          {/* Empty State if filter yields no results */}
          {totalItemsCount === 0 && (
            <div style={{ padding: "80px 20px", textAlign: "center" }}>
              <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: 24, textTransform: "uppercase", color: "var(--ink)" }}>
                No Assets Found For "{selectedIndustry}"
              </h3>
              <button
                onClick={() => setSelectedIndustry("All Industries")}
                className="btn-sm"
                style={{ marginTop: 16 }}
              >
                Reset Industry Filter
              </button>
            </div>
          )}

        </div>

        {/* ── Bottom CTA ── */}
        <section style={{ padding: "80px 5vw 140px", background: "var(--card-bg)", borderTop: "2px solid var(--line-color)", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(32px, 5vw, 56px)", textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: 16 }}>
              Want to scale your brand with YENOH?
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--ink-70)", marginBottom: 36 }}>
              From high-converting web applications to viral reels and brand identity systems — let's build something extraordinary.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn">
                Start a Project →
              </Link>
              <Link href="/portfolio" className="btn btn-ghost">
                View Case Studies
              </Link>
            </div>
          </div>
        </section>

      </main>
      <GlobalDock />
    </>
  );
}
