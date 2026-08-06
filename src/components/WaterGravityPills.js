"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const DEFAULT_ITEMS = [
  { text: "Immigration", bg: "var(--yellow)", color: "var(--ink)" },
  { text: "Education", bg: "#2A2A2A", color: "var(--yellow)" },
  { text: "Restaurants & Cafés", bg: "#FF4B4B", color: "#ffffff" },
  { text: "Political Communication", bg: "var(--paper)", color: "var(--ink)", border: "2px solid var(--ink)" },
  { text: "Software & SaaS", bg: "#2A2A2A", color: "var(--yellow)" },
  { text: "Media & Content", bg: "var(--yellow)", color: "var(--ink)" },
  { text: "Personal Brands", bg: "var(--paper)", color: "var(--ink)", border: "2px solid var(--ink)" },
  { text: "Local Businesses", bg: "#FF4B4B", color: "#ffffff" },
  { text: "Professional Services", bg: "#2A2A2A", color: "var(--yellow)" },
  { text: "Retail & Hospitality", bg: "var(--yellow)", color: "var(--ink)" }
];

export default function WaterGravityPills({ items = DEFAULT_ITEMS, height = 560 }) {
  const containerRef = useRef(null);
  const pillRefs = useRef([]);
  const [positions, setPositions] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 360;
    const containerHeight = height;

    // 1. Create Engine & World
    const { Engine, World, Bodies, Mouse, MouseConstraint, Events, Body } = Matter;
    const engine = Engine.create();

    // Enhanced solver precision for ultra-smooth collisions
    engine.positionIterations = 10;
    engine.velocityIterations = 10;

    // Set water gravity (gentle downward fluid force)
    engine.gravity.x = 0;
    engine.gravity.y = 0.28;

    // 2. Create Static Boundaries (Floor, Left Wall, Right Wall, Ceiling)
    const wallOptions = { isStatic: true, friction: 0.8, restitution: 0.35 };
    const wallThickness = 60;

    const ground = Bodies.rectangle(
      width / 2,
      containerHeight + wallThickness / 2 - 4,
      width * 2,
      wallThickness,
      wallOptions
    );
    const leftWall = Bodies.rectangle(
      -wallThickness / 2 + 2,
      containerHeight / 2,
      wallThickness,
      containerHeight * 2,
      wallOptions
    );
    const rightWall = Bodies.rectangle(
      width + wallThickness / 2 - 2,
      containerHeight / 2,
      wallThickness,
      containerHeight * 2,
      wallOptions
    );
    const ceiling = Bodies.rectangle(
      width / 2,
      -wallThickness / 2 + 2,
      width * 2,
      wallThickness,
      wallOptions
    );

    World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // 3. Measure DOM Pills & Create Rigid Bodies
    const bodies = [];
    const initialPos = [];

    pillRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pWidth = Math.max(rect.width, 76);
      const pHeight = Math.max(rect.height, 32);

      // Stagger starting locations near upper section of container
      const cols = width > 600 ? 3 : 2;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const startX = (width / (cols + 1)) * (col + 1) + (Math.random() * 24 - 12);
      const startY = 35 + row * 52;

      const body = Bodies.rectangle(startX, startY, pWidth, pHeight, {
        chamfer: { radius: pHeight / 2 },
        restitution: 0.45,   // Soft elastic fluid rebound
        friction: 0.45,      // Smooth stacking capability
        frictionAir: 0.038,  // Viscous water resistance
        density: 0.001,      // Buoyant density
        slop: 0.05,
        angle: (Math.random() - 0.5) * 0.2
      });

      body.pillIndex = i;
      body.pillDimensions = { width: pWidth, height: pHeight };
      bodies.push(body);
      initialPos.push({ x: startX - pWidth / 2, y: startY - pHeight / 2, angle: body.angle });
    });

    World.add(engine.world, bodies);
    setPositions(initialPos);
    setIsReady(true);

    // 4. Mouse & Touch Constraint for fluid, rubbery interactive dragging
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.15,
        damping: 0.1,
        render: { visible: false }
      }
    });

    World.add(engine.world, mouseConstraint);

    // 5. Water Buoyancy simulation loop with strict 4-side boundary enforcement
    let frameId;
    let time = 0;

    Events.on(engine, "beforeUpdate", () => {
      time += 0.02;
      bodies.forEach((b, idx) => {
        // Enforce strict upper, lower, left, and right container boundaries
        const minX = b.pillDimensions.width / 2 + 2;
        const maxX = width - b.pillDimensions.width / 2 - 2;
        const minY = b.pillDimensions.height / 2 + 2;
        const maxY = containerHeight - b.pillDimensions.height / 2 - 2;

        if (b.position.y < minY) {
          Body.setPosition(b, { x: b.position.x, y: minY });
          if (b.velocity.y < 0) Body.setVelocity(b, { x: b.velocity.x, y: 0 });
        }
        if (b.position.y > maxY) {
          Body.setPosition(b, { x: b.position.x, y: maxY });
        }
        if (b.position.x < minX) {
          Body.setPosition(b, { x: minX, y: b.position.y });
        }
        if (b.position.x > maxX) {
          Body.setPosition(b, { x: maxX, y: b.position.y });
        }

        // Water wave force effect when not being dragged
        if (!mouseConstraint.body || mouseConstraint.body !== b) {
          const waveX = Math.sin(time + idx * 0.7) * 0.00007 * b.mass;
          const waveY = Math.cos(time * 0.8 + idx * 0.5) * 0.00004 * b.mass;
          Body.applyForce(b, b.position, { x: waveX, y: waveY });
        }
      });
    });

    // 6. Animation frame update loop with sub-stepping for 60fps buttery smoothness
    const updateLoop = () => {
      Engine.update(engine, 1000 / 60 / 2);
      Engine.update(engine, 1000 / 60 / 2);

      const nextPositions = bodies.map((b) => ({
        x: b.position.x - b.pillDimensions.width / 2,
        y: b.position.y - b.pillDimensions.height / 2,
        angle: b.angle
      }));
      setPositions(nextPositions);

      frameId = requestAnimationFrame(updateLoop);
    };

    frameId = requestAnimationFrame(updateLoop);

    return () => {
      cancelAnimationFrame(frameId);
      Events.off(engine);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [items, height]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
        overflow: "hidden",
        borderRadius: "24px",
        background: "linear-gradient(180deg, rgba(246, 192, 0, 0.03) 0%, rgba(30,30,30,0.06) 100%)",
        border: "2px dashed var(--ink)",
        userSelect: "none",
        touchAction: "none"
      }}
    >
      {/* Water Wave Grid Backdrop Effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.06,
          pointerEvents: "none"
        }}
      />



      {/* HTML Pills synced to 2D physics bodies */}
      {items.map((item, i) => {
        const pos = positions[i];
        const hasPos = isReady && pos;
        const text = typeof item === "string" ? item : item.text;
        const bg = typeof item === "string" ? "var(--yellow)" : (item.bg || "var(--yellow)");
        const color = typeof item === "string" ? "var(--ink)" : (item.color || "var(--ink)");
        const border = typeof item === "object" && item.border ? item.border : "none";

        return (
          <div
            key={i}
            ref={(el) => (pillRefs.current[i] = el)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              padding: "8px 18px",
              background: bg,
              color: color,
              border: border,
              borderRadius: "100px",
              fontFamily: "var(--font-headings)",
              fontWeight: 900,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
              cursor: "grab",
              whiteSpace: "nowrap",
              willChange: "transform",
              transform: hasPos
                ? `translate3d(${pos.x}px, ${pos.y}px, 0px) rotate(${pos.angle}rad)`
                : "translate3d(-999px, -999px, 0px)",
              opacity: hasPos ? 1 : 0,
              transition: isReady ? "none" : "opacity 0.3s ease"
            }}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
}
