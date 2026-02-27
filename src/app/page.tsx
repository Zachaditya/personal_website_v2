import { Hero } from "@/components/Hero";
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

        {/* Scroll marker: entering this triggers the rotation-back animation on the fixed overlay */}
        <div id="anim-gap" />

        <WorkTogether />
      </div>
    </main>
  );
}
