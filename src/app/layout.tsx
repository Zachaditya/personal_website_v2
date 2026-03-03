import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { StarField } from "@/components/StarField";
import PageTransition from "@/components/PageTransition";


const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Ernest Zachary Aditya",
  description: "Personal portfolio of Ernest Zachary Aditya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${jetbrainsMono.variable}`}>
      <body className={jetbrainsMono.className}>
        <StarField />
        <PageTransition>
          <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
        </PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
