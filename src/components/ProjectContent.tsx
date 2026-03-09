"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { ProjectSidebar } from "@/components/ProjectSidebar";

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
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
  const hasSections = !!project.sections?.length;
  const [activeId, setActiveId] = useState(project.sections?.[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!hasSections) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { threshold: 0.4 },
    );

    const ids = project.sections!.map((s) => s.id);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [hasSections, project.sections]);

  const header = (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <Link
          href="/#projects"
          onClick={() => sessionStorage.setItem("scrollTo", "projects")}
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

        {!hasSections && project.highlights?.length ? (
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

  if (!hasSections) {
    return (
      <div className="flex w-full justify-center">
        <div className="w-full max-w-3xl px-4 py-24">{header}</div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex max-w-6xl w-full gap-16 lg:gap-24">
        <ProjectSidebar sections={project.sections!} activeId={activeId} />

        <div className="flex-1 min-w-0 max-w-3xl pl-8 pr-4 py-24 lg:pl-12">
        {header}

        {project.sections!.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mt-16 scroll-mt-24"
          >
            <h2 className="text-lg font-semibold text-white">
              {section.title}
            </h2>

            {section.video ? (
              <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                <video
                  src={`/${section.video}`}
                  controls
                  playsInline
                  className="w-full"
                />
              </div>
            ) : null}

            {section.screenshots?.length ? (
              <div className="mt-4 flex flex-col gap-4">
                {section.screenshots.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10"
                  >
                    <Image
                      src={`/${src}`}
                      alt={`${section.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 672px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            ) : null}

            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {section.description}
            </p>

            {section.features?.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/60">
                {section.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        </div>
      </div>
    </div>
  );
}
