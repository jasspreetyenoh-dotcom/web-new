"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import fullLogo from "@/app/full logo.png";

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
          <img src={fullLogo.src} alt="YENOH Logo" style={{ height: "34px", width: "auto" }} />
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
