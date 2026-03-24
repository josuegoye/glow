"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";

export default function RafflesPage() {
  const [raffles, setRaffles] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", prize: "", description: "" });
  const [entries, setEntries] = useState<any[]>([]);
  const [viewingRaffle, setViewingRaffle] = useState<number | null>(null);

  useEffect(() => {
    fetchAPI("/raffles")
      .then(setRaffles)
      .catch(console.error);
  }, []);

  const handleCreateRaffle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.prize) return;
    try {
      const newRaffle = await fetchAPI("/raffles", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      setRaffles([newRaffle, ...raffles]);
      setIsModalOpen(false);
      setFormData({ title: "", prize: "", description: "" });
    } catch (error) {
      console.error(error);
      alert("Error al crear el sorteo.");
    }
  };

  const loadEntries = async (raffleId: number) => {
    try {
      const res = await fetchAPI(`/raffles/${raffleId}/entries`);
      setEntries(res);
      setViewingRaffle(raffleId);
    } catch (e) {
      console.error(e);
      alert("Error al cargar participantes.");
    }
  };

  const drawWinner = async (raffleId: number) => {
    try {
      const winner = await fetchAPI(`/raffles/${raffleId}/draw`, { method: "POST" });
      alert(`🎉 GANADOR: ${winner.name} ${winner.last_name} (${winner.phone})`);
      
      // Update the UI
      setRaffles(raffles.map(r => r.id === raffleId ? { ...r, status: "closed" } : r));
      setViewingRaffle(null);
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Error al sortear. Asegúrate de tener participantes.");
    }
  };

  return (
    <>
      <div className="topbar">
        <div>
          <h2 style={{ margin: 0, fontSize: 36, lineHeight: 1 }}>Sorteos y Concursos</h2>
          <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 17 }}>
            Captura datos de clientes regalando premios.
          </p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="pill" style={{ padding: "12px 18px", fontSize: 14, cursor: "pointer", borderRadius: 14, background: "linear-gradient(135deg, var(--red), var(--red2))", color: "white", border: "none" }}>
          Activar nuevo sorteo
        </button>
      </div>

      <div className="card">
        <h3 className="section-title">Sorteos activos e históricos</h3>
        
        {raffles.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>No hay sorteos configurados.</p>
        ) : (
          <div style={{ display: "grid", gap: 16 }}>
            {raffles.map(r => (
              <div key={r.id} style={{ padding: "16px", borderRadius: 16, border: "1px solid var(--line)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ margin: "0 0 4px", fontSize: 18 }}>{r.title}</h4>
                    <p style={{ margin: "0 0 10px", color: "var(--muted)", fontSize: 14 }}>Premio: {r.prize}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {r.status === "open" ? (
                      <span className="pill ok">Activo</span>
                    ) : (
                      <span className="pill danger">Finalizado</span>
                    )}
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button onClick={() => loadEntries(r.id)} className="pill" style={{ padding: "8px 14px", border: "1px solid var(--line)", background: "var(--bg)", color: "white", cursor: "pointer" }}>
                    Ver Participantes
                  </button>
                  {r.status === "open" && (
                    <button onClick={() => drawWinner(r.id)} className="pill" style={{ padding: "8px 14px", background: "var(--brand)", color: "white", border: "none", cursor: "pointer" }}>
                      ¡Sortear Ganador!
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewingRaffle !== null && (
        <div className="card" style={{ marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 className="section-title" style={{ margin: 0 }}>Lista de Participantes</h3>
            <button onClick={() => setViewingRaffle(null)} style={{ background: "transparent", border: "none", color: "var(--muted)", cursor: "pointer" }}>Cerrar</button>
          </div>
          
          {entries.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Todavía no hay anotados en este sorteo.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", paddingBottom: 12, borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Nombre</th>
                  <th style={{ textAlign: "left", paddingBottom: 12, borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: "12px 0", borderBottom: "1px solid var(--line)" }}>{e.name} {e.last_name}</td>
                    <td style={{ padding: "12px 0", borderBottom: "1px solid var(--line)" }}>{e.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.8)", display: "grid", placeItems: "center", zIndex: 100 }}>
          <div className="card" style={{ width: 400, maxWidth: "90%", position: "relative" }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: "none", color: "white", cursor: "pointer", fontSize: 18 }}>x</button>
            <h3 style={{ margin: "0 0 20px" }}>Nuevo Sorteo</h3>
            <form onSubmit={handleCreateRaffle} style={{ display: "grid", gap: 16 }}>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "var(--muted)" }}>Título (ej. Sorteo Día de la Madre)</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: "100%", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "var(--muted)" }}>Premio a sortear</label>
                <input type="text" required value={formData.prize} onChange={e => setFormData({...formData, prize: e.target.value})} style={{ width: "100%", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "var(--muted)" }}>Descripción opcional</label>
                <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: "100%", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
              </div>
              <button type="submit" className="pill" style={{ padding: 14, background: "var(--brand)", color: "#fff", border: "none", fontSize: 15, cursor: "pointer", borderRadius: 12, marginTop: 10 }}>Crear Sorteo</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
