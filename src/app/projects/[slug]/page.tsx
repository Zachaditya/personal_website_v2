import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-[#010304]">
      <div className="mx-auto max-w-3xl px-4 py-24">
        <Link
          href="/#projects"
          className="text-sm text-white/60 hover:text-white transition-colors"
        >
          &larr; Back to Projects
        </Link>

        <div className="mt-6">
          <div className="font-['Fira_Code'] text-sm text-white/40">
            {project.date}
          </div>
          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            {project.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={`${project.slug}-${t}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
              >
                {t}
              </span>
            ))}
          </div>

          {project.short && (
            <p className="mt-5 text-base leading-relaxed text-white/70">
              {project.short}
            </p>
          )}

          {project.overview && (
            <div className="mt-8 space-y-3">
              <h2 className="text-lg font-semibold text-white">Overview</h2>
              <p className="text-sm leading-relaxed text-white/60">
                {project.overview}
              </p>
            </div>
          )}

          {project.highlights?.length ? (
            <div className="mt-8 space-y-3">
              <h2 className="text-lg font-semibold text-white">Highlights</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-white/60">
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-8 flex gap-3">
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
          </div>
        </div>
      </div>
    </main>
  );
}
