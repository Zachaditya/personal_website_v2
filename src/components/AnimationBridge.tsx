"use client";

import Image from "next/image";
import {
  motion,
  animate,
  AnimatePresence,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export function AnimationBridge() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const backgroundGifRef = useRef<HTMLImageElement>(null);

  const [bongoVisible, setBongoVisible] = useState(false);
  const fixedOpacity = useMotionValue(0);
  const fixedRotate = useMotionValue(0);
  const wrapperOpacity = useMotionValue(1);

  // Track scroll through the spacer div
  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start end", "end start"],
  });

  // Drive overlay animation based on spacer scroll progress
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Fade in + rotate during first 40% of scroll
    fixedOpacity.set(clamp01(v / 0.4) * 0.5);
    fixedRotate.set(clamp01(v / 0.4) * 45);

    // Bongo cat visible after 45%
    setBongoVisible(v > 0.45);
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

  // Fade the overlay out once WorkTogether enters; restore on scroll-up
  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(wrapperOpacity, 0, { duration: 0.4, ease: "easeOut" });
        } else if (entry.boundingClientRect.top > 0) {
          animate(wrapperOpacity, 1, { duration: 0.3, ease: "easeOut" });
        }
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [wrapperOpacity]);

  return (
    <>
      {/* Fixed overlay */}
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

          {/* Bongo cat springs in mid-scroll */}
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

      {/* Scroll spacer — provides the scroll distance that drives the animation */}
      <div ref={spacerRef} className="h-[60vh]" aria-hidden />
    </>
  );
}
