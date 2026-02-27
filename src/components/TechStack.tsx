"use client";

import Image from "next/image";
import {
  motion,
  animate,
  useAnimation,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import TypewriterOnce from "./TypewriterOnce";

const STACK = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "Kotlin", "HTML/CSS"],
  },
  {
    category: "Frameworks",
    items: ["React", "Next.js", "FastAPI", "Flask", "Node.js"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Vercel", "Tableau", "Figma"],
  },
  {
    category: "Data Science",
    items: [
      "PyTorch",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Jupyter",
      "Matplotlib",
    ],
  },
];

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  // Stores the section image's offset from viewport center, measured when it first enters view.
  // This becomes the fixed overlay's starting position so it appears to "come from" the image.
  const startOffsetRef = useRef({ x: 0, y: 0 });
  const backgroundGifRef = useRef<HTMLImageElement>(null);

  const isImageInView = useInView(imageRef, { once: true, margin: "-50px" });
  const [bongoVisible, setBongoVisible] = useState(false);
  const imageControls = useAnimation();
  const wrapperOpacity = useMotionValue(1);

  // Tracks the section's bottom edge scrolling from viewport-bottom → viewport-top.
  // This window spans the pb-160 gap between the content and the next section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"],
  });

  // Fixed overlay driven imperatively so x/y can read from startOffsetRef at runtime
  const fixedX = useMotionValue(0);
  const fixedY = useMotionValue(0);
  const fixedOpacity = useMotionValue(0);
  const fixedRotate = useMotionValue(0);

  // Section image fades out in the first 40% of the scroll window
  const sectionImageOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Continuously snapshot the image's position while its center is in the upper 55% of
  // the viewport. As the user scrolls the section upward, the last captured value will
  // be the image's position just before it exited from the top — i.e. the top-right
  // "natural" reading position, which is the correct translation start point.
  useEffect(() => {
    const capture = () => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const cy = rect.top + rect.height / 2;
      if (cy > 0 && cy < window.innerHeight * 0.55) {
        startOffsetRef.current = {
          x: rect.left + rect.width / 2 - window.innerWidth / 2,
          y: cy - window.innerHeight / 2,
        };
      }
    };
    capture();
    window.addEventListener("scroll", capture, { passive: true });
    window.addEventListener("resize", capture);
    return () => {
      window.removeEventListener("scroll", capture);
      window.removeEventListener("resize", capture);
    };
  }, []);

  // Drive all fixed overlay animation imperatively:
  //  0.00 – 0.40  translate from section image position → viewport center
  //  0.02 – 0.45  opacity 0 → 0.5
  //  0.02 – 0.55  rotate 0° → 45°
  //  0.48+        bongo cat springs in
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const { x: sx, y: sy } = startOffsetRef.current;

    // Translation: ease out of start position toward center
    const posT = clamp01(v / 0.4);
    fixedX.set(sx * (1 - posT));
    fixedY.set(sy * (1 - posT));

    // Fade in
    fixedOpacity.set(clamp01((v - 0.02) / 0.43) * 0.5);

    // Rotate
    fixedRotate.set(clamp01((v - 0.02) / 0.53) * 45);

    // Bongo cat
    setBongoVisible(v > 0.48);
  });

  // Cycle bongo cat GIF
  useEffect(() => {
    const interval = setInterval(() => {
      if (backgroundGifRef.current) {
        backgroundGifRef.current.src = `/bongo_cat.gif?t=${Date.now()}`;
      }
    }, 900);
    return () => clearInterval(interval);
  }, []);

  // Fade the overlay out (but keep it rendered) once WorkTogether enters,
  // and spring the rotation back to upright as it goes.
  useEffect(() => {
    const el = document.getElementById("about");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(fixedRotate, 0, {
            type: "spring",
            stiffness: 80,
            damping: 20,
          });
          animate(wrapperOpacity, 0, { duration: 0.4, ease: "easeOut" });
        } else {
          animate(wrapperOpacity, 1, { duration: 0.3, ease: "easeOut" });
          animate(fixedRotate, 45, {
            type: "spring",
            stiffness: 80,
            damping: 20,
          });
        }
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fixedRotate, wrapperOpacity]);

  // Float animation — scale only; opacity and position owned by scroll
  useEffect(() => {
    if (!isImageInView) return;
    imageControls.start({
      scale: [1, 1.06, 1],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    });
    return () => {
      imageControls.stop();
    };
  }, [isImageInView, imageControls]);

  return (
    <>
      {/* Fixed overlay — fades out (stays rendered) when WorkTogether enters */}
      <motion.div
        className="fixed inset-0 z-0 flex items-center justify-center px-5 pointer-events-none"
        aria-hidden
        style={{ opacity: wrapperOpacity }}
      >
        <motion.div
          className="relative w-full max-w-md"
          style={{
            opacity: fixedOpacity,
            rotate: fixedRotate,
            x: fixedX,
            y: fixedY,
          }}
        >
          <Image
            src="/tech-stack.png"
            alt=""
            width={1024}
            height={1024}
            className="w-full h-auto rounded-lg"
            unoptimized
          />

          {/* Bongo cat springs in when animation is ~30% done */}
          <AnimatePresence>
            {bongoVisible && (
              <motion.div
                className="absolute top-0 right-0 -translate-x-9/10 -translate-y-1/3"
                initial={{ scale: 0, rotate: -45, opacity: 0, y: 24 }}
                animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
                exit={{ scale: 0, rotate: -45, opacity: 0, y: 24 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 14,
                  mass: 0.8,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={backgroundGifRef}
                  src="/bongo_cat.gif"
                  alt=""
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain rotate-[-10deg]"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <section ref={sectionRef} className="relative z-10 px-5 pt-32 pb-160">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-16 text-center text-4xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            <TypewriterOnce text="Tech Stack" ms={100} triggerOnScroll />
          </h1>

          <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-44">
            {/* Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="w-full md:flex-[1.3]"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                <div className="space-y-6">
                  {STACK.map((group) => (
                    <div key={group.category}>
                      <div className="text-sm font-medium text-white">
                        {group.category}
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Section image — fades out as scroll enters the gap */}
            <div ref={imageRef} className="w-full max-w-sm md:max-w-md">
              <motion.div
                animate={imageControls}
                style={{ opacity: sectionImageOpacity }}
              >
                <Image
                  src="/tech-stack.png"
                  alt="Tech stack"
                  width={1024}
                  height={1024}
                  className="w-full h-auto rounded-lg"
                  unoptimized
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
