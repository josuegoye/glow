import Link from "next/link";
import { ReactNode } from "react";
import "./admin.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">G</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, lineHeight: 1 }}>Glow</h1>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.12em" }}>CEO Admin</p>
          </div>
        </div>

        <div className="menu-label">Vista General</div>
        <nav className="nav-menu">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/businesses">Negocios</Link>
        </nav>
      </aside>

      <main className="main">
        {children}
      </main>
    </div>
  );
}
