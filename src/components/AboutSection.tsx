"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="px-5 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About Me
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            I&apos;m a data scientist and full-stack engineer from Berkeley,
            passionate about building products at the intersection of finance,
            AI, and web technology. Outside of work, you&apos;ll find me on the
            golf course, making music, or exploring design systems and product
            storytelling.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
