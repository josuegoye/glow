"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { Tag, MessageSquare, Gift, Info, MapPin, Search } from "lucide-react";
import "./client.css";

export default function PublicAssistantPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [data, setData] = useState<any>(null);
  const [chat, setChat] = useState<{from: 'bot' | 'user', text: string}[]>([
    { from: 'bot', text: 'Hola! Soy tu asistente. ¿En qué te ayudo?' }
  ]);
  const [input, setInput] = useState("");
  const [modalType, setModalType] = useState<string | null>(null);
  const [error, setError] = useState(false);

  // Ruleta states
  const [spinPhone, setSpinPhone] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<{won: boolean, message: string} | null>(null);

  useEffect(() => {
    // Prevent catching static asset requests like favicon
    if (slug?.includes('.')) {
      setError(true);
      return;
    }

    fetchAPI(`/public/${slug}`)
      .then(setData)
      .catch((e) => {
        setError(true);
      });
  }, [slug]);

  if (error) return <div style={{ color: "var(--muted)", padding: 40, textAlign: "center" }}>Asistente no encontrado o inactivo.</div>;
  if (!data) return <div style={{ color: "white", padding: 20 }}>Cargando asistente...</div>;

  const sendMessage = async () => {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput("");
    
    const newChat = [...chat, { from: "user" as const, text: msg }];
    setChat(newChat);

    try {
      const res = await fetchAPI(`/chat/${slug}`, {
        method: "POST",
        body: JSON.stringify({ messages: newChat.map(c => ({ role: c.from === 'bot' ? 'assistant' : 'user', content: c.text })) })
      });
      setChat(prev => [...prev, { from: "bot", text: res.response }]);
    } catch (e) {
      console.error(e);
      setChat(prev => [...prev, { from: "bot", text: "Hubo un error al conectar..." }]);
    }
  };

  const playRoulette = async () => {
    if (!spinPhone) return alert("Ingresa tu teléfono primero");
    setIsSpinning(true);
    setSpinResult(null);
    try {
      const res = await fetchAPI(`/public/${slug}/spin`, {
        method: "POST",
        body: JSON.stringify({ phone: spinPhone })
      });
      // Animación falsa para la ruleta
      setTimeout(() => {
        setSpinResult({ won: res.won, message: res.message });
        setIsSpinning(false);
      }, 1500);
    } catch (e) {
      console.error(e);
      alert("Error al jugar.");
      setIsSpinning(false);
    }
  };

  return (
    <div className="assistant-shell">
      <div className="chat-container">
        {chat.map((c, i) => (
          <div key={i} className={`message ${c.from === 'bot' ? 'msg-bot' : 'msg-user'}`}>
            {c.text}
          </div>
        ))}
      </div>

      <div className="modules-drawer">
        <div className="module-grid">
          {data.modules?.offers && (
            <button className="module-btn" onClick={() => setModalType("offers")}>
              <Tag size={20} color="var(--brand)" /> Ofertas
            </button>
          )}
          {data.modules?.raffle && (
            <button className="module-btn" onClick={() => setModalType("raffle")}>
              <Gift size={20} color="var(--accent)" /> Sorteo
            </button>
          )}
          {data.modules?.game && (
            <button className="module-btn" onClick={() => setModalType("game")}>
              <Search size={20} color="var(--ok)" /> Ruleta
            </button>
          )}
          {data.modules?.schedule && (
            <button className="module-btn" onClick={() => window.alert(data.business.schedule)}>
              <Info size={20} color="var(--muted)" /> Horario
            </button>
          )}
          {data.modules?.location && (
            <button className="module-btn" onClick={() => window.open(data.business.location_url)}>
              <MapPin size={20} color="var(--muted)" /> Ubicación
            </button>
          )}
        </div>

        <div className="chat-input-bar">
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Pregunta algo..." 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <button className="send-btn" onClick={sendMessage}>→</button>
        </div>
      </div>

      {modalType === "offers" && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setModalType(null)}>x</button>
            <h3 style={{ margin: "0 0 20px" }}>Ofertas Activas</h3>
            <div style={{ display: "grid", gap: 12 }}>
              {data.offers?.map((o: any, i: number) => (
                <div key={i} style={{ padding: 16, background: "rgba(255,255,255,0.05)", borderRadius: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h4 style={{ margin: "0 0 4px" }}>{o.name}</h4>
                    <span style={{ fontWeight: "bold", color: "var(--ok)" }}>{o.price}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>{o.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {modalType === "raffle" && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setModalType(null)}>x</button>
            <h3 style={{ margin: "0 0 10px" }}>¡Participá del Sorteo!</h3>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>{data.raffle?.title} - Premio: {data.raffle?.prize}</p>
            <input type="text" placeholder="Tu Nombre" className="chat-input" style={{ width: "100%", marginTop: 16 }} />
            <input type="tel" placeholder="Tu WhatsApp" className="chat-input" style={{ width: "100%", margin: "10px 0 20px" }} />
            <button className="pill" style={{ width: "100%", padding: 14, background: "var(--brand)", border: "none", color: "white", fontSize: 16, borderRadius: 16 }}>
              Anotarme
            </button>
          </div>
        </div>
      )}
      
      {modalType === "game" && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: "center", padding: "40px 20px" }}>
            <button className="modal-close" onClick={() => { setModalType(null); setSpinResult(null); }}>x</button>
            <h3 style={{ margin: "0 0 10px", fontSize: 24 }}>{data.game?.title || "La Ruleta Glow"}</h3>
            <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 30 }}>Girás la ruleta y podes ganar increíbles premios al instante!</p>
            
            <div style={{ 
              width: 140, height: 140, 
              background: "radial-gradient(circle, var(--brand), var(--brand-dark))", 
              borderRadius: 70, margin: "0 auto 30px", display: "grid", placeItems: "center", 
              border: "8px solid rgba(255,255,255,0.1)", color: "white", fontWeight: "bold", fontSize: 20,
              transition: "transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
              transform: isSpinning ? "rotate(1080deg)" : "rotate(0deg)"
            }}>
              GIRAR
            </div>
            
            {spinResult ? (
              <div style={{ animation: "fadeIn 0.3s" }}>
                <h4 style={{ fontSize: 20, color: spinResult.won ? "var(--ok)" : "var(--muted)" }}>{spinResult.message}</h4>
              </div>
            ) : (
              <>
                <input 
                  type="tel" 
                  placeholder="Tu Teléfono" 
                  className="chat-input" 
                  value={spinPhone}
                  onChange={e => setSpinPhone(e.target.value)}
                  style={{ width: "100%", marginBottom: 16 }} 
                  disabled={isSpinning}
                />
                <button onClick={playRoulette} disabled={isSpinning} className="pill" style={{ padding: "14px 32px", background: "var(--ok)", border: "none", color: "#000", fontSize: 16, borderRadius: 16, fontWeight: 900, opacity: isSpinning ? 0.5 : 1 }}>
                  {isSpinning ? "Girando..." : "Jugar (1 Intento)"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
