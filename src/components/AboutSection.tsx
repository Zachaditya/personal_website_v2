"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HOBBIES = [
  {
    emoji: "🏌️",
    label: "Golf",
    text: "Trying to break 80 (harder than building a production-grade RAG pipeline for unstructured data).",
  },
  {
    emoji: "🏋️",
    label: "Gym",
    text: "Hitting new PRs heavier than the emotional baggage Claude deals with at 3am.",
  },
  {
    emoji: "🎵",
    label: "Live Music",
    text: "Up the Stuss 🤘",
  },
  {
    emoji: "👨‍🍳",
    label: "Cooking",
    text: "hey chat instructions unclear. The house burned down 😭🔥",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-left text-2xl font-semibold tracking-tight text-white/70">
          About Me
        </h2>
        <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-10">
          {/* Headshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto h-72 w-48 shrink-0 overflow-hidden rounded-xl md:mx-0 md:h-[480px] md:w-80"
          >
            <Image
              src="/headshot2.png"
              alt="Zach"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 192px, 320px"
            />
          </motion.div>

          {/* Bio card — stretches to match photo height */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex min-w-0 flex-1 flex-col rounded-2xl border border-white/10 bg-[#0c0e10] p-6 md:p-10"
          >
            {/* Intro */}
            <p className="mb-1 text-base font-semibold text-white">
              Hello World, I&apos;m Zach 👋
            </p>
            <div className="space-y-3 text-base leading-relaxed text-white/60">
              <p>
                UC Berkeley Data Science grad and full-stack engineer building
                AI-native products. I love keeping up with the latest in AI and
                using tools like Claude and Cursor to ship fast.
              </p>
              <p>
                Looking for my next role at an early-stage startup — I thrive in
                ambiguity, love thinking through product strategy, and learn
                best in fast-moving environments. Currently shipping a React
                Native side project.
              </p>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-white/10" />

            {/* Offline hobbies */}
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/40">
              When I&apos;m offline
            </p>
            <ul className="mt-auto space-y-3">
              {HOBBIES.map(({ emoji, label, text }) => (
                <li key={label} className="text-xs leading-snug">
                  <span className="font-medium text-white/80">
                    {emoji} {label}
                  </span>
                  <span className="text-white/50"> — {text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
