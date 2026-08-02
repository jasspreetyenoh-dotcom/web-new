"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import HighlightText from "./HighlightText";
import ScrollCrayonLine from "./ScrollCrayonLine";
import { ALL_PROJECTS } from "@/data/projects";

export default function FeaturedWork() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Curate featured projects to showcase dynamically on the home screen in the requested order
  const featuredIds = [
    "punjab-immigration",
    "harman-sekhon",
    "samarth-academy",
    "yug-chintak",
    "dolma-aunti-momos"
  ];

  const featuredAssets = {
    "punjab-immigration": {
      website: "/projects/punjab-immigration/PCVIEW-PI.png",
      reel: "/projects/punjab-immigration/_punjabimmigration_1779962453_3906930387473549860_67354189286.mp4",
      instaGrid: "/projects/punjab-immigration/IMG_1597.PNG",
      post: "/projects/punjab-immigration/Study Visa  Visiter Visa  Work Visa  PR (1).png"
    },
    "harman-sekhon": {
      reel: "/projects/harman-sekhon/hs1.mp4",
      graphic: "/projects/harman-sekhon/hsg1.jpg",
      feed: "/projects/harman-sekhon/IMG_1616.PNG"
    },
    "samarth-academy": {
      website: "/projects/samarth-academy/PCVIEW-SAMARTH.png",
      reel: "/projects/samarth-academy/gs1.mp4",
      portal: "/projects/samarth-academy/mobile1.PNG"
    },
    "yug-chintak": {
      ep1: "https://img.youtube.com/vi/amm9OPukoEA/maxresdefault.jpg",
      ep2: "https://img.youtube.com/vi/z_DqiYL1Y1Y/maxresdefault.jpg",
      ep3: "https://img.youtube.com/vi/MeLX6j-nPp0/maxresdefault.jpg"
    },
    "dolma-aunti-momos": {
      website: "/projects/dolma-aunti-momos/PCVIEW-DOLMA.png",
      reel: "/projects/dolma-aunti-momos/homepagereel.mp4",
      post: "/projects/dolma-aunti-momos/dolmapost.png"
    }
  };

  const projectList = featuredIds
    .map(id => ALL_PROJECTS.find(p => p.id === id))
    .filter(Boolean)
    .map(project => {
      const videoSrc = project.id === "dolma-aunti-momos" ? "/projects/dolma-aunti-momos/homepagereel.mp4" : null;
      const ratio = project.id === "dolma-aunti-momos" ? "1122/1402" : (project.id === "harman-sekhon" ? "4/5" : "16/10.5");
      const displayTitle = project.id === "punjab-immigration" ? "Immigration Consultancy" : `${project.category || "Campaign"} — ${project.industry}`;
      return {
        id: project.id,
        slug: project.slug,
        client: project.name,
        title: displayTitle,
        summary: project.summary,
        tags: project.deliverables ? project.deliverables.slice(0, 3) : (project.services ? project.services.slice(0, 3) : []),
        image: project.image,
        video: videoSrc,
        aspectRatio: ratio,
      };
    });

  // Clean Floating Tiles with Silky Smooth 3D Tactile Lift Physics
  const VerticalTile = ({ children, width = "27%", rotation = "0deg", zIndex = 1, aspectRatio = "9/16", style = {} }) => {
    const numericRotate = typeof rotation === "string" ? parseFloat(rotation.replace("deg", "")) : rotation;
    const baseZ = typeof style.zIndex === "number" ? style.zIndex : zIndex;
    const [isHovered, setIsHovered] = useState(false);
    const { transform, ...restStyle } = style;
    const hoverRotate = numericRotate > 0 ? 1 : (numericRotate < 0 ? -1 : 0);

    return (
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.04 : 1,
          rotate: isHovered ? hoverRotate : numericRotate,
          boxShadow: isHovered 
            ? "0 20px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)" 
            : "0 10px 24px rgba(0,0,0,0.14), 2px 3px 0 var(--ink)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 25, mass: 0.8 }}
        style={{
          position: "absolute",
          width,
          aspectRatio,
          borderRadius: "16px",
          border: "2.5px solid var(--ink)",
          overflow: "hidden",
          rotate: numericRotate,
          zIndex: isHovered ? 30 : baseZ,
          background: "#000000",
          cursor: "pointer",
          ...restStyle
        }}
      >
        {children}
      </motion.div>
    );
  };

  const PCTile = ({ children, width = "68%", zIndex = 2, style = {} }) => {
    const baseZ = typeof style.zIndex === "number" ? style.zIndex : zIndex;
    const [isHovered, setIsHovered] = useState(false);
    return (
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -10 : 0,
          scale: isHovered ? 1.02 : 1,
          boxShadow: isHovered 
            ? "0 22px 40px rgba(0,0,0,0.24), 4px 6px 0 var(--ink)" 
            : "0 12px 24px rgba(0,0,0,0.14), 3px 4px 0 var(--ink)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 25, mass: 0.8 }}
        style={{
          position: "relative",
          width,
          borderRadius: "16px",
          border: "2.5px solid var(--ink)",
          overflow: "hidden",
          background: "#FFFFFF",
          zIndex: isHovered ? 30 : baseZ,
          cursor: "pointer",
          ...style
        }}
      >
        {/* Browser Bar */}
        <div
          style={{
            width: "100%",
            background: "var(--ink)",
            padding: "5px 12px",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#27C93F" }} />
        </div>
        <div style={{ width: "100%", overflow: "hidden" }}>
          {children}
        </div>
      </motion.div>
    );
  };

  const CustomFloatingTile = ({ children, width, aspectRatio, rotation = 0, zIndex = 1, style = {} }) => {
    const numericRotate = typeof rotation === "string" ? parseFloat(rotation.replace("deg", "")) : rotation;
    const baseZ = typeof style.zIndex === "number" ? style.zIndex : zIndex;
    const [isHovered, setIsHovered] = useState(false);
    const hoverRotate = numericRotate > 0 ? 1 : (numericRotate < 0 ? -1 : 0);

    return (
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.04 : 1,
          rotate: isHovered ? hoverRotate : numericRotate,
          boxShadow: isHovered 
            ? "0 20px 36px rgba(0,0,0,0.22), 4px 6px 0 var(--ink)" 
            : "0 10px 24px rgba(0,0,0,0.14), 2px 3px 0 var(--ink)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 25, mass: 0.8 }}
        style={{
          width,
          aspectRatio,
          borderRadius: "16px",
          border: "2.5px solid var(--ink)",
          overflow: "hidden",
          rotate: numericRotate,
          zIndex: isHovered ? 30 : baseZ,
          cursor: "pointer",
          background: "#FFFFFF",
          ...style
        }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section className="work" id="work">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">
            <svg viewBox="0 0 40 20" style={{ width: "20px", height: "10px", fill: "none", stroke: "var(--ink)", strokeWidth: 3 }}>
              <path d="M2 10 H 38" />
            </svg>
            Selected Case Studies
          </span>
          <h2 className="section-title">
            <HighlightText delay={0.2}>Featured</HighlightText>
            {" "}Work
          </h2>
        </motion.div>

        {/* Decorative crayon squiggle between header and cards */}
        <div style={{ marginBottom: "40px", marginTop: "-30px", opacity: 0.15 }}>
          <ScrollCrayonLine
            path="M0 20 C 150 5, 400 35, 700 15 C 900 0, 1050 30, 1200 20"
            viewBox="0 0 1200 40"
            width="100%"
            height="40px"
            stroke="var(--ink)"
            strokeWidth={3}
            delay={0.3}
          />
        </div>
        <div className="work-grid">
          {projectList.map((project, idx) => (
            <motion.article
              className="work-card"
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Image Visual Column - Floating Clean Tiles without overall container */}
              <Link
                href={`/portfolio/${project.slug}`}
                className="work-visual"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "0",
                  background: "transparent",
                  border: "none",
                  boxShadow: "none",
                  justifySelf: "center",
                  margin: "0 auto",
                  textDecoration: "none",
                  overflow: "visible"
                }}
              >
                <motion.div 
                  className="work-image-wrap"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  style={{
                    aspectRatio: project.id === "punjab-immigration" ? "16/21.5" : "16/10.5",
                    width: "100%",
                    borderRadius: "24px",
                    position: "relative",
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0",
                    overflow: "visible"
                  }}
                >
                  {project.id === "punjab-immigration" && (
                    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "16px 0", overflow: "visible" }}>
                      {/* 1. Above in Y Direction: PC Website View (Slightly adjusted downward for clean top margin) */}
                      <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", zIndex: 4, marginTop: "20px" }}>
                        <PCTile width="76%" zIndex={4}>
                          <img 
                            src={featuredAssets["punjab-immigration"].website} 
                            alt="Punjab Immigration Desktop Web Platform"
                            style={{ width: "100%", aspectRatio: "1895/1079", objectFit: "contain", display: "block" }} 
                          />
                        </PCTile>
                      </div>

                      {/* 2. Bottom Row: 4:5 Graphic (Left of Grid) + Mobile Grid (Center) + 9:16 Reel (Right of Grid) */}
                      <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "16px", marginBottom: "8px", overflow: "visible" }}>
                        {/* Left side of Grid: Uncropped Campaign Graphic with exact aspect ratio */}
                        <CustomFloatingTile
                          width="29%"
                          aspectRatio="1435/1789"
                          rotation={-4}
                          zIndex={3}
                          style={{ position: "absolute", left: "1%", background: "#FAF9F6" }}
                        >
                          <img 
                            src={featuredAssets["punjab-immigration"].post} 
                            alt="Campaign Post Graphic"
                            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} 
                          />
                        </CustomFloatingTile>

                        {/* Center: Mobile Instagram Grid Feed (36% Width - 100% Uncropped) */}
                        <CustomFloatingTile
                          width="36%"
                          aspectRatio="1242/2510"
                          rotation={0}
                          zIndex={2}
                          style={{ position: "relative", border: "2.5px solid var(--ink)", background: "transparent" }}
                        >
                          <img 
                            src={featuredAssets["punjab-immigration"].instaGrid} 
                            alt="Curated Instagram Grid Feed"
                            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} 
                          />
                        </CustomFloatingTile>

                        {/* Right side of Grid: 9:16 Video Reel (28% Width - Full size, zero corner clipping) */}
                        <VerticalTile rotation="4deg" zIndex={3} aspectRatio="9/16" style={{ right: "2%", width: "28%" }}>
                          <video src={`${featuredAssets["punjab-immigration"].reel}#t=0.1`} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </VerticalTile>
                      </div>
                    </div>
                  )}

                  {project.id === "harman-sekhon" && (
                    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {/* 1. Instagram Feed Grid Tile (Left - Uncropped exact ratio) */}
                      <VerticalTile rotation="-5deg" zIndex={1} aspectRatio="1242/2481" style={{ left: "3%" }}>
                        <img src={featuredAssets["harman-sekhon"].feed} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                      </VerticalTile>

                      {/* 2. Campaign Graphic Card (Center - Uncropped exact ratio) */}
                      <CustomFloatingTile
                        width="42%"
                        aspectRatio="1279/1600"
                        rotation={0}
                        zIndex={2}
                        style={{ position: "relative", background: "#FFF" }}
                      >
                        <img src={featuredAssets["harman-sekhon"].graphic} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                      </CustomFloatingTile>

                      {/* 3. 9:16 Video Reel Tile (Right) */}
                      <VerticalTile rotation="4deg" zIndex={3} style={{ right: "3%" }}>
                        <video src={`${featuredAssets["harman-sekhon"].reel}#t=0.1`} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </VerticalTile>
                    </div>
                  )}

                  {project.id === "samarth-academy" && (
                    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {/* 1. Mobile App Portal Tile (Left - Uncropped exact screenshot ratio 1242:2457) */}
                      <VerticalTile rotation="-5deg" zIndex={1} aspectRatio="1242/2457" style={{ left: "3%" }}>
                        <img src={featuredAssets["samarth-academy"].portal} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                      </VerticalTile>

                      {/* 2. Laptop Browser PC Website View (Center Uncropped) */}
                      <PCTile width="68%" zIndex={2}>
                        <img src={featuredAssets["samarth-academy"].website} style={{ width: "100%", aspectRatio: "1886/1079", objectFit: "contain", display: "block" }} />
                      </PCTile>

                      {/* 3. 9:16 Video Reel Tile (Right) */}
                      <VerticalTile rotation="4deg" zIndex={3} style={{ right: "3%" }}>
                        <video src={`${featuredAssets["samarth-academy"].reel}#t=0.1`} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </VerticalTile>
                    </div>
                  )}

                  {project.id === "yug-chintak" && (
                    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {/* 1. Episode 3 Card (Left) */}
                      <CustomFloatingTile
                        width="40%"
                        aspectRatio="16/9"
                        rotation={-5}
                        zIndex={1}
                        style={{ position: "absolute", left: "3%", filter: "opacity(0.95)" }}
                      >
                        <img src={featuredAssets["yug-chintak"].ep3} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </CustomFloatingTile>

                      {/* 2. Main Episode 1 Card (Center) */}
                      <CustomFloatingTile
                        width="52%"
                        aspectRatio="16/9"
                        rotation={0}
                        zIndex={3}
                        style={{ position: "relative" }}
                      >
                        <img src={featuredAssets["yug-chintak"].ep1} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.15)" }}>
                          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#FF0000", border: "2px solid #FFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFF">
                              <polygon points="6,4 20,12 6,20" />
                            </svg>
                          </div>
                        </div>
                      </CustomFloatingTile>

                      {/* 3. Episode 2 Card (Right) */}
                      <CustomFloatingTile
                        width="40%"
                        aspectRatio="16/9"
                        rotation={5}
                        zIndex={2}
                        style={{ position: "absolute", right: "3%", filter: "opacity(0.95)" }}
                      >
                        <img src={featuredAssets["yug-chintak"].ep2} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </CustomFloatingTile>
                    </div>
                  )}

                  {project.id === "dolma-aunti-momos" && (
                    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {/* 1. Brand Post Graphic Tile (Left - Customized container with actual 1122:1402 / 4:5 image ratio) */}
                      <VerticalTile rotation="-5deg" zIndex={1} aspectRatio="1122/1402" style={{ left: "3%" }}>
                        <img src={featuredAssets["dolma-aunti-momos"].post} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                      </VerticalTile>

                      {/* 2. Laptop Browser PC Website View (Center Uncropped) */}
                      <PCTile width="68%" zIndex={2}>
                        <img src={featuredAssets["dolma-aunti-momos"].website} style={{ width: "100%", aspectRatio: "1024/575", objectFit: "contain", display: "block" }} />
                      </PCTile>

                      {/* 3. 9:16 Video Reel Tile (Right) */}
                      <VerticalTile rotation="4deg" zIndex={3} style={{ right: "3%" }}>
                        <video src={`${featuredAssets["dolma-aunti-momos"].reel}#t=0.1`} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </VerticalTile>
                    </div>
                  )}
                </motion.div>
              </Link>

              {/* Details Column */}
              <div className="work-details">
                <span className="work-client">{project.client}</span>
                <h3 className="work-title">
                  <Link href={`/portfolio/${project.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {project.title}
                  </Link>
                </h3>
                <p className="work-summary">{project.summary}</p>
                
                <div className="work-tags">
                  {project.tags.map((tag, tagIdx) => (
                    <span className="tag-chip" key={tagIdx}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="work-cta-wrap">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="work-cta"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    View Case Study
                    <svg className="cta-arrow" viewBox="0 0 40 20">
                      <path d="M2 10 C 14 10, 26 10, 34 10" stroke="#1D1D1D" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M28 5 L36 10 L28 15" stroke="#1D1D1D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <svg className="cta-underline" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <motion.path
                        d="M5 8 C 30 2, 70 9, 95 6"
                        initial={{ pathLength: 0 }}
                        animate={hoveredIdx === idx ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 0.35 }}
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Projects Button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
          <Link href="/portfolio" className="btn btn-ghost" style={{ fontSize: "16px", padding: "16px 36px" }}>
            Explore Full Portfolio →
          </Link>
        </div>
      </div>
    </section>
  );
}
