"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import type { Division } from "@/lib/data";
import { contactConfig } from "@/lib/data";

type LeadFormProps = {
  division: Exclude<Division, "group">;
  context?: string;
  compact?: boolean;
  submitLabel?: string;
};

export function LeadForm({
  division,
  context = "",
  compact = false,
  submitLabel = "Send enquiry"
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        body: formData
      });
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Unable to send enquiry.");
      }

      setStatus("sent");
      setMessage(result.message || "Enquiry sent.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send enquiry. Please try WhatsApp."
      );
    }
  }

  const inputClass = compact
    ? "w-full rounded-lg border border-ink/15 bg-white/88 px-3 py-2 text-sm text-ink shadow-sm outline-none transition focus:border-solar-500"
    : "w-full rounded-lg border border-ink/15 bg-white/88 px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition focus:border-solar-500 sm:px-4 sm:py-3";
  const labelClass = compact
    ? "block text-[13px] font-medium leading-tight text-ink/80"
    : "block text-sm font-medium text-ink/80";
  const fieldTopClass = compact ? "mt-1.5" : "mt-2";
  const buttonClass = compact
    ? "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-realty-700 disabled:cursor-wait disabled:opacity-70 sm:col-span-2 sm:min-h-11 sm:whitespace-nowrap"
    : "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-realty-700 disabled:cursor-wait disabled:opacity-70 sm:min-h-12 sm:px-5 sm:py-3";

  return (
    <form
      action="/api/leads"
      method="post"
      onSubmit={handleSubmit}
      className={compact ? "grid gap-3 sm:grid-cols-2" : "space-y-4"}
    >
      <input type="hidden" name="division" value={division} />
      <input type="hidden" name="leadSource" value={contactConfig[division].leadSource} />
      <input type="hidden" name="interest" value={context} />
      <div className={compact ? "contents" : "grid gap-4 md:grid-cols-2"}>
        <label className={labelClass}>
          Name
          <input
            required
            minLength={2}
            name="name"
            autoComplete="name"
            className={`${inputClass} ${fieldTopClass}`}
            placeholder="Full name"
          />
        </label>
        <label className={labelClass}>
          Phone
          <input
            required
            minLength={7}
            name="phone"
            autoComplete="tel"
            className={`${inputClass} ${fieldTopClass}`}
            placeholder="+91"
          />
        </label>
      </div>
      <label className={labelClass}>
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          className={`${inputClass} ${fieldTopClass}`}
          placeholder="name@example.com"
        />
      </label>
      <label className={labelClass}>
        Enquiry
        <textarea
          key={context || "blank-enquiry"}
          name="message"
          rows={compact ? 2 : 5}
          className={`${inputClass} ${fieldTopClass} resize-none`}
          defaultValue={context}
          placeholder="Tell us what you are looking for"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className={buttonClass}
      >
        <Send size={17} aria-hidden="true" />
        {status === "sending" ? "Sending..." : submitLabel}
      </button>
      {message ? (
        <p
          className={`text-sm ${compact ? "sm:col-span-2" : ""} ${
            status === "error" ? "text-red-700" : "text-realty-700"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
