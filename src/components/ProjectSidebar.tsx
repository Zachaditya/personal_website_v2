"use client";

import type { ProjectSection } from "@/lib/projects";

interface ProjectSidebarProps {
  sections: ProjectSection[];
  activeId: string;
}

export function ProjectSidebar({ sections, activeId }: ProjectSidebarProps) {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <aside className="hidden lg:block sticky top-24 self-start w-52 shrink-0 pl-8 pr-4 py-24">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
        Sections
      </p>
      <nav className="flex flex-col gap-1">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                isActive
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <span
                className={`h-4 w-0.5 rounded-full transition-all ${
                  isActive ? "bg-white" : "bg-white/0 group-hover:bg-white/20"
                }`}
              />
              {section.title}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
