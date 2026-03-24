"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";

export default function ConfigPage() {
  const [config, setConfig] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAPI("/config")
      .then(setConfig)
      .catch(console.error);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await fetchAPI("/config", {
        method: "PUT",
        body: JSON.stringify(config)
      });
      setConfig(updated);
      alert("Configuración de Módulos guardada con éxito.");
    } catch (error) {
      console.error(error);
      alert("Error al guardar la configuración.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="topbar">
        <div>
          <h2 style={{ margin: 0, fontSize: 36, lineHeight: 1 }}>Configuración</h2>
          <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 17 }}>
            Enciende o apaga módulos del asistente público.
          </p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 600 }}>
        <h3 className="section-title">Módulos Visibles en tu Asistente</h3>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          Los módulos encendidos aparecerán como botones nativos flotantes para tus clientes.
        </p>

        <form onSubmit={handleSave} style={{ display: "grid", gap: 16 }}>
          {[
            { key: "offers", label: "Sistema de Ofertas" },
            { key: "raffle", label: "Módulo de Sorteos" },
            { key: "game", label: "La Ruleta Glow" },
            { key: "chat", label: "Chat con Inteligencia Artificial" },
            { key: "qr", label: "Menú QR Digital (Carta)" },
            { key: "location", label: "Botón a Google Maps" },
            { key: "whatsapp", label: "Botón Contacto a WhatsApp" },
            { key: "schedule", label: "Horarios comerciales" }
          ].map(module => (
            <div key={module.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--line)" }}>
              <span style={{ fontSize: 16 }}>{module.label}</span>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input 
                  type="checkbox" 
                  checked={config[module.key] || false} 
                  onChange={e => setConfig({...config, [module.key]: e.target.checked})}
                  style={{ width: 22, height: 22, accentColor: "var(--brand)", cursor: "pointer" }} 
                />
              </label>
            </div>
          ))}

          <button type="submit" disabled={isSaving} className="pill" style={{ padding: 14, background: "var(--brand)", color: "#fff", border: "none", fontSize: 15, cursor: "pointer", borderRadius: 12, marginTop: 10 }}>
            {isSaving ? "Guardando..." : "Guardar Preferencias"}
          </button>
        </form>
      </div>
    </>
  );
}
