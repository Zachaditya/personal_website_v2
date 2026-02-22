"use client";

import { motion } from "framer-motion";
import { Download, GraduationCap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ResumeItem = {
  title: string;
  org: string;
  dates: string;
  description: string;
  tags?: string[];
  logo?: string; // URL or path for org/school logo
};

const EXPERIENCE: ResumeItem[] = [
  {
    title: "Full-Stack Engineer",
    org: "Aetherum.ai",
    dates: "Apr 2025 - Dec 2025",
    description:
      "Designed financial models for user credit-worthiness, built internal tooling for underwriting, and developed React/FastAPI dashboards for real-time portfolio tracking.",
    tags: ["React", "FastAPI", "Python", "PyTorch"],
  },
  {
    title: "Research Assistant",
    org: "Spero Studios",
    dates: "Oct 2022 - Dec 2022",
    description:
      "Analyzed 20+ top-performing SEA arcade games using Google Trends and Twitch Tracker, delivering data-backed proposals that placed 3rd at Polygon Development Hackathon.",
    tags: ["Research", "Data Analysis", "Web3"],
  },
  {
    title: "Tutor & Teaching Assistant",
    org: "DVC Math Faculty",
    dates: "Sep 2022 - May 2023",
    description:
      "Tutored 10-20 students weekly in Linear Algebra, Differential Equations, and Multivariable Calculus. Collaborated with faculty to support 30+ Precalculus students.",
    tags: ["Teaching", "Mathematics"],
  },
  {
    title: "Teaching Intern",
    org: "IFund Education",
    dates: "Sep 2022 - May 2023",
    description:
      "Facilitated virtual English instruction for 10+ students in rural Indonesia, implementing interactive project-based learning modules.",
    tags: ["Education", "Remote"],
  },
];

const EDUCATION: ResumeItem[] = [
  {
    title: "B.A. Data Science",
    org: "UC Berkeley",
    dates: "Aug 2023 - Aug 2025",
    description:
      "Concentration: Business and Industrial Analytics. GPA: 3.4/4.0",
    tags: ["Data Science", "Analytics"],
    logo: "/cal_logo.png",
  },
  {
    title: "Applied Mathematics",
    org: "Diablo Valley College",
    dates: "Aug 2021 - May 2023",
    description: "GPA: 3.9/4.0",
    tags: ["Mathematics"],
    logo: "/dvc_logo.png",
  },
];

const EXTRACURRICULAR: ResumeItem[] = [
  {
    title: "VP & Co-Founding Officer",
    org: "DVC Blockchain",
    dates: "Sep 2022 - May 2023",
    description:
      "Co-founded blockchain student org, grew community to 200+ followers. Led workshop with prominent founder attracting 80+ attendees.",
    tags: ["Leadership", "Blockchain"],
  },
  {
    title: "Project Manager",
    org: "DVC Project Bracket",
    dates: "Sep 2022 - Dec 2022",
    description:
      "Directed developer team building an onboarding Android app using Kotlin.",
    tags: ["Project Management", "Kotlin"],
  },
];

function TimelineCard({ item, index }: { item: ResumeItem; index: number }) {
  const isLeft = index % 2 === 0;
  const [logoError, setLogoError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`relative flex w-full ${
        isLeft ? "md:justify-start" : "md:justify-end"
      }`}
    >
      {/* Connection dot on timeline */}
      <div className="absolute left-1/2 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#A259FF] bg-[#010304] md:block" />

      <div className="w-full md:w-[calc(50%-2rem)]">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
          <div className="font-['Fira_Code'] text-xs text-[#A259FF]">
            {item.dates}
          </div>
          <h3 className="mt-2 text-base font-semibold text-white">
            {item.title}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            {item.logo && (
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded">
                {logoError ? (
                  <GraduationCap className="h-4 w-4 text-white/50" />
                ) : (
                  <Image
                    src={item.logo}
                    alt=""
                    width={32}
                    height={32}
                    className="object-contain"
                    unoptimized
                    onError={() => setLogoError(true)}
                  />
                )}
              </div>
            )}
            <span className="text-sm text-[#26DDF9]">{item.org}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            {item.description}
          </p>
          {item.tags && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineSection({
  title,
  items,
}: {
  title: string;
  items: ResumeItem[];
}) {
  return (
    <div className="mt-16 first:mt-0">
      <h3 className="mb-8 text-center text-lg font-semibold text-white/90">
        {title}
      </h3>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-white/10 md:block" />

        <div className="space-y-6">
          {items.map((item, i) => (
            <TimelineCard key={item.title + item.org} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Experience
          </h2>
          <p className="mt-2 text-white/60">
            My professional journey and education
          </p>
        </motion.div>

        {/* Download resume */}
        <div className="mt-8 flex justify-center">
          <a
            href="/RESUME_ErnestAditya_Aetherum.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10"
          >
            <Download className="h-4 w-4" />
            Download Resume PDF
          </a>
        </div>

        <TimelineSection title="Work Experience" items={EXPERIENCE} />
        <TimelineSection title="Education" items={EDUCATION} />
        <TimelineSection title="Extracurricular" items={EXTRACURRICULAR} />
      </div>
    </section>
  );
}
