"use client";

import Image from "next/image";

export default function ClientMarquee() {
  const clients = [
    { name: "Punjab Immigration", logo: "/logos/punjab-immigration.jpg" },
    { name: "Dolma Aunti Momos", logo: "/logos/dolma-aunti-momos.jpg" },
    { name: "Golden Hoof", logo: "/logos/golden-hoof-travels.png" },
    { name: "Samarth Academy", logo: "/logos/samarth-academy.jpg" },
    { name: "Chaat King India", logo: "/logos/chaat-king-india.jpg" },
    { name: "First Drive", logo: "/logos/first-drive.jpg" },
    { name: "BDS Blossoms", logo: "/logos/bds-blossoms.png" },
    { name: "Elect Punjab", logo: "/logos/elect-punjab.jpg" },
    { name: "Yug Chintak", logo: "/logos/yug-chintak.jpg" },
    { name: "Biinaii Studios", logo: "/logos/biinaii-studios.jpg" },
    { name: "Advocate Amarjeet Singh", logo: "/logos/advocate-amarjeet-singh.jpg" },
    { name: "Books Route", logo: "/logos/books-route.jpg" },
    { name: "Learnmatics", logo: "/logos/learnmatics.jpg" },
    { name: "Harman Sekhon", logo: "/logos/harman-sekhon.jpg" },
  ];

  return (
    <section className="marquee-section" style={{ padding: "60px 0" }}>
      <div className="marquee-container">
        <div className="marquee-track">
          {/* Render twice for seamless looping */}
          {clients.map((client, idx) => (
            <div className="marquee-item" key={`c1-${idx}`} style={{ padding: "0 24px" }}>
              <div style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Image 
                  src={client.logo} 
                  alt={client.name} 
                  fill
                  style={{ objectFit: 'cover' }} 
                  sizes="120px"
                />
              </div>
            </div>
          ))}
          {clients.map((client, idx) => (
            <div className="marquee-item" key={`c2-${idx}`} style={{ padding: "0 24px" }}>
              <div style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Image 
                  src={client.logo} 
                  alt={client.name} 
                  fill
                  style={{ objectFit: 'cover' }} 
                  sizes="120px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
