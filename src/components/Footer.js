"use client";

import Link from "next/link";
import ScrollCrayonLine from "./ScrollCrayonLine";
import HighlightText from "./HighlightText";
import fullLogo from "@/app/full logo.png";

export default function Footer() {
  return (
    <footer style={{ position: "relative", overflow: "hidden" }}>
      {/* Crayon divider line at the very top of footer */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, opacity: 0.15, pointerEvents: "none" }}>
        <ScrollCrayonLine
          path="M0 5 C 300 18, 700 2, 1200 10"
          viewBox="0 0 1200 22"
          width="100%"
          height="22px"
          stroke="var(--ink)"
          strokeWidth={2.5}
          delay={0.1}
        />
      </div>

      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo">
              <img src={fullLogo.src} alt="YENOH Logo" style={{ height: "34px", width: "auto" }} />
            </a>
            <p className="footer-desc">
              We build{" "}
              <HighlightText delay={0.3}>premium visual identities</HighlightText>
              , modern responsive websites, and data-driven ad channels that drive commercial momentum.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-links-col">
              <span className="footer-col-title">Services</span>
              <Link href="/services" className="footer-link">Website Development</Link>
              <Link href="/services" className="footer-link">Branding & Identity</Link>
              <Link href="/services" className="footer-link">Social Media Strategy</Link>
              <Link href="/services" className="footer-link">Performance Ads</Link>
            </div>
            <div className="footer-links-col">
              <span className="footer-col-title">Contact</span>
              <a href="mailto:grow@yenoh.in" className="footer-link">grow@yenoh.in</a>
              <a href="tel:+917986704293" className="footer-link">+91 79867 04293</a>
              <span className="footer-link" style={{ opacity: 0.6 }}>Amritsar, India</span>
            </div>
          </div>
        </div>

        {/* Squiggle divider above copyright */}
        <div style={{ opacity: 0.1, margin: "0 auto", maxWidth: "400px" }}>
          <ScrollCrayonLine
            path="M5 15 C 80 5, 180 25, 280 10 C 340 2, 385 18, 395 12"
            viewBox="0 0 400 30"
            width="100%"
            height="30px"
            stroke="var(--ink)"
            strokeWidth={2}
            delay={0.2}
          />
        </div>

        <div className="footer-bottom">
          <span>© 2026 YENOH. All rights reserved.</span>
          <span>Minimal by design • Sketched by hand</span>
        </div>
      </div>
    </footer>
  );
}
