"use client";

import Link from "next/link";
import ScrollCrayonLine from "./ScrollCrayonLine";
import HighlightText from "./HighlightText";

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
              <svg viewBox="0 0 100 100" fill="none">
                <path d="M20 22 C24 30, 40 55, 46 66 C50 73, 51 80, 50 86" stroke="#1D1D1D" strokeWidth="11" strokeLinecap="round" />
                <path d="M46 66 C58 50, 68 34, 76 20 M70 18 L78 19 L76 30" stroke="#F6C000" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>yenoh</span>
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
              <a href="mailto:hello@yenoh.co" className="footer-link">hello@yenoh.co</a>
              <a href="tel:+919876543210" className="footer-link">+91 98765 43210</a>
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
          <span>© 2026 YENOH Studio. All rights reserved.</span>
          <span>Minimal by design • Sketched by hand</span>
        </div>
      </div>
    </footer>
  );
}
