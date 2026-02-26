import { Hero } from "@/components/Hero";
//TODO: Tweak about section before adding it in
import { AboutSection } from "@/components/AboutSection";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { ProjectsPreview } from "@/components/ProjectsPreview";

import { WorkTogether } from "@/components/WorkTogether";

export default function HomePage() {
  return (
    <main className="text-white">
      <Hero />
      <TechStack />

      <ProjectsPreview />
      <div className="relative z-10 mt-40">
        <Experience />

        <WorkTogether />
      </div>
    </main>
  );
}
