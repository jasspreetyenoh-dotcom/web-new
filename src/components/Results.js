"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import HighlightText from "./HighlightText";
import ScrollCrayonLine from "./ScrollCrayonLine";
import BlurText from "./BlurText";

function CounterNumber({ value, startTrigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(start + easeProgress * (value - start));
      
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    }

    requestAnimationFrame(updateCount);
  }, [value, startTrigger]);

  return <span>{count}</span>;
}

export default function Results() {
  const metrics = [
    { id: 1, val: 120, label: "Projects Completed", suffix: "+" },
    { id: 2, val: 80, label: "Brands Worked With", suffix: "+" },
    { id: 3, val: 500, label: "Videos Produced", suffix: "+" },
    { id: 4, val: 250, label: "Campaigns Managed", suffix: "+" },
    { id: 5, val: 60, label: "Websites Built", suffix: "+" },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  return (
    <section className="results" ref={sectionRef} style={{ position: "relative", overflow: "hidden" }}>
      {/* Decorative scroll crayon arc across section */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60px", opacity: 0.08, pointerEvents: "none" }}>
        <ScrollCrayonLine
          path="M0 40 C 200 10, 600 55, 1200 20"
          viewBox="0 0 1200 60"
          width="100%"
          height="60px"
          stroke="var(--yellow)"
          strokeWidth={6}
          delay={0.2}
        />
      </div>

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
        >
          <span className="section-tag">
            <svg viewBox="0 0 40 20" style={{ width: "20px", height: "10px", fill: "none", stroke: "var(--ink)", strokeWidth: 3 }}>
              <path d="M2 10 H 38" />
            </svg>
            Our Impact
          </span>
          <h2 className="section-title">
            Agency{" "}
            <HighlightText delay={0.3}>Metrics</HighlightText>
          </h2>
        </motion.div>

        <div className="results-grid">
          {metrics.map((m) => {
            return (
              <motion.div 
                className="result-item" 
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: m.id * 0.1 }}
              >
                <div className="result-num-container">
                  <svg className="result-circle-svg" viewBox="0 0 100 100">
                    <motion.path
                      d="M50 15 C 75 12, 88 30, 85 55 C 82 80, 60 88, 40 85 C 20 82, 12 60, 18 40 C 22 25, 45 15, 60 16"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 + m.id * 0.1 }}
                    />
                  </svg>
                  
                  <span className="result-num">
                    <CounterNumber value={m.val} startTrigger={isInView} />
                    {m.suffix}
                  </span>
                </div>
                <span className="result-label">{m.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
