"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/projects";

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.13,
    },
  },
};

export function ProjectContent({ project }: { project: Project }) {
  return (
    <motion.div
      className="mx-auto max-w-3xl px-4 py-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Link
          href="/#projects"
          className="text-sm text-white/60 hover:text-white transition-colors"
        >
          &larr; Back to Projects
        </Link>
      </motion.div>

      <div className="mt-6">
        <motion.div variants={item} className="text-sm text-white/40">
          {project.date}
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-2 text-2xl font-bold text-white sm:text-3xl"
        >
          {project.title}
        </motion.h1>

        <motion.div variants={item} className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={`${project.slug}-${t}`}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
            >
              {t}
            </span>
          ))}
        </motion.div>

        {project.short && (
          <motion.p
            variants={item}
            className="mt-5 text-base leading-relaxed text-white/70"
          >
            {project.short}
          </motion.p>
        )}

        {project.overview && (
          <motion.div variants={item} className="mt-8 space-y-3">
            <h2 className="text-lg font-semibold text-white">Overview</h2>
            <p className="text-sm leading-relaxed text-white/60">
              {project.overview}
            </p>
          </motion.div>
        )}

        {project.highlights?.length ? (
          <motion.div variants={item} className="mt-8 space-y-3">
            <h2 className="text-lg font-semibold text-white">Highlights</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-white/60">
              {project.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </motion.div>
        ) : null}

        <motion.div variants={item} className="mt-8 flex gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10"
            >
              View repo
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#010304] transition-opacity hover:opacity-90"
            >
              Live
              <span
                aria-hidden="true"
                className="inline-block opacity-0 translate-x-0 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
