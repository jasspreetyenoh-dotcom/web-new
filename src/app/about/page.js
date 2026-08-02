"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BlurText from "@/components/BlurText";
import HighlightText from "@/components/HighlightText";
import dynamic from "next/dynamic";
const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false });
import ScrollCrayonLine from "@/components/ScrollCrayonLine";
import IntroLoader from "@/components/IntroLoader";


const TEAM_MEMBERS = [
  { name: "Jaspreet Singh", title: "Founder & Director", desc: "Leading the creative vision and business strategy to build brands that matter." },
  { name: "Jaspreet Singh", title: "Lead Designer", desc: "Crafting beautiful, functional digital experiences with a keen eye for modern aesthetics." },
  { name: "Jaspreet Singh", title: "Marketing Head", desc: "Driving growth through data-driven campaigns and innovative content strategies." }
];

function TeamIDCard({ person, i }) {
  return (
    <motion.div 
      style={{ 
        width: "100%", 
        height: "100%",
        minHeight: "360px",
        background: "#fff", 
        borderRadius: "20px", 
        boxShadow: "0 20px 50px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        padding: "20px",
        zIndex: 10, 
        cursor: "grab", 
        position: "relative",
        overflow: "hidden"
      }}
      whileTap={{ cursor: "grabbing", scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <div style={{ width: "40px", height: "8px", background: "var(--paper)", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)", marginBottom: "16px", flexShrink: 0 }} />
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexShrink: 0 }}>
        <span style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "16px", color: "var(--ink)", letterSpacing: "0.05em" }}>YENOH</span>
        <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--ink-45)", textTransform: "uppercase", letterSpacing: "0.1em" }}>ID: 00{i+1}</span>
      </div>
      <div style={{ 
        width: "100%", flex: 1, minHeight: 0, background: `linear-gradient(${135 + i*45}deg, var(--yellow) 0%, #FF9900 100%)`, 
        borderRadius: "12px", marginBottom: "16px", position: "relative", overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)"
      }}>
        <div style={{ position: "absolute", top: "-20%", right: "-20%", width: "100%", height: "100%", background: "var(--ink)", borderRadius: "50%", opacity: 0.1, filter: "blur(20px)" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-20%", width: "100%", height: "100%", background: "#fff", borderRadius: "50%", opacity: 0.2, filter: "blur(20px)" }} />
      </div>
      <div style={{ width: "100%", textAlign: "left", display: "flex", flexDirection: "column", gap: "2px", flexShrink: 0 }}>
        <div style={{ fontWeight: 900, fontSize: "clamp(20px, 4vw, 24px)", color: "var(--ink)", fontFamily: "var(--font-headings)", lineHeight: 1.1, textTransform: "uppercase" }}>{person.name}</div>
        <div style={{ fontSize: "clamp(10px, 2vw, 12px)", color: "var(--ink-60)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>{person.title}</div>
      </div>
      <div style={{ width: "100%", height: "16px", marginTop: "16px", display: "flex", gap: "2px", opacity: 0.4, flexShrink: 0 }}>
        {[...Array(30)].map((_, j) => (<div key={j} style={{ flex: Math.random() * 2 + 1, background: "var(--ink)", height: "100%" }} />))}
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [activeCap, setActiveCap] = useState(null);

  return (
    <>
      <IntroLoader
        onComplete={() => setIsIntroFinished(true)}
        pageName="YENOH"
        quote="We build brands that grow."
        iconType="logo"
        accentColor="var(--yellow)"
      />
      <div
        style={{
          opacity: isIntroFinished ? 1 : 0,
          transition: "opacity 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
          pointerEvents: isIntroFinished ? "auto" : "none"
        }}
      >
        <main className="about-page" style={{ minHeight: "100vh", background: "transparent", color: "var(--ink)", paddingBottom: "100px" }}>
          <style>{`
            .responsive-section { padding: 120px 40px; max-width: 1200px; margin: 0 auto; }
            .hero-section { min-height: 90vh; padding: 120px 40px 60px; position: relative; display: flex; align-items: center; justify-content: center; width: 100%; overflow: hidden; }
            .hero-title { font-family: var(--font-headings); font-weight: 900; font-size: clamp(40px, 5.5vw, 76px); line-height: 1.05; text-transform: uppercase; margin-bottom: 24px; margin-top: 0; }
            .hero-desc { font-size: clamp(18px, 2vw, 22px); color: var(--ink-70); max-width: 600px; line-height: 1.5; margin-top: 24px; }
            .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; width: 100%; }
            .story-title { font-family: var(--font-headings); font-weight: 900; font-size: clamp(32px, 5vw, 40px); text-transform: uppercase; line-height: 1.1; margin-bottom: 24px; }
            .story-text { font-size: 20px; color: var(--ink-70); line-height: 1.6; display: flex; flex-direction: column; gap: 24px; }
            .section-title { font-family: var(--font-headings); font-weight: 900; font-size: clamp(36px, 6vw, 48px); text-transform: uppercase; margin-bottom: 60px; text-align: center; }
            .visual-strip-container { display: flex; flex-direction: column; gap: 16px; margin-top: 40px; width: 100%; max-width: 1400px; margin-left: auto; margin-right: auto; }
            .visual-strip { display: flex; align-items: center; padding: 24px 48px; border-radius: 100px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); gap: 32px; transition: all 0.4s ease; cursor: pointer; }
            .visual-strip:hover { background: rgba(255,255,255,0.08); border-color: var(--yellow); transform: translateX(10px); }
            .visual-strip-num { font-size: 32px; font-family: var(--font-headings); font-weight: 900; -webkit-text-stroke: 1px rgba(255,255,255,0.3); color: transparent; transition: all 0.3s ease; display: inline-block; }
            .visual-strip:hover .visual-strip-num { -webkit-text-stroke: 1px var(--yellow); color: rgba(246,192,0,0.1); transform: rotate(-10deg) scale(1.2); }
            .visual-strip-art { width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; position: relative; border-radius: 50%; background: rgba(0,0,0,0.2); }
            .visual-strip-title { font-family: var(--font-headings); font-weight: 900; font-size: 28px; text-transform: uppercase; margin: 0; letter-spacing: 2px; }
            .diff-header { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; border-bottom: 4px solid var(--ink); padding-bottom: 16px; font-family: var(--font-headings); font-weight: 900; font-size: 20px; text-transform: uppercase; }
            .diff-row { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 20px 0; border-bottom: 1px solid rgba(0,0,0,0.1); font-size: 20px; }
            .industry-tag { padding: 16px 32px; border-radius: 100px; border: 2px solid var(--ink); font-family: var(--font-headings); font-weight: 700; font-size: 18px; text-transform: uppercase; transition: all 0.3s ease; cursor: default; white-space: nowrap; }
            .industry-tag:hover { background: var(--ink); color: var(--paper); transform: scale(1.05); }
            @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            @keyframes marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
            .marquee-track { display: flex; gap: 12px; width: max-content; }
            .anim-left { animation: marquee-left 25s linear infinite; }
            .anim-right { animation: marquee-right 25s linear infinite; }
            .cap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 60px; }
            .team-row { display: flex; align-items: center; gap: 60px; flex-wrap: wrap; }
            .team-card { flex: 1 1 400px; max-width: 500px; height: 500px; border-radius: 32px; border: 2px dashed var(--ink); padding: 16px; position: relative; background-color: rgba(246, 192, 0, 0.08); }
            .cta-section { padding: 160px 40px; background: var(--yellow); color: var(--ink); text-align: center; border-radius: 32px; margin: 0 20px 40px; }
            
            .mobile-only { display: none !important; }
            .desktop-only { display: block; }
            
            .creative-believe-layout { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: minmax(280px, auto); gap: 24px; padding: 40px 0; }
            .c-box { background: var(--paper); border: 1px solid rgba(0,0,0,0.1); border-radius: 32px; padding: 40px; position: relative; overflow: hidden; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; display: flex; flex-direction: column; justify-content: flex-end; }
            .c-box:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 30px 60px rgba(0,0,0,0.3); border-color: transparent; }
            
            .c-box-large { grid-column: span 2; grid-row: span 2; background: var(--yellow); color: var(--ink); padding: 60px; }
            .c-box-wide { grid-column: span 2; grid-row: span 1; }
            .c-box-glass { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: var(--paper); backdrop-filter: blur(10px); }
            .c-box-glass:hover { background: rgba(255,255,255,0.06); border-color: var(--yellow); }
            
            .c-box-title { font-family: var(--font-headings); font-weight: 900; font-size: clamp(24px, 2.5vw, 32px); text-transform: uppercase; margin-bottom: 16px; z-index: 2; position: relative; transition: color 0.4s ease; color: var(--ink); }
            .c-box-glass .c-box-title { color: var(--paper); }
            .c-box:hover .c-box-title { color: var(--yellow); }
            .c-box-large:hover .c-box-title { color: var(--ink); }
            
            .c-box-desc { font-size: 18px; line-height: 1.6; z-index: 2; position: relative; font-weight: 500; color: var(--ink-70); margin: 0; }
            .c-box-large .c-box-desc { font-size: 24px; color: var(--ink-80); line-height: 1.5; }
            .c-box-glass .c-box-desc { color: rgba(255,255,255,0.6); }
            
            .c-box-num { position: absolute; font-family: var(--font-headings); font-weight: 900; font-size: 100px; line-height: 0.8; opacity: 0.03; right: -5px; top: -5px; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1; color: var(--ink); }
            .c-box:hover .c-box-num { transform: scale(1.1) translate(-10px, 10px); opacity: 0.08; }
            .c-box-large .c-box-num { font-size: 180px; opacity: 0.05; right: -10px; top: -10px; }
            .c-box-glass .c-box-num { color: var(--paper); opacity: 0.03; }
            .c-box-glass:hover .c-box-num { opacity: 0.08; }
            
            .c-icon-wrap { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 2; border: 2px solid rgba(0,0,0,0.1); transition: all 0.5s ease; color: var(--ink); margin-bottom: auto; flex-shrink: 0; }
            .c-box-large .c-icon-wrap { width: 80px; height: 80px; border-color: rgba(0,0,0,0.15); }
            .c-box-glass .c-icon-wrap { border-color: rgba(255,255,255,0.15); color: var(--paper); }
            .c-box:hover .c-icon-wrap { background: var(--ink); border-color: transparent; transform: rotate(15deg) scale(1.1); color: var(--yellow); }
            .c-box-large:hover .c-icon-wrap { background: var(--paper); color: var(--ink); }
            .c-box-glass:hover .c-icon-wrap { background: var(--yellow); color: var(--ink); }
            
            .mobile-extreme { display: flex; flex-direction: column; width: 100vw; margin-left: -50vw; left: 50%; position: relative; overflow: hidden; background: var(--ink); margin-top: 40px; }
            
            .poster-1 { background: var(--yellow); padding: 40px 24px; position: relative; color: var(--ink); display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
            .p1-num { font-size: 150px; font-weight: 900; line-height: 0.8; position: absolute; top: -10px; left: -10px; color: rgba(0,0,0,0.05); transform: rotate(-5deg); font-family: var(--font-headings); pointer-events: none; z-index: 1; }
            .p1-spin { width: 60px; height: 60px; position: absolute; right: 20px; top: 20px; z-index: 1; opacity: 0.2; }
            .p1-title { font-size: 36px; font-weight: 900; font-family: var(--font-headings); text-transform: uppercase; line-height: 1; margin-bottom: 16px; z-index: 2; position: relative; letter-spacing: -1px; }
            .p1-desc { font-size: 16px; font-weight: 700; line-height: 1.5; z-index: 2; position: relative; max-width: 90%; }
            
            .poster-2 { background: #2A2A2A; padding: 40px 24px; position: relative; color: var(--yellow); display: flex; flex-direction: column; justify-content: flex-start; overflow: hidden; border-top: 2px solid #2A2A2A; }
            .p2-orb { width: 250px; height: 250px; border-radius: 50%; position: absolute; top: -100px; right: -100px; background: radial-gradient(circle, rgba(246,192,0,0.3) 0%, transparent 60%); filter: blur(30px); z-index: 1; pointer-events: none; }
            .p2-num { font-size: 120px; font-weight: 900; color: transparent; -webkit-text-stroke: 2px rgba(246,192,0,0.3); position: absolute; right: 10px; bottom: -20px; z-index: 1; font-family: var(--font-headings); line-height: 1; }
            .p2-title { font-size: 36px; font-weight: 900; font-family: var(--font-headings); text-transform: uppercase; line-height: 1; margin-bottom: 16px; z-index: 2; position: relative; letter-spacing: -1px; color: var(--yellow); }
            .p2-desc { font-size: 16px; font-weight: 400; line-height: 1.6; z-index: 2; position: relative; opacity: 0.9; max-width: 90%; color: var(--paper); }
            
            .poster-3 { background: var(--paper); padding: 40px 24px; position: relative; color: var(--ink); display: flex; flex-direction: column; align-items: flex-start; text-align: left; overflow: hidden; }
            .p3-num { font-size: 120px; font-weight: 900; color: var(--ink); position: absolute; right: -10px; top: -10px; line-height: 0.8; opacity: 0.03; font-family: var(--font-headings); z-index: 1; pointer-events: none; }
            .p3-title { font-size: 36px; font-weight: 900; font-family: var(--font-headings); text-transform: uppercase; line-height: 1; margin-bottom: 16px; z-index: 2; position: relative; letter-spacing: -1px; }
            .p3-title span { color: transparent; -webkit-text-stroke: 2px var(--ink); display: block; margin-bottom: 4px; }
            .p3-desc { font-size: 16px; font-weight: 600; line-height: 1.6; z-index: 2; position: relative; border-left: 4px solid var(--yellow); padding-left: 16px; }
            
            .poster-4 { background: #2A2A2A; padding: 40px 24px; position: relative; color: var(--yellow); display: flex; flex-direction: column; justify-content: center; overflow: hidden; border-top: 2px solid #2A2A2A; }
            .p4-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(246,192,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(246,192,0,0.1) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.5; z-index: 1; }
            .p4-badge { font-family: var(--font-headings); font-weight: 900; font-size: 16px; color: #2A2A2A; background: var(--yellow); padding: 4px 12px; display: inline-block; width: fit-content; margin-bottom: 16px; z-index: 2; position: relative; }
            .p4-title { font-size: 36px; font-weight: 900; font-family: var(--font-headings); text-transform: uppercase; line-height: 1; margin-bottom: 16px; z-index: 2; position: relative; letter-spacing: -1px; color: var(--yellow); }
            .p4-desc { font-size: 16px; font-weight: 500; line-height: 1.6; z-index: 2; position: relative; color: var(--paper); }
            
            .team-lanyard-wrapper { height: 450px; width: 100%; position: relative; background: rgba(0,0,0,0.02); border-radius: 32px; border: 1px dashed rgba(0,0,0,0.1); }
            
            @media (max-width: 900px) {
              .responsive-section { padding: 80px 24px; }
              .hero-section { height: auto; min-height: 85vh; padding: 100px 24px 60px; align-items: flex-start; }
              .hero-desc { font-size: 20px; }
              .story-grid { grid-template-columns: 1fr; gap: 40px; }
              .story-text { font-size: 18px; }
              .section-title { margin-bottom: 40px; }
              .visual-strip { flex-direction: row; border-radius: 100px; padding: 16px 24px; gap: 16px; text-align: left; }
              .visual-strip:hover { transform: translateX(5px); }
              .visual-strip-num { display: block; font-size: 16px; }
              .visual-strip-title { font-size: 20px; }
              .visual-strip-art { width: 48px; height: 48px; }
              .diff-header { grid-template-columns: 1fr; gap: 8px; text-align: center; border-bottom: none; display: none; }
              .diff-row { grid-template-columns: 1fr; gap: 8px; text-align: center; padding: 24px 0; border-bottom: 2px solid rgba(0,0,0,0.05); font-size: 18px; }
              .diff-row > div:first-child { font-size: 16px; margin-bottom: 4px; }
              .industry-tag { padding: 10px 20px; font-size: 14px; }
              .team-row { flex-direction: column !important; gap: 40px; }
              .team-card { height: 350px; width: 100%; max-width: 100%; }
              .team-text-container { text-align: center !important; }
              .cta-section { padding: 80px 24px; margin: 0 16px 24px; border-radius: 24px; }
              .about-page { padding-bottom: 40px !important; }
              .hidden-mobile { display: none !important; }
              .scroll-indicator { display: none !important; }
              .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
              .desktop-only { display: none !important; }
              .mobile-only { display: flex !important; }
              
              .m-hero-title { font-size: clamp(48px, 15vw, 80px); line-height: 0.9; margin: 24px 0; letter-spacing: -2px; text-transform: uppercase; font-family: var(--font-headings); font-weight: 900; }
              .m-hero-title span { display: block; }
              .m-hero-title .outline { color: transparent; -webkit-text-stroke: 2px var(--ink); }
              .m-team-stack { position: relative; height: 380px; width: 100%; display: flex; justify-content: center; margin-top: 40px; perspective: 1000px; }
              
              .m-story-title { font-size: 32px; text-transform: uppercase; font-family: var(--font-headings); font-weight: 900; line-height: 1.1; margin-bottom: 24px; }
              .m-hl { position: relative; display: inline-block; z-index: 1; }
              .m-hl-bg { position: absolute; bottom: 4px; left: -4px; right: -4px; height: 20px; background: var(--yellow); z-index: -1; transform-origin: left; }
            }
            @keyframes draw-path { to { stroke-dashoffset: 0; } }
            .svg-draw { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw-path 1.5s cubic-bezier(0.76, 0, 0.24, 1) forwards; }
            .random-rotate:nth-child(even) { transform: rotate(1.5deg); }
            .random-rotate:nth-child(odd) { transform: rotate(-1deg); }
            .random-rotate:nth-child(3n) { transform: rotate(0.5deg); }
          `}</style>

      {/* 1. HERO */}
      <section className="hero-section" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingBottom: "120px", paddingTop: "80px" }}>
        {/* Abstract Background Orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "40vw", height: "40vw", background: "var(--ink)", opacity: 0.05, filter: "blur(100px)", borderRadius: "50%", zIndex: -1 }} />
        </div>
        
        {/* Decorative Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.05, zIndex: -1, pointerEvents: "none" }} />
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px", width: "100%", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 2, minWidth: 0, alignItems: "center", textAlign: "center" }} className="hero-grid">
          
          {/* Desktop Only: Typography & Buttons */}
          <div className="desktop-only" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minWidth: 0 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)", padding: "8px 16px", borderRadius: "100px", marginBottom: "32px", width: "fit-content", fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: "14px", textTransform: "uppercase" }}>
              <span style={{ width: "10px", height: "10px", background: "var(--yellow)", borderRadius: "50%" }}></span>
              Creative Marketing Studio
            </motion.div>
            
            <h1 className="hero-title" style={{ margin: 0, padding: 0 }}>
              <BlurText text="We don't chase trends." delay={100} animateBy="words" direction="bottom" />
              <br />
              <BlurText text="We " delay={400} animateBy="words" direction="bottom" />
              <span style={{ position: "relative", display: "inline-block", zIndex: 3, whiteSpace: "nowrap" }}>
                build brands
                <svg viewBox="0 0 200 40" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "110%", height: "80%", zIndex: -1, overflow: "visible" }} preserveAspectRatio="none">
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }} 
                    animate={{ pathLength: 1, opacity: 1 }} 
                    transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                    d="M 5,20 Q 50,30 100,15 T 195,25 Q 150,5 90,10 T 10,25 Q 80,35 150,20" 
                    fill="none" 
                    stroke="var(--yellow)" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              </span>
              <br />
              <BlurText text="that outlast them." delay={600} animateBy="words" direction="bottom" />
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}
              className="hero-desc"
              style={{ marginTop: "32px" }}
            >
              Yenoh is a creative marketing studio helping businesses grow through strategy, design, content, advertising, and technology.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} style={{ display: "flex", gap: "16px", marginTop: "40px", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/portfolio" className="btn" style={{ padding: "16px 32px", fontSize: "16px" }}>
                View Our Work
              </Link>
              <Link href="/contact" className="btn btn-white" style={{ padding: "16px 32px", fontSize: "16px" }}>
                Start a Project
              </Link>
            </motion.div>
          </div>

          {/* Mobile Only: Extreme Hero & Stacked Deck */}
          <div className="mobile-only" style={{ flexDirection: "column", width: "100%", alignItems: "flex-start", textAlign: "left" }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)", padding: "6px 12px", borderRadius: "100px", marginBottom: "24px", width: "fit-content", fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: "12px", textTransform: "uppercase" }}>
              <span style={{ width: "8px", height: "8px", background: "var(--yellow)", borderRadius: "50%" }}></span>
              Creative Studio
            </motion.div>
            
            <h1 className="m-hero-title">
              <motion.span initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 50 }}>We build</motion.span>
              <motion.span initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, type: "spring", stiffness: 50 }} className="outline">Brands</motion.span>
              <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, type: "spring", stiffness: 50 }} style={{ color: "var(--yellow)" }}>that last.</motion.span>
            </h1>
            
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ fontSize: "18px", color: "var(--ink-70)", lineHeight: 1.5, margin: "24px 0 40px" }}>
              Yenoh is a creative marketing studio helping businesses grow through strategy, design, and technology.
            </motion.p>
            
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1, type: "spring" }} style={{ width: "100%" }}>
              <Link href="/contact" className="btn" style={{ width: "100%", padding: "20px", fontSize: "18px", justifyContent: "center" }}>
                Start a Project
              </Link>
            </motion.div>
            
            {/* Stacked Deck Carousel */}
            <div className="m-team-stack">
               {TEAM_MEMBERS.map((person, i) => (
                  <motion.div 
                    key={i} 
                    style={{ position: "absolute", top: i * 20, width: "100%", maxWidth: "320px", height: "360px", zIndex: TEAM_MEMBERS.length - i }}
                    initial={{ rotate: 0, y: 100, opacity: 0 }}
                    animate={{ rotate: (i - 1) * 6, y: 0, opacity: 1, x: (i - 1) * 10 }}
                    transition={{ type: "spring", stiffness: 60, delay: 1.2 + (i * 0.1) }}
                  >
                    <TeamIDCard person={person} i={i} />
                  </motion.div>
               ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
          style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", color: "var(--ink-45)", textTransform: "uppercase", fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", zIndex: 2 }}
          className="scroll-indicator hidden-mobile"
        >
          Scroll to explore
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ width: "20px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 60" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              <path d="M12 0 L12 55 C 15 50, 20 45, 12 55 C 5 50, 0 45, 12 55" stroke="var(--ink-45)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* 1.5 TEAM / LEADERSHIP (PC ONLY) */}
      <section className="responsive-section desktop-only" style={{ position: "relative" }}>
        {/* Crayon decoration for the section */}
        <div style={{ position: "absolute", top: "40px", right: "10%", opacity: 0.2, pointerEvents: "none", display: "none" }}>
          {/* Hidden on mobile for cleaner look */}
          <ScrollCrayonLine
            path="M0 25 C 100 45, 200 5, 300 30"
            viewBox="0 0 300 55"
            width="300px"
            height="55px"
            stroke="var(--yellow)"
            strokeWidth={4}
            delay={0.2}
          />
        </div>

        <h2 className="section-title desktop-only">
          The People Behind The Work
        </h2>
        
        <div className="desktop-only" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", maxWidth: "1200px", margin: "0 auto" }}>
          {TEAM_MEMBERS.map((person, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div className="team-lanyard-wrapper">
                <Lanyard 
                  position={[0, -2.5, 18]} 
                  gravity={[0, -20, 0]} 
                  transparent={true} 
                  instanceId={`team-${i}`}
                  titleText={person.name}
                  subtitleText={person.title}
                />
              </div>

              {/* Text Info Container */}
              <div className="team-text-container" style={{ textAlign: "center" }}>
                <p style={{ fontSize: "20px", color: "var(--ink)", lineHeight: 1.5, margin: 0, fontStyle: "italic", fontWeight: 700, fontFamily: "var(--font-headings)" }}>
                  "{person.desc}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="responsive-section">
        {/* Desktop Story */}
        <div className="story-grid desktop-only">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="story-title">
              Every business has a story.
            </h2>
            <h2 className="story-title" style={{ color: "var(--ink-45)", position: "relative", zIndex: 1 }}>
              Our job is to make sure people <span style={{ position: "relative", color: "var(--ink)" }}>remember
                <svg viewBox="0 0 100 40" style={{ position: "absolute", top: "-20%", left: "-10%", width: "120%", height: "140%", zIndex: -1, overflow: "visible" }} preserveAspectRatio="none">
                  <motion.path 
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeInOut" }}
                    d="M 50,5 C 20,5 5,15 10,25 C 15,35 40,38 70,35 C 95,32 105,20 90,10 C 75,0 40,5 30,15" 
                    fill="none" stroke="var(--yellow)" strokeWidth="3" strokeLinecap="round" 
                  />
                </svg>
              </span> it.
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="story-text">
            <p>
              We started Yenoh because we saw a gap between what agencies were delivering and what businesses actually needed. Too many beautiful brands had no commercial strategy, and too many performance campaigns looked generic.
            </p>
            <p>
              We believe you shouldn't have to choose between stunning aesthetics and measurable business growth. We blend high-end creative craft with sharp strategic thinking to build digital ecosystems that don't just look good—they dominate their category.
            </p>
          </motion.div>
        </div>

        {/* Mobile Story: Highlighter Scrollytelling */}
        <div className="mobile-only" style={{ flexDirection: "column", gap: "40px" }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} className="m-story-title">
            Every business<br/>has a story.
          </motion.h2>
          
          <div style={{ fontSize: "22px", fontWeight: 600, color: "var(--ink-70)", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "32px" }}>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-20%" }}>
              We started Yenoh because we saw a gap between what agencies were delivering and what businesses <span className="m-hl"><span style={{position:'relative', zIndex:2, color:"var(--ink)"}}>actually needed.</span><motion.span className="m-hl-bg" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false, margin: "-20%" }} transition={{ duration: 0.6, ease: "easeOut" }} /></span>
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-20%" }}>
              Too many beautiful brands had no commercial strategy, and too many performance campaigns <span className="m-hl"><span style={{position:'relative', zIndex:2, color:"var(--ink)"}}>looked generic.</span><motion.span className="m-hl-bg" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false, margin: "-20%" }} transition={{ duration: 0.6, ease: "easeOut" }} /></span>
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-20%" }}>
              We believe you shouldn't have to choose between stunning aesthetics and <span className="m-hl"><span style={{position:'relative', zIndex:2, color:"var(--ink)"}}>measurable growth.</span><motion.span className="m-hl-bg" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false, margin: "-20%" }} transition={{ duration: 0.6, ease: "easeOut" }} /></span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE BELIEVE */}
      <section style={{ padding: "120px 40px", background: "var(--ink)", color: "var(--paper)", maxWidth: "100%", position: "relative", overflow: "hidden" }}>
        {/* Background Grid & Scribbles */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(var(--paper) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.05, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "10%", right: "10%", opacity: 0.1, pointerEvents: "none", width: "200px", height: "100px" }}>
           <svg viewBox="0 0 200 100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              <path d="M10,90 C 40,-10 90,80 150,20 C 180,-10 190,50 190,90" fill="none" stroke="var(--yellow)" strokeWidth="6" strokeLinecap="round" />
           </svg>
        </div>
        <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <h2 className="section-title" style={{ color: "var(--yellow)" }}>
            What We Believe
          </h2>
          {/* PC View: Creative Bento Layout */}
          <div className="creative-believe-layout desktop-only">
            
            {/* Box 1: Creativity - Large */}
            <div className="c-box c-box-large">
              <div className="c-box-num">01</div>
              <div className="c-icon-wrap">
                <svg viewBox="0 0 24 24" style={{ width: "50%", height: "50%", overflow: "visible" }} fill="currentColor">
                  <path d="M12 3c.132 5.868 4.132 9.868 10 10-5.868.132-9.868 4.132-10 10-.132-5.868-4.132-9.868-10-10 5.868-.132 9.868-4.132 10-10z" />
                </svg>
              </div>
              <h3 className="c-box-title">Unbound Creativity</h3>
              <p className="c-box-desc">
                We believe in ideas that no one else has. New, better, and bolder ideas should always be used for our brands. Creativity is our ultimate unfair advantage.
              </p>
            </div>

            {/* Box 2: Client Growth */}
            <div className="c-box c-box-glass">
              <div className="c-box-num">02</div>
              <div className="c-icon-wrap">
                <svg viewBox="0 0 24 24" style={{ width: "40%", height: "40%", overflow: "visible" }} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <h3 className="c-box-title">Growth First</h3>
              <p className="c-box-desc">
                The rise and growth of our clients matters the most. Your success is our true focus.
              </p>
            </div>

            {/* Box 3: Transparency */}
            <div className="c-box">
              <div className="c-box-num">03</div>
              <div className="c-icon-wrap">
                <svg viewBox="0 0 24 24" style={{ width: "40%", height: "40%", overflow: "visible" }} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="c-box-title">Absolute Integrity</h3>
              <p className="c-box-desc">
                You matter to us. You should never get overcharged, and never get scammed by anyone.
              </p>
            </div>

            {/* Box 4: Execution */}
            <div className="c-box c-box-wide c-box-glass">
              <div className="c-box-num">04</div>
              <div className="c-icon-wrap">
                <svg viewBox="0 0 24 24" style={{ width: "40%", height: "40%", overflow: "visible" }} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="c-box-title">Flawless Execution</h3>
              <p className="c-box-desc">
                Most importantly: strategy, execution, and implementation matter. Without them, even the best ideas are just dreams.
              </p>
            </div>

          </div>

          {/* Mobile View: Extreme Creative Posters (Condensed) */}
          <div className="mobile-only mobile-extreme">
            
            {/* POSTER 1: CREATIVITY */}
            <div className="poster-1">
              <div className="p1-num">01</div>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="p1-spin">
                <svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" /></svg>
              </motion.div>
              <motion.h3 initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 50 }} viewport={{ once: false, margin: "-10%" }} className="p1-title">
                Unbound<br/>Creativity
              </motion.h3>
              <motion.p initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: false, margin: "-10%" }} className="p1-desc">
                We believe in ideas that no one else has. New, better, and bolder ideas should always be used for our brands. Creativity is our ultimate unfair advantage.
              </motion.p>
            </div>

            {/* POSTER 2: GROWTH */}
            <div className="poster-2">
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="p2-orb" />
              <div className="p2-num">02</div>
              <motion.h3 initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} viewport={{ once: false, margin: "-10%" }} className="p2-title">
                Growth<br/>First
              </motion.h3>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: false, margin: "-10%" }} className="p2-desc">
                The rise and growth of our clients matters the most. Your success is our true focus.
              </motion.p>
            </div>

            {/* POSTER 3: INTEGRITY */}
            <div className="poster-3">
              <div className="p3-num">03</div>
              <motion.h3 initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 50 }} viewport={{ once: false, margin: "-10%" }} className="p3-title">
                <span>Absolute</span><br/>Integrity
              </motion.h3>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: false, margin: "-10%" }} className="p3-desc">
                You matter to us. You should never get overcharged, and never get scammed by anyone.
              </motion.p>
            </div>

            {/* POSTER 4: EXECUTION */}
            <div className="poster-4">
              <div className="p4-grid" />
              <motion.div initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: false, margin: "-10%" }} className="p4-badge">04</motion.div>
              <motion.h3 initial={{ opacity: 0, filter: 'blur(5px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.4 }} viewport={{ once: false, margin: "-10%" }} className="p4-title">
                Flawless<br/>Execution
              </motion.h3>
              <motion.p initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: false, margin: "-10%" }} className="p4-desc">
                Most importantly: strategy, execution, and implementation matter. Without them, even the best ideas are just dreams.
              </motion.p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE YENOH */}
      <section className="responsive-section" style={{ maxWidth: "1000px" }}>
        <h2 className="section-title">
          The Difference
        </h2>
        <>
          {/* DESKTOP VERSION */}
          <div className="desktop-only" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="diff-header">
              <div style={{ color: "var(--ink-45)" }}>Traditional Agencies</div>
              <div style={{ color: "var(--yellow)", textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}>Yenoh</div>
            </div>
            {[
              ["Generic solutions", "Tailored strategies"],
              ["Focus on deliverables", "Focus on business growth"],
              ["Vanity metrics", "Measurable impact"],
              ["Separate services", "Complete digital ecosystem"],
              ["Slow execution", "Agile collaboration"],
            ].map((row, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="diff-row"
              >
                <div style={{ position: "relative", width: "fit-content" }}>
                  <span style={{ color: "var(--ink-70)", opacity: 0.5 }}>{row[0]}</span>
                  <svg viewBox="0 0 200 20" style={{ position: "absolute", top: "50%", left: "-5%", width: "110%", height: "20px", transform: "translateY(-50%)", overflow: "visible", pointerEvents: "none" }} preserveAspectRatio="none">
                    <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }} d="M 5,10 Q 50,5 100,12 T 195,8" fill="none" stroke="#FF4B4B" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{ fontWeight: 600, color: "var(--ink)" }}>{row[1]}</div>
              </motion.div>
            ))}
          </div>

          {/* MOBILE VERSION: Split Cards */}
          <div className="mobile-only" style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
            {[
              ["Generic solutions", "Tailored strategies"],
              ["Focus on deliverables", "Focus on business growth"],
              ["Vanity metrics", "Measurable impact"],
              ["Separate services", "Complete ecosystem"],
              ["Slow execution", "Agile collaboration"],
            ].map((row, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ type: "spring", delay: i * 0.1 }}
                style={{ 
                  display: "flex", flexDirection: "column", borderRadius: "16px", overflow: "hidden", border: "2px solid var(--ink)"
                }}
              >
                {/* Traditional Side */}
                <div style={{ background: "rgba(0,0,0,0.03)", padding: "16px", position: "relative" }}>
                  <div style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "var(--ink-45)", marginBottom: "4px" }}>Traditional</div>
                  <div style={{ position: "relative", width: "fit-content" }}>
                    <span style={{ color: "var(--ink-70)", fontSize: "18px", fontWeight: 700 }}>{row[0]}</span>
                    <svg viewBox="0 0 200 20" style={{ position: "absolute", top: "50%", left: "-5%", width: "110%", height: "20px", transform: "translateY(-50%)", overflow: "visible", pointerEvents: "none" }} preserveAspectRatio="none">
                      <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.2 }} d="M 5,10 Q 50,5 100,12 T 195,8" fill="none" stroke="#FF4B4B" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                {/* Yenoh Side */}
                <div style={{ background: "#2A2A2A", padding: "16px", color: "var(--yellow)", borderTop: "2px solid #2A2A2A" }}>
                  <div style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "var(--yellow)", marginBottom: "4px" }}>Yenoh</div>
                  <div style={{ fontWeight: 900, color: "var(--yellow)", fontSize: "20px", fontFamily: "var(--font-headings)", textTransform: "uppercase", lineHeight: 1.2 }}>{row[1]}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      </section>

      {/* 5. INDUSTRIES WE WORK WITH */}
      <section className="responsive-section" style={{ paddingTop: 0, overflow: "hidden" }}>
        <h2 className="section-title">
          Industries We <HighlightText delay={0.2}>Transform</HighlightText>
        </h2>
        
        {/* DESKTOP VERSION */}
        <div className="desktop-only" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
          {[
            "Immigration", "Education", "Restaurants & Cafés", "Political Communication",
            "Software & SaaS", "Media & Content", "Personal Brands", "Local Businesses",
            "Professional Services", "Retail & Hospitality"
          ].map((ind, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="industry-tag"
            >
              {ind}
            </motion.div>
          ))}
        </div>

        {/* MOBILE VERSION: Interactive Sticker Wall */}
        <div className="mobile-only" style={{ position: "relative", width: "100vw", height: "450px", overflow: "hidden", background: "rgba(0,0,0,0.02)", marginLeft: "-24px" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <div style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "40px", color: "rgba(0,0,0,0.05)", textTransform: "uppercase", textAlign: "center", lineHeight: 1 }}>Drag<br/>Them</div>
          </div>
          <div style={{position: "relative", width: "100%", height: "100%", pointerEvents: "auto"}}>
            {[
              { n: "Immigration", x: 20, y: 30, r: -5, bg: "var(--yellow)", c: "var(--ink)" },
              { n: "Education", x: 140, y: 70, r: 8, bg: "#2A2A2A", c: "var(--yellow)" },
              { n: "Restaurants", x: 50, y: 120, r: -12, bg: "#FF4B4B", c: "#fff" },
              { n: "SaaS", x: 180, y: 160, r: 15, bg: "var(--paper)", c: "var(--ink)" },
              { n: "Real Estate", x: 10, y: 220, r: -8, bg: "#2A2A2A", c: "var(--yellow)" },
              { n: "Retail", x: 160, y: 250, r: 5, bg: "var(--yellow)", c: "var(--ink)" },
              { n: "Media", x: 40, y: 300, r: -10, bg: "#2A2A2A", c: "var(--yellow)" },
              { n: "Politics", x: 150, y: 340, r: 12, bg: "var(--paper)", c: "var(--ink)" },
            ].map((ind, i) => (
              <motion.div 
                key={i} 
                drag 
                dragConstraints={{ left: -50, right: 200, top: -50, bottom: 350 }}
                dragElastic={0.2}
                dragMomentum={true}
                initial={{ x: ind.x, y: ind.y, rotate: ind.r, scale: 0 }}
                whileInView={{ scale: 1 }}
                whileTap={{ scale: 1.1, zIndex: 10, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: i * 0.1 }}
                style={{ 
                  position: "absolute",
                  padding: "12px 24px", 
                  background: ind.bg, 
                  color: ind.c,
                  border: ind.bg === "var(--paper)" ? "2px solid var(--ink)" : "none",
                  borderRadius: "100px", 
                  fontFamily: "var(--font-headings)", 
                  fontWeight: 900, 
                  fontSize: "16px", 
                  textTransform: "uppercase",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  cursor: "grab",
                  whiteSpace: "nowrap",
                  touchAction: "none"
                }}
              >
                {ind.n}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR CAPABILITIES */}
      <section className="responsive-section" style={{ paddingTop: 0 }}>
        <h2 className="section-title">
          Capabilities
        </h2>
        <div className="cap-grid desktop-only">
          {[
            { 
              cat: "Digital", 
              items: ["Website Development", "Landing Pages", "UI/UX Design", "SEO"] 
            },
            { 
              cat: "Marketing", 
              items: ["Google Ads", "Meta Ads", "Performance Marketing", "Google Business Profile"] 
            },
            { 
              cat: "Content", 
              items: ["Social Media Management", "Video Production", "Photography", "Reels", "UGC Content"] 
            },
            { 
              cat: "Branding", 
              items: ["Brand Identity", "Creative Direction", "Campaign Design", "Print & Outdoor Media"] 
            },
            { 
              cat: "Public Relations", 
              items: ["Personal Branding", "Political Campaigns", "Digital PR", "Communication Strategy"] 
            },
          ].map((block, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "24px", textTransform: "uppercase", marginBottom: "24px", paddingBottom: "16px", borderBottom: "2px solid var(--ink)", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "12px", height: "12px", background: "var(--yellow)", borderRadius: "50%", display: "inline-block" }}></span>
                {block.cat}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {block.items.map((item, idx) => (
                  <li key={item} style={{ fontSize: "18px", color: "var(--ink-70)", display: "flex", alignItems: "center", gap: "12px" }}>
                    <svg viewBox="0 0 24 24" style={{ width: "20px", height: "20px", flexShrink: 0, overflow: "visible" }}>
                      <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }} d="M 4,12 L 10,18 L 22,4" fill="none" stroke="var(--yellow)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* MOBILE VERSION: Accordion */}
        <div className="mobile-only" style={{ flexDirection: "column", gap: "16px" }}>
          {[
            { cat: "Digital", items: ["Website Development", "Landing Pages", "UI/UX Design", "SEO"] },
            { cat: "Marketing", items: ["Google Ads", "Meta Ads", "Performance Marketing", "Google Business Profile"] },
            { cat: "Content", items: ["Social Media Management", "Video Production", "Photography", "Reels", "UGC Content"] },
            { cat: "Branding", items: ["Brand Identity", "Creative Direction", "Campaign Design", "Print & Outdoor Media"] },
            { cat: "Public Relations", items: ["Personal Branding", "Political Campaigns", "Digital PR", "Communication Strategy"] },
          ].map((block, i) => (
             <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: activeCap === i ? "#2A2A2A" : "rgba(0,0,0,0)", borderRadius: "16px", overflow: "hidden", transition: "all 0.3s", border: activeCap === i ? "2px solid #2A2A2A" : "2px solid rgba(0,0,0,0.1)" }}
             >
                <div 
                  onClick={() => setActiveCap(activeCap === i ? null : i)}
                  style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: activeCap === i ? "var(--yellow)" : "var(--ink)" }}
                >
                  <h3 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "20px", textTransform: "uppercase", margin: 0 }}>{block.cat}</h3>
                  <motion.div animate={{ rotate: activeCap === i ? 45 : 0 }} style={{ fontSize: "32px", fontWeight: 300, lineHeight: 1, marginTop: "-4px" }}>+</motion.div>
                </div>
                <motion.div 
                  initial={false}
                  animate={{ height: activeCap === i ? "auto" : 0, opacity: activeCap === i ? 1 : 0 }}
                  style={{ overflow: "hidden" }}
                >
                  <ul style={{ listStyle: "none", padding: "0 24px 24px 24px", margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                    {block.items.map((item) => (
                      <li key={item} style={{ fontSize: "16px", color: activeCap === i ? "var(--paper)" : "var(--ink-70)", display: "flex", alignItems: "center", gap: "12px" }}>
                        <svg viewBox="0 0 24 24" style={{ width: "16px", height: "16px", flexShrink: 0, overflow: "visible" }}>
                          <path d="M 4,12 L 10,18 L 22,4" fill="none" stroke={activeCap === i ? "var(--yellow)" : "var(--ink)"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
             </motion.div>
          ))}
        </div>
      </section>

      {/* 7. STUDIO PHILOSOPHY */}
      <section className="responsive-section" style={{ maxWidth: "900px", textAlign: "center", paddingTop: 0, position: "relative" }}>
        {/* Massive hand-drawn quotes */}
        <div style={{ position: "absolute", top: "-40px", left: "10%", fontSize: "160px", color: "var(--yellow)", opacity: 0.2, fontFamily: "var(--font-headings)", lineHeight: 1, pointerEvents: "none", transform: "rotate(-10deg)" }}>"</div>
        <div style={{ position: "absolute", bottom: "-60px", right: "10%", fontSize: "160px", color: "var(--yellow)", opacity: 0.2, fontFamily: "var(--font-headings)", lineHeight: 1, pointerEvents: "none", transform: "rotate(10deg)" }}>"</div>
        
        <h2 style={{ position: "relative", zIndex: 2, fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1.2, textTransform: "uppercase", marginBottom: "40px" }}>
          Good marketing gets attention. <br />
          <HighlightText delay={0.2}>Great marketing</HighlightText> earns trust.
        </h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} style={{ position: "relative", zIndex: 2, fontSize: "24px", color: "var(--ink-70)", lineHeight: 1.6, maxWidth: "700px", margin: "0 auto" }}>
          At Yenoh, we blend strategy, creativity, technology, and storytelling to create work that not only looks exceptional but delivers meaningful business outcomes.
        </motion.p>
      </section>


      {/* 9. LET'S BUILD SOMETHING */}
      {/* 9. LET'S BUILD SOMETHING */}
      <section className="cta-section" style={{ position: "relative", border: "4px dashed rgba(0,0,0,0.1)", backgroundImage: "radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
        
        {/* Desktop CTA */}
        <div className="desktop-only">
          <h2 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(40px, 8vw, 100px)", textTransform: "uppercase", lineHeight: 1.1, marginBottom: "40px", maxWidth: "1000px", margin: "0 auto 40px", position: "relative", zIndex: 2 }}>
            Let's Build Something Worth Remembering
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
            <Link href="/portfolio" className="btn btn-white">
              View Our Portfolio
            </Link>
            <div style={{ position: "relative", display: "inline-block" }}>

              <Link href="/contact" className="btn">
                Let's Talk
                <svg viewBox="0 0 40 20" style={{ width: 32, height: 16, marginLeft: 4 }}>
                  <path d="M2 10 C 14 10, 26 10, 34 10" stroke="#1D1D1D" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M28 5 L36 10 L28 15" stroke="#1D1D1D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile CTA: Graffiti Marquee */}
        <div className="mobile-only" style={{ flexDirection: "column", overflow: "hidden", margin: "-80px -24px", padding: "80px 0", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
             <div className="marquee-track anim-left" style={{ opacity: 0.1, whiteSpace: "nowrap" }}>
                {[...Array(5)].map((_,i) => (
                  <div key={i} style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "120px", textTransform: "uppercase", paddingRight: "40px" }}>BUILD SHIT</div>
                ))}
             </div>
             <div className="marquee-track anim-right" style={{ opacity: 0.1, whiteSpace: "nowrap", marginTop: "20px" }}>
                {[...Array(5)].map((_,i) => (
                  <div key={i} style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "120px", textTransform: "uppercase", paddingRight: "40px" }}>THAT LASTS</div>
                ))}
             </div>
          </div>
          
          <h2 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "40px", textTransform: "uppercase", lineHeight: 1, marginBottom: "40px", position: "relative", zIndex: 2, padding: "0 24px", textAlign: "left" }}>
            Let's Build Something <span style={{ color: "var(--ink)", WebkitTextStroke: "1px var(--ink)", WebkitTextFillColor: "transparent" }}>Worth Remembering</span>
          </h2>
          
          <div style={{ position: "relative", zIndex: 2, padding: "0 24px", width: "100%" }}>
             <Link href="/contact" style={{ display: "flex", width: "100%", background: "#2A2A2A", border: "2px solid #2A2A2A", color: "var(--yellow)", padding: "24px", borderRadius: "20px", alignItems: "center", justifyContent: "space-between", textDecoration: "none", fontSize: "24px", fontFamily: "var(--font-headings)", fontWeight: 900, textTransform: "uppercase", transition: "transform 0.2s" }} className="mobile-cta-btn">
                Let's Talk
                <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
                  <svg viewBox="0 0 24 24" style={{ width: "32px", height: "32px" }}>
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="var(--yellow)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </motion.div>
             </Link>
          </div>
        </div>
      </section>

    </main>
      </div>
    </>
  );
}
