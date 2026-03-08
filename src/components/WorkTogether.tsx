"use client";

import { motion } from "framer-motion";
import { useState, type SyntheticEvent } from "react";
import TypewriterOnce from "./TypewriterOnce";

const SUGGESTED_MESSAGE =
  "Hey Zach, would love to connect, let's chat in the coming week 👀";

export function WorkTogether() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [messageValue, setMessageValue] = useState("");
  const [messageFocused, setMessageFocused] = useState(false);

  const showAutocomplete =
    messageValue.length > 0 &&
    SUGGESTED_MESSAGE.toLowerCase().startsWith(messageValue.toLowerCase()) &&
    messageValue !== SUGGESTED_MESSAGE;

  function acceptAutocomplete() {
    if (showAutocomplete) {
      setMessageValue(SUGGESTED_MESSAGE);
    }
  }

  function handleMessageKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.key === "Tab" || e.key === "Enter") && showAutocomplete) {
      e.preventDefault();
      acceptAutocomplete();
    }
  }

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
        setMessageValue("");
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
            I'm actively looking for Full-Stack engineering roles. Let's
            connect!
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
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-white/80"
              >
                Message
              </label>
              <div className="relative rounded-lg border border-white/10 bg-white/5 focus-within:border-white/30">
                {/* Ghost text overlay — shows typed text + grey autocomplete inline */}
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg px-4 py-3"
                  aria-hidden="true"
                >
                  {messageValue === "" && !messageFocused ? (
                    <div className="text-base leading-relaxed text-white/40">
                      <TypewriterOnce
                        text={SUGGESTED_MESSAGE}
                        ms={45}
                        delayMs={800}
                        triggerOnScroll
                      />
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap break-words text-base leading-relaxed text-white">
                      {messageValue}
                      {showAutocomplete && (
                        <span className="text-white/45">
                          {SUGGESTED_MESSAGE.slice(messageValue.length)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  onKeyDown={handleMessageKeyDown}
                  onFocus={() => setMessageFocused(true)}
                  onBlur={() => setMessageFocused(false)}
                  className="relative z-10 w-full resize-none rounded-lg border-0 bg-transparent px-4 py-3 text-transparent caret-white outline-none focus:ring-0"
                  style={{ WebkitTextFillColor: "transparent" }}
                  autoComplete="off"
                />
              </div>
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
