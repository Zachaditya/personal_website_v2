import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for hydration scripts; unsafe-eval for dev HMR
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Framer Motion and Tailwind use inline styles
      "style-src 'self' 'unsafe-inline'",
      // next/font serves fonts locally at build time
      "font-src 'self' data:",
      // Next.js image optimization produces data URIs and blob URLs
      "img-src 'self' data: blob:",
      // Formspree for contact form; Vercel vitals for analytics
      "connect-src 'self' https://formspree.io https://vitals.vercel-insights.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
