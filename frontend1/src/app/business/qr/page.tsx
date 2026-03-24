"use client";

import QRCode from "react-qr-code";
import { useEffect, useState } from "react";

export default function QRPage() {
  // Hardcoded for demo, normally dynamic based on business slug
  const publicUrl = "http://localhost:3000/glow-cooperativa-centro";

  return (
    <>
      <div className="topbar">
        <div>
          <h2 style={{ margin: 0, fontSize: 36, lineHeight: 1 }}>Tu QR Inteligente</h2>
          <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 17 }}>
            Descargalo y colocalo en tu local físico para digitalizar interacciones.
          </p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 500, margin: "40px auto", textAlign: "center", background: "#fff", color: "#000", padding: "60px 40px" }}>
        <h2 style={{ margin: "0 0 10px", fontSize: 28, color: "var(--brand-dark)" }}>Escaneá y Participá!</h2>
        <p style={{ margin: "0 0 40px", fontSize: 18, color: "#666" }}>Glow Cooperativa Centro</p>
        
        <div style={{ background: "#fff", padding: "20px", display: "inline-block", borderRadius: 24, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
          <QRCode
            value={publicUrl}
            size={240}
            fgColor="#121217"
            bgColor="#ffffff"
          />
        </div>
        
        <p style={{ margin: "40px 0 0", fontSize: 14, color: "#999", textTransform: "uppercase", letterSpacing: "0.1em" }}>Powered by Glow</p>
      </div>

      <div style={{ textAlign: "center" }}>
        <a href={publicUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", color: "var(--brand)", textDecoration: "underline" }}>
          Visitar enlace público: {publicUrl}
        </a>
      </div>
    </>
  );
}
