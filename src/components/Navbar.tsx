"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const getActiveSection = () => {
      const viewportMiddle = window.scrollY + window.innerHeight / 2;
      let active: string | null = null;
      let minDistance = Infinity;

      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionMiddle = sectionTop + rect.height / 2;
        const distance = Math.abs(viewportMiddle - sectionMiddle);
        if (distance < minDistance) {
          minDistance = distance;
          active = id;
        }
      }
      return active;
    };

    const onScroll = () => setActiveSection(getActiveSection());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none"
      aria-label="Site navigation"
    >
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto w-full max-w-2xl mx-4"
      >
        {/* Pill container */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#010304]/70 backdrop-blur-xl px-4 py-2.5">
          {/* Logo */}
          <a
            href="/"
            className="font-semibold text-sm text-white/80 hover:text-white transition-colors"
          >
            Zach<span style={{ color: "var(--accent-cyan)" }}>.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  activeSection === link.id
                    ? "text-white bg-white/10"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex items-center justify-center w-8 h-8 text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-2xl border border-white/10 bg-[#010304]/70 backdrop-blur-xl px-2 py-2"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm transition-colors ${
                    activeSection === link.id
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
