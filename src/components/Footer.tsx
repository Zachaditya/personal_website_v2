"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, FileText } from "lucide-react";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Zachaditya",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zachary-aditya/",
    icon: Linkedin,
  },
  {
    label: "Resume",
    href: "/RESUME_ErnestAditya_Aetherum.pdf",
    icon: FileText,
  },
];

export function Footer() {
  return (
    <footer className="px-5 pb-10 pt-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-12"
          style={{
            borderImage:
              "linear-gradient(135deg, rgba(13,153,255,0.3), rgba(162,89,255,0.3), rgba(242,78,30,0.3)) 1",
          }}
        >
          {/* Quote */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white sm:text-2xl">
              What I value
            </h3>
            <ul className="mx-auto mt-6 max-w-lg space-y-3 text-sm leading-relaxed text-white/60 sm:text-base">
              <li>Shipping quickly without breaking quality.</li>
              <li>Clear UX for complex systems.</li>
              <li>Pragmatic AI: grounded outputs, measurable impact.</li>
            </ul>
          </div>

          {/* Social links */}
          <div className="mt-10 flex items-center justify-center gap-4">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("/") ? undefined : "_blank"}
                  rel={s.href.startsWith("/") ? undefined : "noreferrer"}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center text-xs text-white/30">
            &copy; {new Date().getFullYear()} Ernest Zachary Aditya
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
