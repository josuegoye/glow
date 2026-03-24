"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    // In a real app we would login. For demo purposes we mock the response or force a mock login.
    fetchAPI("/admin/metrics")
      .then(setMetrics)
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="topbar">
        <div>
          <h2 style={{ margin: 0, fontSize: 38, lineHeight: 1 }}>Panel CEO de Glow</h2>
          <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 17 }}>
            Control general de negocios, ingresos, activaciones y soporte.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="pill ghost" style={{ padding: "12px 16px", borderRadius: 16 }}>Exportar resumen</button>
          <button className="pill primary" style={{ padding: "12px 16px", borderRadius: 16, background: "linear-gradient(135deg, var(--brand), var(--brand-dark))", color: "#fff" }}>
            Crear negocio
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 18, background: "linear-gradient(135deg, rgba(18,18,23,0.96), rgba(30,30,40,0.94))" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", opacity: 0.78 }}>Resumen Ejecutivo</div>
        <h3 style={{ fontSize: 34, margin: "14px 0 8px" }}>Glow opera como plataforma comercial.</h3>
        <p style={{ margin: 0, color: "rgba(255,249,241,0.82)" }}>
          Este panel concentra los indicadores clave: negocios activos, MRR, churn mensual.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 20 }}>
          <div style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: 14 }}>
            <span style={{ display: "block", fontSize: 26, fontWeight: 700 }}>{metrics?.active_businesses || 0}</span>
            <span style={{ fontSize: 12, color: "rgba(255,249,241,0.72)" }}>Negocios activos</span>
          </div>
          <div style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: 14 }}>
            <span style={{ display: "block", fontSize: 26, fontWeight: 700 }}>AR$ {metrics?.mrr ? (metrics.mrr / 1000000).toFixed(2) + "M" : "0"}</span>
            <span style={{ fontSize: 12, color: "rgba(255,249,241,0.72)" }}>MRR estimado</span>
          </div>
          <div style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: 14 }}>
            <span style={{ display: "block", fontSize: 26, fontWeight: 700 }}>{metrics?.churn || 0}%</span>
            <span style={{ fontSize: 12, color: "rgba(255,249,241,0.72)" }}>Churn mensual</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <div className="card">
          <span style={{ display: "block", color: "var(--muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Clientes en riesgo</span>
          <div style={{ fontSize: 34, lineHeight: 1, marginBottom: 10 }}>{metrics?.clients_at_risk || 0}</div>
          <div style={{ fontSize: 13, color: "var(--warn)" }}>Requieren contacto</div>
        </div>
        <div className="card">
          <span style={{ display: "block", color: "var(--muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Ticket Promedio</span>
          <div style={{ fontSize: 34, lineHeight: 1, marginBottom: 10 }}>AR$ {metrics?.average_ticket || 0}</div>
          <div style={{ fontSize: 13, color: "var(--ok)" }}>+6.4% por upgrades</div>
        </div>
        <div className="card">
          <span style={{ display: "block", color: "var(--muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Clics en Ofertas</span>
          <div style={{ fontSize: 34, lineHeight: 1, marginBottom: 10 }}>{metrics?.offer_clicks || 0}</div>
          <div style={{ fontSize: 13, color: "var(--ok)" }}>+22% aperturas</div>
        </div>
      </div>
    </>
  );
}
