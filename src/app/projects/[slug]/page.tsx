import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/projects";
import { ProjectContent } from "@/components/ProjectContent";

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
    <main className="min-h-screen">
      <ProjectContent project={project} />
    </main>
  );
}
