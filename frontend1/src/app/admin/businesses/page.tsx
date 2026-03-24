"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);

  useEffect(() => {
    fetchAPI("/business")
      .then(setBusinesses)
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="topbar">
        <div>
          <h2 style={{ margin: 0, fontSize: 38, lineHeight: 1 }}>Negocios</h2>
          <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 17 }}>
            Listado completo de clientes y su estado comercial.
          </p>
        </div>
      </div>

      <div className="card">
        <h3 className="section-title">Negocios Registrados</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
          <thead>
            <tr>
              <th style={{ color: "var(--muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "left" }}>Negocio</th>
              <th style={{ color: "var(--muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "left" }}>Plan</th>
              <th style={{ color: "var(--muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "left" }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((biz) => (
              <tr key={biz.id}>
                <td style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{biz.name}</td>
                <td style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{biz.plan_type}</td>
                <td style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {biz.is_active ? <span className="pill ok">Activo</span> : <span className="pill danger">Inactivo</span>}
                </td>
              </tr>
            ))}
            {businesses.length === 0 && (
              <tr>
                <td colSpan={3} style={{ padding: "24px 0", textAlign: "center", color: "var(--muted)" }}>No hay negocios registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
