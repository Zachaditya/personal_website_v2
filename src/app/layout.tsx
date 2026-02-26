import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { StarField } from "@/components/StarField";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
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
    <html lang="en" className={outfit.variable}>
      <body className={outfit.className}>
        <StarField />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
