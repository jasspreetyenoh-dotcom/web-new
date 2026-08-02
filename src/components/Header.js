"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header style={{ transform: isScrolled ? "translateY(0)" : "none" }}>
      <div className="container nav-wrap">
        <a href="#" className="logo">
          <svg viewBox="0 0 100 100" fill="none">
            <path d="M20 22 C24 30, 40 55, 46 66 C50 73, 51 80, 50 86" stroke="#1D1D1D" strokeWidth="11" strokeLinecap="round" />
            <path d="M46 66 C58 50, 68 34, 76 20 M70 18 L78 19 L76 30" stroke="#F6C000" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>yenoh</span>
        </a>
        
        <nav className="nav-links" aria-label="Main Navigation">
          <Link href="/portfolio" className="nav-link">
            Work
            <svg className="hover-underline" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M4 6 C 30 2, 70 9, 96 5" />
            </svg>
          </Link>
          <a href="#about" className="nav-link">
            About
            <svg className="hover-underline" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M4 6 C 30 2, 70 9, 96 5" />
            </svg>
          </a>
          <a href="#services" className="nav-link">
            Services
            <svg className="hover-underline" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M4 6 C 30 2, 70 9, 96 5" />
            </svg>
          </a>
          <a href="#process" className="nav-link">
            Process
            <svg className="hover-underline" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M4 6 C 30 2, 70 9, 96 5" />
            </svg>
          </a>
        </nav>
        
        <div className="header-cta">
          <a href="#contact" className="btn">Let's Talk</a>
        </div>
      </div>
    </header>
  );
}
