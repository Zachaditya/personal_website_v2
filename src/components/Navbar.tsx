"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
      <nav
        aria-label="Primary"
        className="rounded-full border border-white/10 bg-[#010304]/60 backdrop-blur-xl px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        <ul className="flex items-center gap-1">
          {/* Brand */}
          <li>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium font-['Fira_Code'] text-white/90 hover:text-white transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              zachaditya
            </Link>
          </li>

          {/* Nav links — anchor links on home, regular links on subpages */}
          {NAV_ITEMS.map((item) => {
            const href = isHome ? item.href : `/${item.href}`;
            const Tag = isHome ? "a" : Link;

            return (
              <li key={item.label}>
                <Tag
                  href={href}
                  className="inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  {item.label}
                </Tag>
              </li>
            );
          })}

          {/* CTA */}
          <li>
            <a
              href="mailto:zachaditya@berkeley.edu"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-[#0D99FF] to-[#A259FF] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Let&apos;s Talk
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
