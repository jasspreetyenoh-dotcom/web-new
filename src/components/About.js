"use client";

import { motion } from "framer-motion";
import BlurText from "./BlurText";
import HighlightText from "./HighlightText";
import ScrollCrayonLine from "./ScrollCrayonLine";

export default function About() {
  return (
    <section className="about" id="about" style={{ position: "relative", overflow: "hidden" }}>
      {/* Decorative crayon doodle lines in the section */}
      <div style={{ position: "absolute", top: "40px", right: "0", width: "200px", opacity: 0.18, pointerEvents: "none" }}>
        <ScrollCrayonLine
          path="M20 50 C 80 20, 120 70, 180 40"
          viewBox="0 0 200 80"
          height="80px"
          stroke="var(--yellow)"
          strokeWidth={5}
          delay={0.4}
        />
      </div>
      <div style={{ position: "absolute", bottom: "20px", left: "10px", width: "160px", opacity: 0.12, pointerEvents: "none" }}>
        <ScrollCrayonLine
          path="M10 20 C 50 50, 100 10, 150 40"
          viewBox="0 0 160 60"
          height="60px"
          stroke="var(--ink)"
          strokeWidth={3}
          delay={0.7}
        />
      </div>

      <div className="container about-grid">
        <motion.div
          className="about-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2>
            <BlurText text="We don't create" delay={100} animateBy="words" direction="bottom" />
            {" "}
            <HighlightText delay={0.6}>content.</HighlightText>
          </h2>
          <p style={{ marginTop: "16px" }}>
            <BlurText text="We build brands people remember." delay={400} animateBy="words" direction="bottom" />
          </p>
        </motion.div>
        
        <motion.div
          className="about-right"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <p>
            YENOH is a boutique digital studio specializing in{" "}
            <HighlightText delay={0.5}>brand transformation</HighlightText>.
            {" "}We partner with founders who value craft, speed, and creative edge. By refusing templated solutions, we design{" "}
            <HighlightText delay={0.8}>visual identities</HighlightText>{" "}
            and high-performing digital systems that stick in people's minds.
          </p>
          <p>
            From the initial{" "}
            <HighlightText delay={1.0}>paper sketch</HighlightText>
            {" "}to optimized code, every detail of our work is refined to drive{" "}
            <HighlightText delay={1.2}>commercial momentum</HighlightText>
            {" "}and establish digital category leadership.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
