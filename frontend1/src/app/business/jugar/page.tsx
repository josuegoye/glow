"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";

export default function GamePage() {
  const [config, setConfig] = useState<any>({});
  const [spins, setSpins] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar config y jugadas
    fetchAPI("/game/config")
      .then(setConfig)
      .catch(console.error);

    fetchAPI("/game/spins")
      .then(setSpins)
      .catch(console.error);
  }, []);

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await fetchAPI("/game/config", {
        method: "PUT",
        body: JSON.stringify(config)
      });
      setConfig(updated);
      alert("Configuración de Ruleta guardada con éxito.");
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
          <h2 style={{ margin: 0, fontSize: 36, lineHeight: 1 }}>Jugar - Ruleta Glow</h2>
          <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 17 }}>
            Configura las reglas, premios y mensajes de tu juego interactivo.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
        {/* CONFIGURACIÓN */}
        <div className="card">
          <h3 className="section-title">Configuración del Juego</h3>
          <form onSubmit={handleSaveConfig} style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "var(--muted)" }}>Título Principal</label>
              <input 
                type="text" 
                value={config.title || ""} 
                onChange={e => setConfig({...config, title: e.target.value})} 
                placeholder="Ej. La Ruleta Glow"
                style={{ width: "100%", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", color: "white" }} 
              />
            </div>
            
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "var(--muted)" }}>Regla del Premio (Qué se gana)</label>
              <input 
                type="text" 
                value={config.rule || ""} 
                onChange={e => setConfig({...config, rule: e.target.value})} 
                placeholder="Ej. Descuento del 20%"
                style={{ width: "100%", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", color: "white" }} 
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "var(--muted)" }}>Límite Diario</label>
                <input 
                  type="text" 
                  value={config.daily_limit || ""} 
                  onChange={e => setConfig({...config, daily_limit: e.target.value})} 
                  placeholder="Ej. 50 jugadas"
                  style={{ width: "100%", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", color: "white" }} 
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "var(--muted)" }}>Stock Estimado</label>
                <input 
                  type="text" 
                  value={config.stock || ""} 
                  onChange={e => setConfig({...config, stock: e.target.value})} 
                  placeholder="Ej. 10 premios"
                  style={{ width: "100%", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", color: "white" }} 
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "var(--muted)" }}>Mensaje Ganador</label>
              <input 
                type="text" 
                value={config.winner_message || ""} 
                onChange={e => setConfig({...config, winner_message: e.target.value})} 
                style={{ width: "100%", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid var(--ok)", color: "white" }} 
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "var(--muted)" }}>Mensaje Perdedor</label>
              <input 
                type="text" 
                value={config.loser_message || ""} 
                onChange={e => setConfig({...config, loser_message: e.target.value})} 
                style={{ width: "100%", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,45,45,0.3)", color: "white" }} 
              />
            </div>

            <button type="submit" disabled={isSaving} className="pill" style={{ padding: 14, background: "var(--ok)", color: "#000", border: "none", fontSize: 15, cursor: "pointer", borderRadius: 12, marginTop: 10 }}>
              {isSaving ? "Guardando..." : "Guardar Configuración"}
            </button>
          </form>
        </div>

        {/* JUGADAS */}
        <div className="card">
          <h3 className="section-title">Últimas Jugadas</h3>
          <p style={{ margin: "0 0 16px", color: "var(--muted)", fontSize: 14 }}>
            Historial de interacciones de los clientes en tu juego local.
          </p>

          {spins.length === 0 ? (
            <p style={{ color: "var(--muted)", textAlign: "center", padding: 40 }}>Aún no hay jugadas registradas.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 500, overflowY: "auto" }}>
              {spins.map((s, idx) => (
                <div key={idx} style={{ padding: "12px 16px", borderRadius: 14, background: s.won ? "rgba(31, 122, 90, 0.12)" : "rgba(255,255,255,0.03)", border: "1px solid", borderColor: s.won ? "rgba(31, 122, 90, 0.3)" : "var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: "bold" }}>Tel: {s.phone}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{new Date(s.created_at).toLocaleString()}</div>
                  </div>
                  {s.won ? (
                    <span className="pill ok">¡Ganó! {s.prize_name}</span>
                  ) : (
                    <span className="pill" style={{ background: "rgba(255,255,255,0.1)", color: "var(--muted)" }}>No ganó</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
