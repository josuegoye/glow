import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glow Platform",
  description: "Asistente digital y panel del negocio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
