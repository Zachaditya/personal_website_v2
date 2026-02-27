"use client";

import { motion } from "framer-motion";
import { useState, type SyntheticEvent } from "react";

export function WorkTogether() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorDetail(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorDetail(data.details ?? data.error ?? "Unknown error");
      }
    } catch (err) {
      setStatus("error");
      setErrorDetail(err instanceof Error ? err.message : "Network error");
    }
  }

  return (
    <section id="contact" className="mt-120 px-5 py-20 pb-50">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let's Work Together!
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            👾 Drop me a message, ideas or anything on your mind.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="mx-auto mt-12 max-w-xl text-left"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-white/80"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-white/30 focus:bg-white/10"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-white/80"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-white/30 focus:bg-white/10"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-white/80"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-white/30 focus:bg-white/10"
                placeholder="Hey Zach, would love to connect, let's chat in the coming week 👀"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p
              className={`text-sm ${
                status === "success"
                  ? "text-green-400"
                  : status === "error"
                    ? "text-red-400"
                    : "text-white/50"
              }`}
            >
              {status === "success" && "Thanks! I'll get back to you soon."}
              {status === "error" && (
                <>
                  Something went wrong. Please try again.
                  {errorDetail && (
                    <span className="mt-1 block text-xs opacity-80">
                      {errorDetail}
                    </span>
                  )}
                </>
              )}
            </p>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full border border-white/10 bg-white px-5 py-2.5 text-sm font-semibold text-[#010304] transition-colors hover:bg-white/90 disabled:opacity-50"
            >
              {status === "submitting" ? "Sending..." : "Send message"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
