"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import HighlightText from "@/components/HighlightText";
import IntroLoader from "@/components/IntroLoader";
import fullLogo from "@/app/full logo.png";
import ScrollCrayonLine from "@/components/ScrollCrayonLine";

// ─── Contact Data ─────────────────────────────────────────────────────────────
const SOCIALS = [
  { label: "Instagram", handle: "@yenoh.studio", href: "#", iconKey: "instagram", brandColor: "#E1306C" },
  { label: "Facebook",  handle: "Yenoh Studio",  href: "#", iconKey: "facebook",  brandColor: "#1877F2" },
  { label: "YouTube",   handle: "Yenoh",         href: "#", iconKey: "youtube",   brandColor: "#FF0000" },
  { label: "LinkedIn",  handle: "Yenoh Studio",  href: "#", iconKey: "linkedin",  brandColor: "#0A66C2" },
];

const PROJECT_TYPES = [
  "Website Design",
  "Brand Identity",
  "Social Media",
  "Google Ads",
  "Meta Ads",
  "Video Production",
  "Something Else",
];

const BUDGETS = [
  { value: "", label: "Select your budget…" },
  { value: "25-50k",  label: "₹25K – ₹50K" },
  { value: "50-1l",   label: "₹50K – ₹1 Lakh" },
  { value: "1-3l",    label: "₹1L – ₹3 Lakhs" },
  { value: "3l+",     label: "₹3 Lakhs+" },
  { value: "discuss", label: "Let's Discuss" },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "",
    projectTypes: [], budget: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  const toggleType = (t) =>
    setForm((prev) => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(t)
        ? prev.projectTypes.filter((x) => x !== t)
        : [...prev.projectTypes, t],
    }));

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
        <main style={{ background: "var(--paper)", color: "var(--ink)", overflowX: "hidden" }}>

      {/* ── NAVBAR ── */}
      <nav className="contact-nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 5vw",
        backdropFilter: "blur(12px)", background: "rgba(250,249,246,0.85)",
        borderBottom: "1px solid var(--line-color)",
      }}>
        <Link href="/" style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "22px", letterSpacing: "-0.02em", color: "var(--ink)", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <img src={fullLogo.src} alt="YENOH Logo" style={{ height: "34px", width: "auto" }} />
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section className="contact-hero-section" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-start", padding: "100px 5vw 40px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Crayon decorations */}
        <CrayonCornerScribble />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          {/* Eye-brow */}
          <motion.div
            className="contact-eyebrow"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}
          >
            <span style={{ width: 48, height: 3, background: "var(--yellow)", borderRadius: 2, display: "block" }} />
            <span style={{ fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--ink-45)" }}>
              Contact Us
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="contact-hero-h1" style={{
            fontFamily: "var(--font-headings)", fontWeight: 900,
            fontSize: "clamp(52px, 8.5vw, 128px)", lineHeight: 1.0,
            letterSpacing: "-0.03em", textTransform: "uppercase", margin: "0 0 24px",
          }}>
            {["GOT A BIG", "IDEA? LET'S"].map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 * (i + 1) }}>
                {line}
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <HighlightText delay={0.7}>BUILD IT.</HighlightText>
            </motion.div>
          </h1>

          {/* Sub-text */}
          <motion.p className="contact-hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
            style={{ fontSize: "clamp(18px, 2vw, 26px)", color: "var(--ink-70)", maxWidth: 640, lineHeight: 1.55, marginBottom: 40, fontWeight: 500 }}>
            Whether you&apos;re launching a brand, scaling a business, or just exploring—
            we&apos;re ready to listen and make things happen.
          </motion.p>

          {/* Home Screen Signature CTA Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.1 }}
            className="contact-cta-row"
            style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <button onClick={scrollToForm} className="btn" style={{ padding: "16px 40px", fontSize: "16px", cursor: "pointer" }}>
              Let's Talk
              <svg viewBox="0 0 40 20" style={{ width: 32, height: 16, marginLeft: 4 }}>
                <path d="M2 10 C 14 10, 26 10, 34 10" stroke="#1D1D1D" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M28 5 L36 10 L28 15" stroke="#1D1D1D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
          </motion.div>

          {/* Scroll cue — in normal flow, below buttons */}
          <motion.div className="contact-scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, marginTop: 64 }}>
            <span style={{ fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-45)", textTransform: "uppercase" }}>scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              style={{ width: 1.5, height: 40, background: "var(--ink-45)", borderRadius: 2 }} />
          </motion.div>
        </div>
      </section>

      {/* ── CRAYON SECTION DIVIDER ── */}
      <div style={{ padding: "0 5vw", position: "relative", overflow: "visible" }}>
        <ScrollCrayonLine
          path="M0 40 C 80 10, 160 70, 240 30 C 320 -10, 400 60, 480 40 C 560 20, 640 50, 720 35 C 800 20, 880 55, 960 40 C 1040 25, 1120 50, 1200 40"
          viewBox="0 0 1200 80"
          width="100%"
          height="60px"
          stroke="var(--yellow)"
          strokeWidth={5}
          delay={0.1}
          style={{ opacity: 0.7 }}
        />
        <ScrollCrayonLine
          path="M0 55 C 100 25, 200 65, 320 45 C 440 25, 540 60, 660 42 C 780 24, 880 58, 1000 44 C 1100 32, 1150 50, 1200 48"
          viewBox="0 0 1200 80"
          width="100%"
          height="60px"
          stroke="var(--ink)"
          strokeWidth={2}
          delay={0.4}
          style={{ opacity: 0.08, marginTop: "-60px" }}
        />
      </div>

      {/* ── SPLIT: INFO + FORM ── */}
      <section className="contact-form-section" ref={formRef} style={{ padding: "120px 5vw", scrollMarginTop: 80 }}>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
              <div style={{
                maxWidth: 1280, margin: "0 auto",
                display: "grid", gridTemplateColumns: "1fr 1.6fr",
                gap: "5vw", alignItems: "start",
              }}
                className="contact-grid"
              >

                {/* ── LEFT: Contact Info ── */}
                <ContactInfo />

                {/* ── RIGHT: Form ── */}
                <ContactForm form={form} setForm={setForm} toggleType={toggleType} onSubmit={handleSubmit} />

              </div>
            </motion.div>
          ) : (
            <SuccessState key="success-view" />
          )}
        </AnimatePresence>
      </section>

      {/* Responsive overrides strictly for mobile screen layout */}
      <style>{`
        @media (max-width: 900px) {
          .contact-grid { 
            grid-template-columns: 1fr !important; 
            gap: 40px !important; 
          }
          .contact-info-section { 
            order: 2 !important; 
          }
        }
        @media (max-width: 640px) {
          .contact-nav {
            padding: 12px 16px !important;
          }
          .contact-hero-section { 
            padding: 104px 20px 48px !important; 
            min-height: auto !important; 
          }
          .contact-eyebrow {
            margin-bottom: 24px !important;
          }
          .contact-hero-h1 { 
            font-size: clamp(36px, 10vw, 56px) !important; 
            margin-bottom: 24px !important;
            letter-spacing: -0.02em !important;
          }
          .contact-hero-sub {
            font-size: 16.5px !important;
            line-height: 1.5 !important;
            margin-bottom: 32px !important;
          }
          .contact-cta-row { 
            flex-direction: column !important; 
            align-items: stretch !important; 
            gap: 12px !important; 
          }
          .contact-cta-row a, .contact-cta-row button { 
            width: 100% !important; 
            justify-content: center !important; 
            padding: 15px 24px !important;
            font-size: 15px !important;
          }
          .contact-scroll-cue {
            display: none !important;
          }
          .contact-form-section {
            padding: 48px 16px 160px !important;
          }
          .contact-form-card { 
            padding: 24px 16px !important; 
            border-radius: 20px !important; 
            box-shadow: 0 4px 24px rgba(0,0,0,0.05) !important;
          }
          .contact-notebook-line {
            display: none !important;
          }
          .contact-form-title {
            padding-left: 0 !important;
            margin-bottom: 24px !important;
            font-size: 22px !important;
          }
          .contact-form-body { 
            padding-left: 0 !important; 
            gap: 24px !important;
          }
          .contact-form-row { 
            grid-template-columns: 1fr !important; 
            gap: 20px !important; 
          }
          .contact-info-h2 {
            font-size: 28px !important;
            margin-bottom: 12px !important;
          }
          .contact-info-sub {
            font-size: 15px !important;
            margin-bottom: 32px !important;
          }
          .contact-info-items {
            margin-bottom: 36px !important;
          }
          .type-chip-btn {
            padding: 8px 14px !important;
            font-size: 13px !important;
          }
          .contact-submit-btn {
            width: 100% !important;
            align-self: stretch !important;
            justify-content: center !important;
            padding: 16px 24px !important;
            font-size: 16px !important;
          }
          .contact-card-item {
            padding: 16px 18px !important;
            border-radius: 18px !important;
            background: linear-gradient(135deg, #FFFDF5 0%, #FFF9E6 100%) !important;
            border: 2.5px solid var(--ink) !important;
            box-shadow: 3.5px 4.5px 0 var(--ink) !important;
          }
          .contact-card-icon {
            width: 44px !important;
            height: 44px !important;
            background: var(--yellow) !important;
            color: var(--ink) !important;
            border: 2px solid var(--ink) !important;
            border-radius: 14px !important;
            box-shadow: 2px 2px 0 var(--ink) !important;
          }
          .contact-card-label {
            font-size: 10.5px !important;
            letter-spacing: 0.16em !important;
            font-weight: 800 !important;
            color: var(--ink-70) !important;
            margin-bottom: 2px !important;
            font-family: var(--font-headings) !important;
          }
          .contact-card-value {
            font-size: 16px !important;
            font-weight: 900 !important;
            color: var(--ink) !important;
            font-family: var(--font-headings) !important;
            word-break: break-word !important;
          }
          .contact-card-arrow {
            width: 32px !important;
            height: 32px !important;
            background: var(--ink) !important;
            color: var(--yellow) !important;
            font-weight: 900 !important;
            font-size: 14px !important;
          }
          .contact-socials-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }
          .social-card-item {
            padding: 12px 10px !important;
            border-radius: 16px !important;
            border: 1.5px solid rgba(0,0,0,0.12) !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03) !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: space-between !important;
            min-height: 94px !important;
          }
          .social-card-item .social-top-row {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            width: 100% !important;
            margin-bottom: 8px !important;
          }
          .social-card-item .contact-card-icon {
            width: 32px !important;
            height: 32px !important;
            border-radius: 10px !important;
            box-shadow: none !important;
          }
          .social-card-item .contact-card-arrow {
            width: 22px !important;
            height: 22px !important;
            font-size: 10px !important;
          }
          .social-card-item .contact-card-value {
            font-size: 13px !important;
            line-height: 1.1 !important;
          }
          .social-card-item .contact-card-label {
            font-size: 10.5px !important;
            line-height: 1.1 !important;
            margin-top: 2px !important;
          }
          .crayon-scribble {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .contact-hero-section { 
            padding: 92px 14px 32px !important; 
          }
          .contact-hero-h1 {
            font-size: 34px !important;
          }
          .contact-form-section {
            padding: 32px 12px 160px !important;
          }
          .contact-form-card { 
            padding: 20px 14px !important; 
          }
        }
      `}</style>
    </main>
      </div>
    </>
  );
}

// ─── Custom Crayon Icons ──────────────────────────────────────────────────────
const CRAYON_ICONS = {
  email: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 6.5L10.8 12.7C11.5 13.2 12.5 13.2 13.2 12.7L21.5 6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 16L10 13.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
      <path d="M17 16L14 13.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  phone: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92C10.51 20.92 2 12.41 2 1.92C2 1.37 2.45 0.92 3 0.92H6C6.55 0.92 7 1.37 7 1.92C7 3.32 7.23 4.67 7.65 5.92C7.77 6.27 7.68 6.67 7.41 6.94L5.61 8.74C7.57 12.6 10.74 15.77 14.6 17.73L16.4 15.93C16.67 15.66 17.07 15.57 17.42 15.69C18.67 16.11 20.02 16.34 21.42 16.34C21.97 16.34 22 16.37 22 16.92Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3C16.5 3.5 18.5 5.5 19 8" stroke="var(--yellow)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 6C15 6.3 15.7 7 16 8" stroke="var(--yellow)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  studio: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C16 17.5 20 13.8 20 9.5C20 5.36 16.42 1.8 12 1.8C7.58 1.8 4 5.36 4 9.5C4 13.8 8 17.5 12 21Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="3.5" fill="var(--yellow)" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  hours: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 7V12L15.5 15.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2.5V4" stroke="var(--yellow)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M21.5 12H20" stroke="var(--yellow)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
};

// ─── Contact Info Panel ────────────────────────────────────────────────────────
function ContactInfo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const items = [
    { icon: CRAYON_ICONS.email,  label: "Email",  value: "grow@yenoh.in",         href: "mailto:grow@yenoh.in" },
    { icon: CRAYON_ICONS.phone,  label: "Phone",  value: "+91 79867 04293",        href: "tel:+917986704293" },
    { icon: CRAYON_ICONS.studio, label: "Studio", value: "Amritsar, Punjab",       href: "#" },
    { icon: CRAYON_ICONS.hours,  label: "Hours",  value: "Mon–Sat · 10 AM – 7 PM", href: null },
  ];

  return (
    <motion.div className="contact-info-section" ref={ref} initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>

      <h2 className="contact-info-h2" style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(32px, 3.5vw, 52px)", textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
        Let&apos;s Start<br />
        <HighlightText delay={0.3}>a Conversation</HighlightText>
      </h2>
      <p className="contact-info-sub" style={{ fontSize: 17, color: "var(--ink-70)", lineHeight: 1.65, marginBottom: 44, maxWidth: 380 }}>
        We&apos;re a small team that cares deeply. Drop us a line and you&apos;ll hear back within 24 hours.
      </p>

      {/* Contact cards list */}
      <div className="contact-info-items" style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 44 }}>
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12 * i + 0.3, duration: 0.5 }}>
            <ContactCardItem item={item} />
          </motion.div>
        ))}
      </div>

      {/* Social links */}
      <div>
        <p style={{ fontFamily: "var(--font-headings)", fontWeight: 800, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--ink-45)", marginBottom: 16 }}>Follow us on</p>
        <div className="contact-socials-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {SOCIALS.map((s, i) => (
            <motion.a key={s.label} href={s.href}
              initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + 0.08 * i, duration: 0.5 }}
              style={{ textDecoration: "none", color: "var(--ink)" }}>
              <SocialRow social={s} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ContactCardItem({ item }) {
  const isLink = Boolean(item.href && item.href !== "#");

  const Content = (
    <div
      className="contact-card-item"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "16px 20px",
        borderRadius: "20px",
        background: "#FFFDF0",
        border: "1.5px solid rgba(0,0,0,0.12)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        cursor: isLink ? "pointer" : "default",
        textDecoration: "none",
        color: "var(--ink)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Icon Pill */}
        <span
          className="contact-card-icon"
          style={{
            width: 44,
            height: 44,
            background: "#FFF",
            border: "1.5px solid rgba(0,0,0,0.12)",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            flexShrink: 0,
          }}
        >
          {item.icon}
        </span>

        <div>
          <div
            className="contact-card-label"
            style={{
              fontFamily: "var(--font-headings)",
              fontWeight: 800,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--ink-45)",
              marginBottom: 3,
            }}
          >
            {item.label}
          </div>
          <div
            className="contact-card-value"
            style={{
              fontFamily: "var(--font-headings)",
              fontWeight: 900,
              fontSize: "clamp(15px, 1.4vw, 18px)",
              color: "var(--ink)",
            }}
          >
            {item.value}
          </div>
        </div>
      </div>

      {isLink && (
        <span
          className="contact-card-arrow"
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.04)",
            color: "var(--ink-45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 900,
            flexShrink: 0,
          }}
        >
          ↗
        </span>
      )}
    </div>
  );

  if (isLink) {
    return (
      <a href={item.href} style={{ textDecoration: "none", width: "100%", display: "block" }}>
        {Content}
      </a>
    );
  }

  return Content;
}

const SOCIAL_ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
};

function SocialRow({ social }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      className="contact-card-item social-card-item"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      style={{
        display: "flex",
        flexDirection: "column",
        justify: "space-between",
        width: "100%",
        padding: "16px 18px",
        borderRadius: "18px",
        background: hov ? "#FFFDF5" : "#FFFFFF",
        border: hov ? "1.5px solid var(--ink)" : "1.5px solid rgba(0,0,0,0.12)",
        boxShadow: hov
          ? "0 8px 24px rgba(0,0,0,0.08)"
          : "0 2px 8px rgba(0,0,0,0.03)",
        cursor: "pointer",
        transition: "all 0.25s ease",
      }}
    >
      {/* Top Row: Icon + Arrow */}
      <div className="social-top-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: 12 }}>
        <motion.span
          className="contact-card-icon"
          animate={{ scale: hov ? 1.08 : 1, rotate: hov ? [0, -4, 4, 0] : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: 36,
            height: 36,
            background: hov ? social.brandColor : "rgba(0,0,0,0.04)",
            color: hov ? "#FFF" : "var(--ink)",
            borderRadius: "10px",
            border: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.25s ease",
            flexShrink: 0,
          }}
        >
          {SOCIAL_ICONS[social.iconKey]}
        </motion.span>

        <motion.span
          className="contact-card-arrow"
          animate={{ x: hov ? 3 : 0, y: hov ? -3 : 0 }}
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: hov ? "var(--ink)" : "rgba(0,0,0,0.03)",
            color: hov ? "var(--yellow)" : "var(--ink-45)",
            border: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 900,
            flexShrink: 0,
            transition: "all 0.25s ease",
          }}
        >
          ↗
        </motion.span>
      </div>

      {/* Bottom Row: Name + Handle */}
      <div>
        <div className="contact-card-value" style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: 14, color: "var(--ink)", lineHeight: 1.1 }}>
          {social.label}
        </div>
        <div className="contact-card-label" style={{ fontFamily: "var(--font-headings)", fontSize: 11.5, color: "var(--ink-70)", fontWeight: 700, marginTop: 3, lineHeight: 1.1 }}>
          {social.handle}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm({ form, setForm, toggleType, onSubmit }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>

      {/* Card shell — the "notebook" */}
      <div className="contact-form-card" style={{
        background: "#FFFDF7",
        border: "2px solid var(--line-color)",
        borderRadius: 28,
        padding: "56px 52px",
        boxShadow: "4px 8px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle left-rule line like lined paper */}
        <div className="contact-notebook-line" style={{ position: "absolute", top: 0, left: 56, bottom: 0, width: 1.5, background: "rgba(246,192,0,0.35)", pointerEvents: "none" }} />

        <h3 className="contact-form-title" style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(22px, 2.5vw, 32px)", textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: 40, paddingLeft: 24 }}>
          Tell us about<br />your project
        </h3>

        <form className="contact-form-body" onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 36, paddingLeft: 24 }}>
          {/* Row 1 */}
          <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <FormInput label="Your Name" required type="text" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Alex Johnson" />
            <FormInput label="Email Address" required type="email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} placeholder="alex@company.com" />
          </div>

          {/* Row 2 */}
          <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <FormInput label="Company / Brand" type="text" value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Acme Inc. (optional)" />
            <FormInput label="Phone Number" type="tel" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
          </div>

          {/* Project type chips */}
          <div>
            <FieldLabel>What do you need?</FieldLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
              {PROJECT_TYPES.map(t => (
                <TypeChip key={t} label={t} selected={form.projectTypes.includes(t)} onClick={() => toggleType(t)} />
              ))}
            </div>
          </div>

          {/* Budget dropdown */}
          <BudgetDropdown value={form.budget} onChange={v => setForm({ ...form, budget: v })} />

          {/* Message */}
          <div>
            <FieldLabel>Project Details</FieldLabel>
            <textarea
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
              placeholder={"Tell us about your goals, timeline, and anything else we should know…"}
              style={{
                width: "100%", minHeight: 160, marginTop: 14,
                padding: "20px 22px", fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ink)",
                background: "rgba(255,255,255,0.7)", border: "2px solid var(--line-color)",
                borderRadius: 18, outline: "none", resize: "vertical", lineHeight: 1.6,
                transition: "border-color 0.25s, box-shadow 0.25s",
              }}
              onFocus={e => { e.target.style.borderColor = "var(--yellow)"; e.target.style.boxShadow = "0 0 0 4px rgba(246,192,0,0.15)"; }}
              onBlur={e => { e.target.style.borderColor = "var(--line-color)"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {/* Submit */}
          <SubmitBtn />
        </form>
      </div>
    </motion.div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function FieldLabel({ children }) {
  return (
    <span style={{ fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-45)", display: "block" }}>
      {children}
    </span>
  );
}

function FormInput({ label, type, required, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: focused ? "var(--ink)" : "var(--ink-45)", display: "block", marginBottom: 10, transition: "color 0.2s" }}>
        {label}{required && <span style={{ color: "var(--yellow)", marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type} required={required} value={value} onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "16px 20px", fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ink)",
          background: "rgba(255,255,255,0.8)", border: `2px solid ${focused ? "var(--yellow)" : "var(--line-color)"}`,
          borderRadius: 16, outline: "none", transition: "border-color 0.25s, box-shadow 0.25s",
          boxShadow: focused ? "0 0 0 4px rgba(246,192,0,0.15)" : "none",
        }}
      />
    </div>
  );
}

function TypeChip({ label, selected, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button className="type-chip-btn" type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "10px 20px", fontFamily: "var(--font-headings)", fontWeight: 700, fontSize: 14,
        borderRadius: 100,
        border: `2px solid ${selected ? "#E8A800" : hov ? "var(--yellow)" : "var(--line-color)"}`,
        background: selected ? "var(--yellow)" : hov ? "var(--yellow-soft)" : "rgba(255,255,255,0.7)",
        color: "var(--ink)",
        cursor: "pointer", transition: "all 0.2s ease",
        display: "flex", alignItems: "center", gap: 8,
        boxShadow: selected ? "0 2px 12px rgba(246,192,0,0.35)" : "none",
      }}>
      {selected && <span style={{ fontSize: 12, fontWeight: 900 }}>✓</span>}
      {label}
    </button>
  );
}

function BudgetDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = BUDGETS.find(b => b.value === value);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <FieldLabel>Budget Range</FieldLabel>
      {/* Trigger */}
      <button type="button" onClick={() => setOpen(!open)}
        style={{
          marginTop: 14, width: "100%", padding: "16px 20px", fontFamily: "var(--font-body)", fontSize: 16,
          color: selected?.value ? "var(--ink)" : "var(--ink-45)",
          background: "rgba(255,255,255,0.8)", border: `2px solid ${open ? "var(--yellow)" : "var(--line-color)"}`,
          borderRadius: 16, outline: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
          transition: "border-color 0.25s, box-shadow 0.25s",
          boxShadow: open ? "0 0 0 4px rgba(246,192,0,0.15)" : "none",
          textAlign: "left",
        }}>
        <span>{selected?.value ? selected.label : "Select your budget…"}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}
          style={{ fontSize: 18, lineHeight: 1, color: "var(--ink-45)" }}>
          ↓
        </motion.span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 50,
              background: "#FFFDF7", border: "2px solid var(--line-color)", borderRadius: 18,
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)", overflow: "hidden",
            }}>
            {BUDGETS.filter(b => b.value !== "").map((b, i) => (
              <button key={b.value} type="button"
                onMouseEnter={() => setHov(b.value)} onMouseLeave={() => setHov(null)}
                onClick={() => { onChange(b.value); setOpen(false); }}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "15px 22px", fontFamily: "var(--font-body)", fontSize: 16,
                  background: hov === b.value ? "var(--yellow-soft)" : value === b.value ? "rgba(246,192,0,0.12)" : "transparent",
                  color: "var(--ink)", border: "none",
                  borderTop: i > 0 ? "1px solid var(--line-color)" : "none",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
                  transition: "background 0.15s",
                }}>
                {b.label}
                {value === b.value && <span style={{ color: "var(--yellow)", fontWeight: 700 }}>✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubmitBtn() {
  return (
    <button className="btn contact-submit-btn" type="submit" style={{ alignSelf: "flex-start", padding: "18px 48px", fontSize: "17px", cursor: "pointer" }}>
      Send Message
      <svg viewBox="0 0 40 20" style={{ width: 32, height: 16, marginLeft: 4 }}>
        <path d="M2 10 C 14 10, 26 10, 34 10" stroke="#1D1D1D" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M28 5 L36 10 L28 15" stroke="#1D1D1D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </button>
  );
}

function CTAButton({ children, primary, onClick, href }) {
  const [hov, setHov] = useState(false);
  const style = {
    padding: "18px 40px", borderRadius: 100, fontFamily: "var(--font-headings)", fontWeight: 900,
    fontSize: "clamp(15px, 1.5vw, 18px)", textTransform: "uppercase", letterSpacing: "0.04em",
    cursor: "pointer", transition: "all 0.25s ease", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10,
    ...(primary
      ? { background: hov ? "var(--yellow)" : "var(--ink)", color: hov ? "var(--ink)" : "var(--paper)", border: "2.5px solid var(--ink)", boxShadow: hov ? "0 8px 32px rgba(246,192,0,0.45)" : "0 4px 16px rgba(0,0,0,0.12)" }
      : { background: "transparent", color: hov ? "var(--ink)" : "var(--ink-70)", border: "2.5px solid var(--line-color)" }),
  };

  if (href) return <a href={href} style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</a>;
  return <button type="button" style={style} onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</button>;
}

// ─── Success State ─────────────────────────────────────────────────────────────
function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
      style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", padding: "80px 40px" }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        style={{ width: 88, height: 88, borderRadius: "50%", background: "var(--yellow)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 40px", fontSize: 40 }}>
        ✓
      </motion.div>
      <h2 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(40px, 6vw, 80px)", textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: 24 }}>
        <HighlightText delay={0.4}>Message Sent!</HighlightText>
      </h2>
      <p style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--ink-70)", lineHeight: 1.6, marginBottom: 48 }}>
        Thanks for reaching out. We&apos;ll review your project and be in touch within <strong>24 hours</strong>.
      </p>
      <Link href="/" className="btn-sm" style={{ padding: "12px 28px", fontSize: "14px" }}>
        Back to Home ←
      </Link>
    </motion.div>
  );
}

// ─── Decorative Crayon Corner Scribbles ───────────────────────────────────────
function CrayonCornerScribble() {
  return (
    <>
      {/* Floating crayon stick — top right (Low Opacity) */}
      <motion.svg
        className="crayon-scribble"
        aria-hidden="true"
        initial={{ opacity: 0, rotate: 10, y: 20 }}
        animate={{ opacity: 0.08, rotate: 25, y: 0 }}
        transition={{ duration: 1.0, delay: 1.2, ease: "easeOut" }}
        style={{ position: "absolute", top: 80, right: "10vw", pointerEvents: "none" }}
        width="42" height="150" viewBox="0 0 42 150"
      >
        {/* Crayon body */}
        <rect x="8" y="12" width="26" height="108" rx="4" fill="#FF6B6B" />
        {/* Tip */}
        <polygon points="8,120 34,120 21,148" fill="#cc4444" />
        {/* Cap */}
        <rect x="8" y="4" width="26" height="12" rx="3" fill="#1E1E1E" opacity="0.5" />
        {/* Label lines */}
        <line x1="14" y1="48" x2="28" y2="48" stroke="white" strokeWidth="2" opacity="0.5" />
        <line x1="14" y1="58" x2="28" y2="58" stroke="white" strokeWidth="1.5" opacity="0.35" />
      </motion.svg>
    </>
  );
}
