"use client";
import HighlightText from "@/components/HighlightText";
import ScrollCrayonLine from "@/components/ScrollCrayonLine";
import Link from "next/link";

import { useState } from "react";
import { motion } from "framer-motion";
import IntroLoader from "@/components/IntroLoader";
import Hero from "@/components/Hero";
import ClientMarquee from "@/components/ClientMarquee";
import About from "@/components/About";
import Services from "@/components/Services";
import FeaturedWork from "@/components/FeaturedWork";
import Results from "@/components/Results";
import Footer from "@/components/Footer";

export default function Home() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  return (
    <>
      {/* 1. Intro Loader */}
      <IntroLoader
        onComplete={() => setIsIntroFinished(true)}
        pageName="YENOH"
        quote="We build brands that grow."
        iconType="logo"
        accentColor="var(--yellow)"
      />

      {/* Main website page content - starts fading in once loader is complete */}
      <div 
        style={{ 
          opacity: isIntroFinished ? 1 : 0, 
          transition: "opacity 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
          pointerEvents: isIntroFinished ? "auto" : "none"
        }}
      >
        <main style={{ paddingBottom: "120px" }}>
          {/* 2. Hero Section */}
          <Hero startTrigger={isIntroFinished} />

          {/* 3. Featured Clients Marquee */}
          <ClientMarquee />

          {/* 4. About Section */}
          <About />

          {/* 5. What We Do */}
          <Services />

          {/* 6. Featured Work */}
          <FeaturedWork />

          {/* 7. Results Section */}
          <Results />

          {/* 8. Final CTA */}
          <section className="final-cta" style={{ position: "relative", overflow: "hidden" }}>
            {/* Background wandering crayon lines */}
            <div style={{ position: "absolute", top: "20px", left: 0, right: 0, opacity: 0.07, pointerEvents: "none" }}>
              <ScrollCrayonLine
                path="M0 20 C 250 5, 600 40, 1200 15"
                viewBox="0 0 1200 50"
                width="100%"
                height="50px"
                stroke="var(--yellow)"
                strokeWidth={5}
                delay={0.1}
              />
            </div>
            <div style={{ position: "absolute", bottom: "20px", left: 0, right: 0, opacity: 0.05, pointerEvents: "none" }}>
              <ScrollCrayonLine
                path="M0 25 C 300 45, 700 5, 1200 30"
                viewBox="0 0 1200 55"
                width="100%"
                height="55px"
                stroke="var(--ink)"
                strokeWidth={3}
                delay={0.4}
              />
            </div>

            <div className="container">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7 }}
                style={{ lineHeight: 1.2 }}
              >
                Let's Build Something{" "}
                <HighlightText delay={0.3}>Worth Remembering.</HighlightText>
              </motion.h2>

              {/* Crayon squiggle below heading */}
              <div style={{ margin: "16px auto 32px auto", width: "280px", opacity: 0.18 }}>
                <ScrollCrayonLine
                  path="M5 20 C 70 5, 150 35, 200 15 C 230 5, 260 25, 275 18"
                  viewBox="0 0 280 40"
                  width="280px"
                  height="40px"
                  stroke="var(--yellow)"
                  strokeWidth={5}
                  delay={0.5}
                />
              </div>

              <div className="cta-buttons">
                <Link href="/portfolio" className="btn btn-ghost">View Portfolio</Link>
                <a href="mailto:grow@yenoh.in" className="btn">Start a Project</a>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
