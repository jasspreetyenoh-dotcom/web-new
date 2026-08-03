"use client";

export default function ClientMarquee() {
  const clients = [
    "Punjab Immigration",
    "Dolma Aunti Momos",
    "Golden Hoof Travels",
    "Samarth Academy",
    "Chaat King India",
    "First Drive Amritsar",
    "BDS Blossoms",
    "Elect Punjab",
    "Yug Chintak",
    "Biinaii Studios",
    "Advocate Amarjeet Singh",
    "Books Route",
    "Learnmatics",
    "Harman Sekhon",
  ];

  const track = clients.map((name, i) => (
    <span key={i} className="marquee-name-item">
      {name}
      <span className="marquee-divider">✦</span>
    </span>
  ));

  return (
    <section className="marquee-section" style={{ padding: "60px 0", position: "relative", overflow: "hidden" }}>
      <style>{`
        .marquee-container-scoped {
          display: flex;
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          position: relative;
          mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
        }
        .marquee-track-scoped {
          display: flex;
          align-items: center;
          animation: marquee-scroll 45s linear infinite;
          will-change: transform;
        }
        .marquee-track-scoped:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-name-item {
          display: inline-flex;
          align-items: center;
          font-family: 'Satoshi', sans-serif;
          font-size: clamp(28px, 3.5vw, 48px);
          font-weight: 900;
          font-style: normal;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--ink);
          opacity: 0.3;
          transition: opacity 0.35s ease;
          cursor: default;
          padding: 0 4px;
          line-height: 1;
        }
        .marquee-name-item:hover {
          opacity: 1;
          color: var(--ink);
        }
        .marquee-divider {
          display: inline-block;
          margin: 0 28px;
          color: var(--yellow);
          font-size: 18px;
          font-style: normal;
          opacity: 1;
          line-height: 1;
        }
      `}</style>

      <div className="marquee-container-scoped">
        <div className="marquee-track-scoped">
          {track}
          {track}
        </div>
      </div>
    </section>
  );
}
