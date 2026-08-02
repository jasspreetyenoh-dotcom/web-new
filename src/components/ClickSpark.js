"use client";

import { useEffect, useRef } from "react";

export default function ClickSpark({
  sparkColor = "#F6C000", // Mustard yellow by default
  sparkSize = 5,          // Width of the crayon lines
  sparkRadius = 12,       // Increased radius spread scaling
  sparkCount = 6,         // Number of sparks
  duration = 380,         // Slightly longer duration for extra glide
  children
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      particlesRef.current = particlesRef.current.filter((p) => {
        const elapsed = now - p.startTime;
        const progress = elapsed / duration;

        if (progress >= 1) return false;

        // Position update + slightly lower deceleration friction (0.88) to slide further
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.88;
        p.vy *= 0.88;

        // Draw radiating pencil ticks
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = sparkSize * (1 - progress);
        ctx.lineCap = "round";
        ctx.globalAlpha = 1 - progress;

        // Increased multiplier (2.8) to make lines slightly longer
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 2.8, p.y - p.vy * 2.8);
        ctx.stroke();
        ctx.restore();

        return true;
      });

      if (particlesRef.current.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handleClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const startTime = Date.now();

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.35;

        // Decreased initial speed scale for a slower, calmer burst
        const speed = (sparkRadius / 10) * (0.6 + Math.random() * 0.8);

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          startTime,
        });
      }

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {children}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 99999,
        }}
      />
    </div>
  );
}
