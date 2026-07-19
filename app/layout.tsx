import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UJJESHA - Portfolio",
  description: "Building intelligent systems and meaningful technology. Focused on AI, scalable architectures, and community-driven innovation. Let's create something impactful together.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${orbitron.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}

