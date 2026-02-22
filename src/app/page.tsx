import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { ProjectsPreview } from "@/components/ProjectsPreview";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-[#010304] text-white">
      <Hero />
      <TechStack />
      <div className="relative z-10">
        <Experience />
        <ProjectsPreview />
        <AboutSection />
        <Footer />
      </div>
    </main>
  );
}
