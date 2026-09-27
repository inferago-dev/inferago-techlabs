"use client";

import { useState, type FormEvent } from "react";

const NEEDS = [
  "Website",
  "Web Application",
  "Mobile App",
  "Custom Software",
  "E-commerce",
  "Digital Marketing",
  "SEO",
  "AI Integration",
  "Other",
];

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-fg transition-all placeholder:text-fg-muted/70 hover:border-white/20 focus:border-white/30 focus:bg-black/60 focus:ring-4 focus:ring-white/[0.06] focus:outline-none";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 px-8 py-16 text-center">
        <p className="text-2xl font-semibold text-fg">Thanks, we&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <input name="name" required placeholder="Name *" className={inputClasses} />
        <input name="company" placeholder="Company" className={inputClasses} />
        <input
          name="email"
          type="email"
          required
          placeholder="Email *"
          className={inputClasses}
        />
        <input name="phone" placeholder="Phone" className={inputClasses} />
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm text-fg-muted">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {NEEDS.map((need) => (
            <label key={need} className="cursor-pointer">
              <input type="radio" name="service" value={need} className="peer sr-only" />
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-fg-muted transition-all hover:border-white/25 hover:text-fg peer-checked:border-transparent peer-checked:bg-fg peer-checked:font-medium peer-checked:text-black peer-focus-visible:ring-2 peer-focus-visible:ring-white/40">
                {need}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <textarea
        name="description"
        required
        placeholder="Project Description *"
        rows={5}
        className={inputClasses}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <input name="budget" placeholder="Budget" className={inputClasses} />
        <input name="timeline" placeholder="Timeline" className={inputClasses} />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start rounded-full bg-fg px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send project request"}
      </button>

      {status === "error" && (
        <p className="text-sm text-accent-orange">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
