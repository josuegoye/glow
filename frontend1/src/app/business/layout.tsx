import Link from "next/link";
import { ReactNode } from "react";
import "./business.css";

export default function BusinessLayout({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">G</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, lineHeight: 1 }}>Glow</h1>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Panel del negocio</p>
          </div>
        </div>

        <div className="menu-label">Gestion</div>
        <nav className="nav-menu">
          <Link href="/business">Inicio</Link>
          <Link href="/business/offers">Ofertas</Link>
          <Link href="/business/raffles">Sorteos</Link>
          <Link href="/business/jugar">Jugar</Link>
          <Link href="/business/qr">QR</Link>
          <Link href="/business/bases">Bases</Link>
          <Link href="/business/contactos">Contactos</Link>
        </nav>
        
        <div className="menu-label" style={{ marginTop: 24 }}>Analisis</div>
        <nav className="nav-menu">
          <Link href="/business/config">Configuracion</Link>
        </nav>
      </aside>

      <main className="main">
        {children}
      </main>
    </div>
  );
}
