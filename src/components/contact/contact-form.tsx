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
  "w-full rounded-md border border-border-soft bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-muted focus:border-accent-orange/60 focus:outline-none";

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
      <div className="rounded-lg border border-border-soft bg-surface px-8 py-16 text-center">
        <p className="text-lg text-fg">Thanks — we&apos;ll be in touch shortly.</p>
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {NEEDS.map((need) => (
            <label
              key={need}
              className="flex items-center gap-2 text-sm text-fg-muted"
            >
              <input type="radio" name="service" value={need} className="accent-[--color-accent-orange]" />
              {need}
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
        className="self-start rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send Project Request"}
      </button>

      {status === "error" && (
        <p className="text-sm text-accent-orange">
          Something went wrong — please try again or email us directly.
        </p>
      )}
    </form>
  );
}
