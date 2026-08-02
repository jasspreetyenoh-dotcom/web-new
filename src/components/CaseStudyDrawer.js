"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { projectsData } from "@/data/projects";

export default function CaseStudyDrawer({ projectId, isOpen, onClose, onNavigateTo }) {
  const data = projectsData[projectId];

  // Disable body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!data) return null;

  // Next project logic
  const projectKeys = Object.keys(projectsData);
  const currentIndex = projectKeys.indexOf(projectId);
  const nextIndex = (currentIndex + 1) % projectKeys.length;
  const nextId = projectKeys[nextIndex];
  const nextData = projectsData[nextId];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cs-overlay active"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.5, ease: [0.85, 0, 0.15, 1] }}
          role="dialog"
          aria-modal="true"
        >
          {/* Sticky header */}
          <div className="cs-nav-header">
            <div className="container cs-nav-header-wrap">
              <button className="cs-close-btn" onClick={onClose} aria-label="Close Case Study">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Close Case Study
              </button>
              <span className="cs-category-badge">{data.industry}</span>
            </div>
          </div>

          <div className="cs-container">
            {/* Hero */}
            <div className="cs-hero-section">
              {data.logo ? (
                <div style={{
                  width: "64px", height: "64px",
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  border: "3px solid var(--ink)",
                  boxShadow: "3px 3.5px 0 var(--ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: "3px",
                  marginBottom: "16px",
                  flexShrink: 0
                }}>
                  <img src={data.logo} alt={`${data.name} Logo`} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                </div>
              ) : (
                <div style={{
                  width: "64px", height: "64px",
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  border: "3px solid var(--ink)",
                  boxShadow: "3px 3.5px 0 var(--ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  fontFamily: "var(--font-headings)",
                  fontWeight: 900,
                  fontSize: "20px",
                  color: "var(--ink)",
                  flexShrink: 0
                }}>
                  {data.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
              <h2 className="cs-title">{data.name}</h2>
              <p className="cs-one-liner">{data.summary}</p>
              
              <div className="cs-hero-mockup">
                <div className="cs-hero-image-wrap">
                  <img
                    src={data.image}
                    alt={`${data.name} Presentation`}
                    onError={(e) => {
                      e.target.src = "/assets/project-immigration.png"; // safe fallback
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Split layout: Brief & Specs */}
            <div className="cs-brief-section">
              <div className="cs-brief-left">
                <h3 className="cs-overview-title">Project Brief</h3>
                
                <div className="cs-challenge-box">
                  <h4>The Challenge</h4>
                  <p className="cs-paragraph">{data.challenge}</p>
                </div>
                
                <div className="cs-solution-box">
                  <h4>Our Solution</h4>
                  <p className="cs-paragraph">{data.solution}</p>
                </div>
              </div>

              <div className="cs-brief-right">
                <h3 className="cs-overview-title">At a Glance</h3>
                
                <div className="cs-spec-list">
                  <div className="cs-spec-item">
                    <span className="cs-spec-label">Duration</span>
                    <span className="cs-spec-value">{data.duration || "N/A"}</span>
                  </div>
                  <div className="cs-spec-item">
                    <span className="cs-spec-label">Category</span>
                    <span className="cs-spec-value">{data.category || "Campaign"}</span>
                  </div>
                  <div className="cs-spec-item">
                    <span className="cs-spec-label">Industry</span>
                    <span className="cs-spec-value">{data.industry || "N/A"}</span>
                  </div>
                </div>

                {data.deliverables && data.deliverables.length > 0 && (
                  <>
                    <h3 className="cs-deliverables-title">What We Delivered</h3>
                    <div className="cs-chips-wrap">
                      {data.deliverables.map((service, index) => (
                        <span className="cs-chip" key={index}>
                          {service}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Metrics */}
            {data.results && data.results.length > 0 && (
              <div className="cs-results-section">
                <h3 className="cs-overview-title" style={{ textAlign: "center", display: "block", width: "100%", borderBottom: "none", marginBottom: "40px" }}>
                  Key Outcomes
                </h3>
                <div className="cs-results-grid">
                  {data.results.map((res, index) => (
                    <div className="cs-result-item" key={index}>
                      <div className="cs-result-val">
                        {res.metric}
                      </div>
                      <div className="cs-result-lbl">{res.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial Quote */}
            {data.testimonial && data.testimonial.quote && (
              <div className="cs-quote-section">
                <p className="cs-quote-text">"{data.testimonial.quote}"</p>
                <span className="cs-quote-author">— {data.testimonial.author}</span>
              </div>
            )}

            {/* Next trigger */}
            <div className="cs-next-footer">
              <span className="cs-next-label">Next Case Study</span>
              <div
                className="cs-next-title"
                onClick={() => {
                  onNavigateTo(nextId);
                }}
              >
                <span>{nextData ? nextData.name : "Next Project"}</span> &rarr;
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
