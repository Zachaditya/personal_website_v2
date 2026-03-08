"use client";

import { motion, AnimatePresence } from "framer-motion";
import TypewriterOnce from "./TypewriterOnce";
import { FileText, GraduationCap, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ResumeItem = {
  title: string;
  org: string;
  dates: string;
  description: string | string[];
  tags?: string[];
  logo?: string; // URL or path for org/school logo
};

const EXPERIENCE: ResumeItem[] = [
  {
    title: "Full-Stack Engineer",
    org: "Aetherum.ai",
    dates: "Apr 2025 - Dec 2025",
    description: [
      "Partnered with the CTO to architect an agentic loan-underwriting system that autonomously evaluates risk and executes optimized loan agreements for a diverse user base.",
      "Designed and implemented financial models to assess user creditworthiness, significantly reducing platform risk exposure to cryptocurrency market volatility.",
      "Built an internal web app for scenario testing and validation of underwriting models, improving iteration speed and enabling faster, safer production releases.",
      "Developed React dashboards for real-time portfolio tracking, achieving 100% beta onboarding and high user retention through iterative UI/UX enhancements.",
    ],
    tags: ["React", "FastAPI", "Python", "LLM Agents", "FinTech"],
  },
  {
    title: "Research Assistant",
    org: "Spero Studios",
    dates: "Oct 2022 - Dec 2022",
    description: [
      "Analyzed 20+ top-performing arcade games using Google Trends and Twitch Tracker to identify SEA market trends and player preferences.",
      "Proposed data-backed game aesthetics that helped the team place 3rd out of 100+ competitors at the Polygon Development Hackathon.",
    ],
    tags: ["Research", "Data Analysis", "Web3"],
  },
  {
    title: "Tutor & Teaching Assistant",
    org: "Diablo Valley College Math Faculty",
    dates: "Sep 2022 - May 2023",
    description: [
      "Tutored 10–20 students weekly on topics ranging from precalculus to linear algebra and differential equations.",
      "Clarified complex mathematical logic (Linear Algebra, Differential Equations) for classes of 30+ students, a skill applied daily in documenting technical system architectures.",
    ],
    tags: ["Teaching", "Mathematics"],
  },
  {
    title: "Teaching Intern",
    org: "Bercerita",
    dates: "Sep 2022 - May 2023",
    description: [
      "Taught English to a class of 10 Indonesian students from underprivileged rural neighborhoods via Zoom, improving language proficiency and confidence.",
      "Simplified complex language frameworks into digestible lessons, tailoring delivery to diverse proficiency levels and cultural contexts.",
    ],
    tags: ["Education", "Remote"],
  },
];

const EDUCATION: ResumeItem[] = [
  {
    title: "B.A. Data Science",
    org: "UC Berkeley",
    dates: "Aug 2023 - Aug 2025",
    description: "GPA: 3.4/4.0",
    tags: ["Data Science", "Machine Learning", "AI Architecture"],
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
    description: [
      "Co-founded and led a blockchain-focused student organization with ten main team members, growing a community to 200+ followers through strategic social media campaigns.",
      "Spearheaded the planning and execution of a workshop featuring a prominent blockchain startup founder, engaging over 80 attendees.",
    ],
    tags: ["Leadership", "Blockchain"],
  },
  {
    title: "Project Manager",
    org: "DVC Project Bracket",
    dates: "Sep 2022 - Dec 2022",
    description: [
      "Directed a team of developers in building an onboarding Android app using Kotlin, enhancing the student onboarding experience.",
      "Facilitated weekly meetings to track progress and ensure timely delivery of project milestones.",
    ],
    tags: ["Project Management", "Kotlin"],
  },
];

function TimelineCard({
  item,
  index,
  defaultExpanded = false,
}: {
  item: ResumeItem;
  index: number;
  defaultExpanded?: boolean;
}) {
  const isLeft = index % 2 === 0;
  const [logoError, setLogoError] = useState(false);
  const [open, setOpen] = useState(defaultExpanded);

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
      <div className="w-full md:w-[calc(50%-1.5rem)]">
        <div className="rounded-2xl border border-white/10 bg-[#0c0e10] overflow-hidden">
          {/* Dropdown header */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              {item.logo && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded">
                  {logoError ? (
                    <GraduationCap className="h-4 w-4 text-white/50" />
                  ) : (
                    <Image
                      src={item.logo}
                      alt=""
                      width={32}
                      height={32}
                      className="object-contain"
                      onError={() => setLogoError(true)}
                    />
                  )}
                </div>
              )}
              <div className="min-w-0">
                <div className="text-xs text-white/50">{item.dates}</div>
                <div className="mt-0.5 text-base font-semibold text-white leading-tight">
                  {item.title}
                </div>
                <div className="mt-0.5 text-sm text-[#26DDF9]">{item.org}</div>
              </div>
            </div>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Collapsible body */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-4">
                  {Array.isArray(item.description) ? (
                    <ul className="space-y-1.5 text-sm leading-relaxed text-white/60">
                      {item.description.map((bullet, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1 shrink-0 text-white/40">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-relaxed text-white/60">
                      {item.description}
                    </p>
                  )}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineSection({
  title,
  items,
  defaultExpanded = false,
}: {
  title: string;
  items: ResumeItem[];
  defaultExpanded?: boolean;
}) {
  return (
    <div className="mt-16 first:mt-0">
      <h3 className="mb-8 text-center text-lg font-semibold text-white/90">
        {title}
      </h3>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 hidden w-1 -translate-x-1/2 bg-white/80 md:block" />

        <div className="space-y-6">
          {items.map((item, i) => (
            <TimelineCard
              key={item.title + item.org}
              item={item}
              index={i}
              defaultExpanded={defaultExpanded}
            />
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
            <TypewriterOnce
              text="Experience and Education"
              ms={100}
              triggerOnScroll
            />
          </h2>
        </motion.div>

        {/* Download resume */}
        <div className="mt-8 flex justify-center">
          <a
            href="/ErnestZacharyAditya_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10"
          >
            <FileText className="h-4 w-4" />
            Download Resume PDF
          </a>
        </div>

        <TimelineSection title="Education" items={EDUCATION} />
        <TimelineSection
          title="Work Experience"
          items={EXPERIENCE}
          defaultExpanded
        />
        <TimelineSection title="Extracurricular" items={EXTRACURRICULAR} />
      </div>
    </section>
  );
}
