import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/ui/LenisProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageTransition from "@/components/ui/PageTransition";

// Apfel loaded via @font-face in globals.css (public/fonts/)

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Remade In",
  description: "Remade In",
  icons: {
    icon: '/Remadein_Favicon.png',
    apple: '/Remadein_Favicon.png',
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <LenisProvider>
          {/* Orange scroll progress bar */}
          <ScrollProgress />

          {/* Page wipe transition */}
          <PageTransition />

          {/* Global grain overlay */}
          <div
            aria-hidden
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              pointerEvents: 'none',
              opacity: 0.032,
              mixBlendMode: 'overlay',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '220px',
            }}
          />

          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
