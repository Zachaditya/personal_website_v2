"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
    <section id="projects" className="px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Projects
          </h2>
          <p className="mt-2 text-white/60">
            Things I&apos;ve built and shipped
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4">
          {sorted.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 transition-colors hover:bg-white/[0.08]"
            >
              <div className="flex items-center gap-3">
                <span className="font-['Fira_Code'] text-xs text-white/40">
                  {p.date}
                </span>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#0ACF83]/30 bg-[#0ACF83]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#0ACF83]"
                  >
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#0ACF83]" />
                    Live
                  </a>
                )}
                {!p.liveUrl && p.wip && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    In Progress
                  </span>
                )}
              </div>

              <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
                {p.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {p.short ?? p.overview ?? ""}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 5).map((t) => (
                  <span
                    key={`${p.slug}-${t}`}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href={`/projects/${p.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                >
                  Read more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition-colors hover:text-white/90"
                  >
                    View repo
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
