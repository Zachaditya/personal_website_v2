"use client";
import { ProjectsDropdownRow } from "./ProjectsDropdownRow";
import { Section } from "./Section";
import Image from "next/image";
import { useLayoutEffect, useRef, useState, useId, useEffect } from "react";

type ResumeItem = {
  title: string;
  org: string;
  dates: string;
  location: string;
  bullets?: string[];
};
const EXPERIENCE: ResumeItem[] = [
  {
    title: "Full-Stack Engineer",
    org: "Aetherum.ai",
    dates: "April 2025 - December 2025",
    location: "San Francisco, CA",
    bullets: [
      "Designed and implemented financial models to assess user credit-worthiness, reducing risk exposure to cryptocurrency market volatility.",
      "Built an internal web app for scenario testing and validation of underwriting models, accelerating iteration speed and model deployment.",
      "Developed React and FastAPI dashboards for real-time portfolio tracking, achieving 100% beta onboarding and high user retention.",
      "Leveraged Python, PyTorch, and Pandas to develop data processing pipelines for automated loan underwriting agents.",
    ],
  },
  {
    title: "Research Assistant",
    org: "Spero Studios",
    dates: "October 2022 — December 2022",
    location: "San Francisco, CA",
    bullets: [
      "Analyzed 20+ top-performing SEA arcade games using Google Trends and Twitch Tracker to identify market trends and preferences.",
      "Proposed data-backed aesthetics, securing 3rd place out of 100+ teams at the Polygon Development Hackathon.",
      "Collaborated cross-functionally to deliver research insights that improved project design efficiency by 15%.",
    ],
  },
  {
    title: "Tutor and Teaching Assistant",
    org: "Diablo Valley College Math Faculty",
    dates: "September 2022 - May 2023",
    location: "Pleasant Hill, CA",
    bullets: [
      "Tutored 10–20 students weekly in Linear Algebra, Differential Equations, and Multivariable Calculus.",
      "Collaborated with faculty to support 30+ students in Precalculus, clarifying complex mathematical concepts and logic during lectures.",
      "Simplified abstract frameworks into digestible strategies, improving student comprehension and exam performance.",
    ],
  },
  {
    title: "Teaching Intern",
    org: "IFund Education",
    dates: "September 2022 - May 2023",
    location: "Remote / Indonesia",
    bullets: [
      "Facilitated virtual English instruction for 10+ students in rural Indonesia, bridging educational gaps through remote learning technology.",
      "Simplified complex language frameworks into digestible lessons, tailoring delivery to diverse proficiency levels and cultural contexts.",
      "Optimized student engagement and communication confidence by implementing interactive, project-based learning modules via Zoom.",
    ],
  },
];

const EDUCATION: ResumeItem[] = [
  {
    title: "B.A. Data Science",
    org: "University of California, Berkeley",
    location: "Berkeley, CA",
    dates: "August 2023 - August 2025",
    bullets: [
      "Concentration: Business and Industrial Analytics",
      "GPA: 3.4/4.0",
    ],
  },
  {
    title: "Applied Mathematics",
    org: "Diablo Valley College",
    location: "Pleasant Hill, CA",
    dates: "August 2021 - May 2023",
    bullets: ["GPA: 3.9/4.0"],
  },
];

const Extracurricular: ResumeItem[] = [
  {
    title: "Vice President and Co-Founding Officer",
    org: "DVC Blockchain",
    dates: "September 2022 - May 2023",
    location: "Pleasant Hill, CA",
    bullets: [
      "Co-founded a blockchain student organization, growing the community to 200+ followers through strategic outreach.",
      "Spearheaded a workshop featuring a prominent blockchain founder, attracting 80+ attendees.",
      "Led a team to promote blockchain education and foster networking opportunities for campus enthusiasts.",
    ],
  },
  {
    title: "Project Manager",
    org: "DVC Project Bracket",
    dates: "September 2022 — December 2022",
    location: "Pleasant Hill, CA",
    bullets: [
      "Directed a developer team to build an onboarding Android app using Kotlin, enhancing the student entry experience.",
      "Facilitated weekly meetings to track progress, resolve technical blockers, and ensure milestone delivery.",
    ],
  },
];

function DropdownSection({
  title,
  defaultOpen = false,
  children,
  titleClassName,
  summaryClassName,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  titleClassName?: string;
  summaryClassName?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState(0);
  const contentId = useId();

  // Measure content height when opening / when content changes
  useLayoutEffect(() => {
    if (!innerRef.current) return;
    const h = innerRef.current.scrollHeight;
    setMaxH(h);
  }, [children, open]);

  // Keep height correct on resize (fonts, responsive layout, etc.)
  useEffect(() => {
    const onResize = () => {
      if (!innerRef.current) return;
      setMaxH(innerRef.current.scrollHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggle = () => setOpen((v) => !v);

  return (
    <div className="rounded-2xl border border-black/10 bg-white">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={contentId}
        className={[
          "flex w-full cursor-pointer items-center gap-3 py-4 text-left",
          "px-5",
          summaryClassName ?? "",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block select-none text-black/60",
            "transition-transform duration-400 ease-out",
            open ? "rotate-90" : "",
          ].join(" ")}
          aria-hidden="true"
        >
          ▸
        </span>

        <span
          className={
            titleClassName ??
            "text-lg font-semibold tracking-tight text-black sm:text-xl"
          }
        >
          {title}
        </span>
      </button>

      {/* Animated content */}
      <div
        id={contentId}
        ref={contentRef}
        style={{ maxHeight: open ? maxH + 1 : 0 }} // +1 avoids 1px rounding snaps
        className={[
          "overflow-hidden",
          "transition-[max-height,opacity,transform] duration-600",
          "ease-[cubic-bezier(0.2,0.9,0.2,1)]",
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
        ].join(" ")}
      >
        <div ref={innerRef}>
          <div className="h-px bg-black/10" />
          <div className="px-5 py-5 text-left">{children}</div>
        </div>
      </div>
    </div>
  );
}
function ResumeItemCard({ item }: { item: ResumeItem }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-sm font-semibold text-black">{item.title}</div>
        <div className="text-xs text-black/70">{item.dates}</div>
      </div>
      <div className="mt-1 text-sm text-black/80">{item.org}</div>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-black/75">
        {item.bullets?.map((b, i) => (
          <li key={i}>• {b}</li>
        ))}
      </ul>
    </div>
  );
}

export function ResumeSection() {
  return (
    <Section
      id="resume"
      title="RESUME"
      subtitle="Experience • Education • Skills"
    >
      <div className="grid gap-8">
        {/* Download row */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white p-4">
          <div className="text-sm text-black/70">Download as PDF → </div>

          <a
            href="/RESUME_ErnestAditya_Aetherum.pdf"
            className="inline-flex items-center opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded"
          >
            <Image src="/icons/pdf-file.png" alt="" width={40} height={40} />
          </a>
        </div>
        {/* Education */}
        <DropdownSection title="Education" defaultOpen={false}>
          <div className="grid gap-4">
            {EDUCATION.map((r) => (
              <ResumeItemCard key={r.title} item={r} />
            ))}
          </div>
        </DropdownSection>

        {/* Experience */}
        <DropdownSection title="Experience" defaultOpen>
          <div className="grid gap-4">
            {EXPERIENCE.map((r) => (
              <ResumeItemCard key={r.title} item={r} />
            ))}
          </div>
        </DropdownSection>

        <DropdownSection title="Extracurricular Activities" defaultOpen={false}>
          <div className="grid gap-4">
            {Extracurricular.map((r) => (
              <ResumeItemCard key={r.title} item={r} />
            ))}
          </div>
        </DropdownSection>
        {/* Projects link */}
        <ProjectsDropdownRow />
      </div>
    </Section>
  );
}
