"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import TypewriterOnce from "@/components/TypewriterOnce";

export function Hero() {
  const techStackControls = useAnimation();

  useEffect(() => {
    techStackControls.set({
      filter: "blur(120px) brightness(1.5)",
      opacity: 0,
      scale: 0.95,
    });
    const sequence = async () => {
      await techStackControls.start({
        filter: "blur(0px) brightness(1)",
        opacity: 0.85,
        scale: 1,
        transition: { duration: 2.2, ease: "easeOut", delay: 1 },
      });
      techStackControls.start({
        y: [0, -18, 0],
        scale: [1, 1.06, 1],
        opacity: [0.85, 1, 0.85],
        transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      });
    };
    sequence();
  }, [techStackControls]);

  return (
    <section
      className="shoot-star-root relative min-h-screen overflow-hidden flex items-center pl-5 md:pl-12 lg:pl-20"
      style={{ "--shoot-d": "1300ms" } as React.CSSProperties}
    >
      {/* Shooting star — visual only, no content */}
      <div
        className="shoot-star pointer-events-none z-20"
        style={
          {
            "--shoot-top": "100px",
            "--shoot-left": "1.25rem",
            "--shoot-dx": "80px",
            "--shoot-dy": "240px",
          } as React.CSSProperties
        }
      >
        <div className="star" />
        <div className="spark" aria-hidden="true" />
      </div>

      {/* Hero content — left side, revealed by star burst */}
      <div className="shoot-payload relative z-10 w-full max-w-xl lg:max-w-[50%] pr-5 md:pr-12">
        {/* Availability badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2 text-xs text-white/70">
          <span className="pulse-dot h-2 w-2 rounded-full bg-[#0ACF83]" />
          Available for Full-Stack / Data / AI roles
        </div>
        <br />

        {/* Heading */}
        <span className="text-white">Hello, I am</span>

        <br />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <TypewriterOnce
            text="Ernest Zachary Aditya"
            ms={70}
            delayMs={2600}
            className="bg-white bg-clip-text text-transparent"
          />
        </h1>

        {/* Social icons */}
        <div className="mt-6 flex items-center gap-4">
          <a
            href="https://github.com/Zachaditya"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/zachary-aditya/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:zachaditya@berkeley.edu"
            aria-label="Email"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#010304] transition-transform hover:scale-[1.02]"
          >
            View Projects
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="/RESUME_ErnestAditya_Aetherum.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            Download Resume
            <Download className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Tech stack image — absolute panel, flush to right edge, full section height */}
      <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-[45%] items-center justify-center pointer-events-none">
        <motion.div
          initial={{
            opacity: 0,
            filter: "blur(120px) brightness(1.5)",
            scale: 0.95,
          }}
          animate={techStackControls}
        >
          <Image
            src="/tech-stack.png"
            alt=""
            width={600}
            height={600}
            className="max-h-[55vh] w-auto"
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
}
