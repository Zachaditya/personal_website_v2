"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function TypewriterOnce({
  text,
  ms = 100,
  delayMs = 400,
  className,
  triggerOnScroll = false,
}: {
  text: string;
  ms?: number; // typing speed (lower = faster)
  delayMs?: number; // delay before typing starts
  className?: string;
  triggerOnScroll?: boolean; // when true, only start typing when scrolled into view
}) {
  const [out, setOut] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldStart = !triggerOnScroll || isInView;

  useEffect(() => {
    if (!shouldStart) return;

    // Respect reduced motion: show immediately, no animation
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduced) {
      setOut(text);
      return;
    }

    let i = 0;
    let timeoutId: number | undefined;
    let intervalId: number | undefined;

    timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length && intervalId) {
          window.clearInterval(intervalId);
        }
      }, ms);
    }, delayMs);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, ms, delayMs, shouldStart]);

  return (
    <span ref={ref} className={className}>
      <span>{out}</span>
      {/* Blinking cursor - use text-white when parent has text-transparent for visibility */}
      <span className="tw-cursor" aria-hidden="true" />
    </span>
  );
}
