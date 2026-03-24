"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    fetchAPI("/contacts")
      .then(setContacts)
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="topbar">
        <div>
          <h2 style={{ margin: 0, fontSize: 36, lineHeight: 1 }}>Contactos (CRM)</h2>
          <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 17 }}>
            Listado de personas que interactuaron con tu asistente.
          </p>
        </div>
        <button className="pill" style={{ padding: "12px 18px", fontSize: 14, borderRadius: 14, background: "rgba(255,255,255,0.1)", color: "white", border: "none" }}>
          Exportar CSV
        </button>
      </div>

      <div className="card">
        <h3 className="section-title">Base de datos de potenciales clientes</h3>
        
        {contacts.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>Aún no tienes contactos registrados.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", paddingBottom: 12, borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Nombre</th>
                <th style={{ textAlign: "left", paddingBottom: 12, borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Teléfono</th>
                <th style={{ textAlign: "left", paddingBottom: 12, borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Origen</th>
                <th style={{ textAlign: "left", paddingBottom: 12, borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, idx) => (
                <tr key={idx}>
                  <td style={{ padding: "16px 0", borderBottom: "1px solid var(--line)", fontWeight: 500 }}>{c.name}</td>
                  <td style={{ padding: "16px 0", borderBottom: "1px solid var(--line)" }}>{c.phone}</td>
                  <td style={{ padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
                    <span className="pill" style={{ background: "rgba(255,255,255,0.05)" }}>{c.origin}</span>
                  </td>
                  <td style={{ padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
                    <span className="pill" style={{ color: c.status === 'interested' ? "var(--ok)" : "inherit" }}>
                      {c.status === 'new' ? 'Nuevo' : c.status === 'interested' ? 'Interesado' : c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
