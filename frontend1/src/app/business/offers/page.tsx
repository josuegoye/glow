"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";

export default function OffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", price: "", note: "" });

  useEffect(() => {
    fetchAPI("/offers")
      .then(setOffers)
      .catch(console.error);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    try {
      const newOffer = await fetchAPI("/offers", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      setOffers([newOffer, ...offers]);
      setIsModalOpen(false);
      setFormData({ name: "", price: "", note: "" });
    } catch (error) {
      console.error(error);
      alert("Error al crear oferta.");
    }
  };

  return (
    <>
      <div className="topbar">
        <div>
          <h2 style={{ margin: 0, fontSize: 36, lineHeight: 1 }}>Gestionar Ofertas</h2>
          <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 17 }}>
            Las ofertas se mostrarán en tu asistente al instante.
          </p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="pill" style={{ padding: "12px 18px", fontSize: 14, cursor: "pointer", borderRadius: 14, background: "linear-gradient(135deg, var(--red), var(--red2))", color: "white", border: "none" }}>
          Nueva oferta
        </button>
      </div>

      <div className="card">
        <h3 className="section-title">Tus ofertas activas</h3>
        {offers.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>No hay ofertas creadas aún.</p>
        ) : (
          <div style={{ display: "grid", gap: 16 }}>
            {offers.map(o => (
              <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderRadius: 16, border: "1px solid var(--line)", background: "rgba(255,255,255,0.02)" }}>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: 18 }}>{o.name}</h4>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>{o.note}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: "bold", color: "var(--ok)", marginBottom: 4 }}>{o.price}</div>
                  <span className="pill ok">Activa</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.8)", display: "grid", placeItems: "center", zIndex: 100 }}>
          <div className="card" style={{ width: 400, maxWidth: "90%", position: "relative" }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: "none", color: "white", cursor: "pointer", fontSize: 18 }}>x</button>
            <h3 style={{ margin: "0 0 20px" }}>Nueva Oferta</h3>
            <form onSubmit={handleCreate} style={{ display: "grid", gap: 16 }}>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "var(--muted)" }}>Nombre del producto/servicio</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: "100%", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "var(--muted)" }}>Precio (ej. $1.500 o 'Gratis')</label>
                <input type="text" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: "100%", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "var(--muted)" }}>Nota (opcional)</label>
                <input type="text" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} style={{ width: "100%", padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
              </div>
              <button type="submit" className="pill" style={{ padding: 14, background: "var(--ok)", color: "#000", border: "none", fontSize: 15, cursor: "pointer", borderRadius: 12, marginTop: 10 }}>Guardar oferta</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
