import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STUDIA — Tu espacio de aprendizaje",
  description: "Organiza tus materiales, practica y aprende a tu ritmo."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
