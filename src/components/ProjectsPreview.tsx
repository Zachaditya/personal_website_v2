"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import TypewriterOnce from "./TypewriterOnce";
import { PROJECTS } from "@/lib/projects";
import { ArrowRight } from "lucide-react";

function parseProjectDate(input: string): Date | null {
  const s = (input ?? "").trim();
  if (!s) return null;

  const parts = s.split(/\s+/);
  if (parts.length >= 2) {
    const year = Number(parts[parts.length - 1]);
    const monthStr = parts.slice(0, parts.length - 1).join(" ");
    if (Number.isFinite(year)) {
      const dt = new Date(`${monthStr} 1, ${year}`);
      if (!Number.isNaN(dt.getTime())) return dt;
    }
  }

  const dt = new Date(s);
  if (!Number.isNaN(dt.getTime())) return dt;
  return null;
}

function dateSortKey(input: string): number {
  const dt = parseProjectDate(input);
  return dt ? dt.getTime() : -Infinity;
}

const sorted = [...PROJECTS].sort(
  (a, b) => dateSortKey(b.date) - dateSortKey(a.date),
);

export function ProjectsPreview() {
  return (
    <section id="projects" className="relative z-10 mt-80 px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            <TypewriterOnce text="Projects" ms={100} triggerOnScroll />
          </h2>
          <p className="mt-2 text-white/60">
            Things I&apos;ve built and shipped
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-15">
          {sorted.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative flex flex-col rounded-2xl border border-white/10 bg-[#0c0e10] p-4 transition-colors hover:bg-[#111315]"
            >
              {/* Status badges - top right */}
              <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-2">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#0ACF83]/30 bg-[#0ACF83]/10 px-2.5 py-1 text-xs font-medium text-[#0ACF83]"
                  >
                    <span className="pulse-dot h-2 w-2 rounded-full bg-[#0ACF83]" />
                    Live
                  </a>
                )}
                {!p.liveUrl && p.wip && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-400">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    In Progress
                  </span>
                )}
                {p.brewing && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-1 text-xs font-medium text-sky-400">
                    <span className="pulse-dot h-2 w-2 rounded-full bg-sky-400" />
                    Brewing Updates
                  </span>
                )}
              </div>

              <span className="text-sm text-white/40">{p.date}</span>

              <h3 className="mt-2 text-sm font-semibold tracking-tight text-white">
                {p.title}
              </h3>

              <p className="mt-1.5 text-xs leading-relaxed text-white/55 line-clamp-2">
                {p.short ?? p.overview ?? ""}
              </p>

              {/* Tags */}
              <div className="mt-2.5 flex flex-wrap gap-1">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={`${p.slug}-${t}`}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-auto pt-3 flex items-center gap-2">
                <Link
                  href={`/projects/${p.slug}`}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
                >
                  Read more
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 transition-colors hover:text-white/90"
                  >
                    Repo
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
