"use client";

export default function ClientMarquee() {
  const clients = [
    "Punjab Immigration",
    "Dolma Aunti Momos",
    "Golden Hoof",
    "DSIDEIN",
    "Samarth Academy",
    "Chaat King India",
    "First Drive",
    "BDS Blossoms",
    "Elect Punjab",
    "Yug Chintak",
  ];

  return (
    <section className="marquee-section">
      <div className="marquee-container">
        <div className="marquee-track">
          {/* Render twice for seamless looping */}
          {clients.map((client, idx) => (
            <span className="marquee-item" key={`c1-${idx}`}>
              {client} <span className="marquee-sep">•</span>
            </span>
          ))}
          {clients.map((client, idx) => (
            <span className="marquee-item" key={`c2-${idx}`}>
              {client} <span className="marquee-sep">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
