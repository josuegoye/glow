"use client";

import { useEffect, useState } from "react";

export default function BusinessDashboard() {
  return (
    <>
      <div className="topbar">
        <div>
          <h2 style={{ margin: 0, fontSize: 36, lineHeight: 1 }}>Hola, Glow Cooperativa Centro</h2>
          <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 17 }}>
            Aquí tienes un resumen rápido de la actividad de hoy.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div className="card">
          <span style={{ display: "block", color: "var(--muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Contactos capturados hoy</span>
          <div style={{ fontSize: 34, lineHeight: 1 }}>14</div>
        </div>
        <div className="card">
          <span style={{ display: "block", color: "var(--muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Participantes de ruleta</span>
          <div style={{ fontSize: 34, lineHeight: 1 }}>22</div>
        </div>
        <div className="card">
          <span style={{ display: "block", color: "var(--muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Clics en tus ofertas</span>
          <div style={{ fontSize: 34, lineHeight: 1 }}>48</div>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: 24 }}>
        <h3 className="section-title">Nuevos contactos</h3>
        <p style={{ color: "var(--muted)", marginTop: 0 }}>Últimas personas que interactuaron y dejaron sus datos.</p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, marginTop: 16 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", paddingBottom: 12, borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Nombre</th>
              <th style={{ textAlign: "left", paddingBottom: 12, borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Teléfono</th>
              <th style={{ textAlign: "left", paddingBottom: 12, borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Origen</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "12px 0", borderBottom: "1px solid var(--line)" }}>Juan Pérez</td>
              <td style={{ padding: "12px 0", borderBottom: "1px solid var(--line)" }}>+5491122334455</td>
              <td style={{ padding: "12px 0", borderBottom: "1px solid var(--line)" }}><span className="pill" style={{ background: "rgba(255,45,45,0.1)", color: "var(--red)" }}>Sorteo</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
