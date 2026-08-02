"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MasonryGallery({ items = [] }) {
  const [selectedItem, setSelectedItem] = useState(null);

  if (!items || items.length === 0) return null;

  return (
    <>
      <div style={{
        columnCount: 2,
        columnGap: "24px",
        marginTop: "32px",
        padding: "0 20px"
      }}>
        {/* CSS to make columns responsive */}
        <style>{`
          @media (min-width: 900px) {
            div[style*="columnCount: 2"] {
              column-count: 3 !important;
            }
          }
          @media (max-width: 600px) {
            div[style*="columnCount: 2"] {
              column-count: 1 !important;
            }
          }
        `}</style>

        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            style={{
              breakInside: "avoid",
              marginBottom: "24px",
              position: "relative",
              cursor: "pointer",
              borderRadius: "16px",
              overflow: "hidden",
              border: "2px solid var(--line-color)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              background: "var(--card-bg)"
            }}
            whileHover={{ scale: 0.98, borderColor: "var(--yellow)" }}
            onClick={() => setSelectedItem(item)}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            ) : (
              <img
                src={item.src}
                alt={item.caption || "Project gallery image"}
                style={{ width: "100%", display: "block", objectFit: "cover", minHeight: "150px", background: "#f0f0f0" }}
              />
            )}
            
            {item.caption && (
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                padding: "24px 16px 12px",
                color: "#fff",
                fontFamily: "var(--font-headings)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                pointerEvents: "none"
              }}>
                {item.caption}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(15,15,15,0.95)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px"
            }}
            onClick={() => setSelectedItem(null)}
          >
            <button
              onClick={() => setSelectedItem(null)}
              style={{
                position: "absolute", top: "30px", right: "30px",
                background: "var(--yellow)", border: "2px solid #000",
                width: "44px", height: "44px", borderRadius: "50%",
                fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", zIndex: 2
              }}
            >
              ×
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  playsInline
                  style={{ maxWidth: "100%", maxHeight: "85vh", borderRadius: "16px", border: "none" }}
                />
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.caption}
                  style={{ maxWidth: "100%", maxHeight: "85vh", borderRadius: "16px", border: "none" }}
                />
              )}
              {selectedItem.caption && (
                <p style={{
                  position: "absolute", bottom: "-40px", left: 0, right: 0,
                  textAlign: "center", color: "#fff", fontFamily: "var(--font-headings)",
                  fontSize: "14px", letterSpacing: "0.1em"
                }}>
                  {selectedItem.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
