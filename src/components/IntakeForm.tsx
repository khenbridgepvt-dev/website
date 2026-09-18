"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

type IntakeFormProps = {
  source?: "queries-intake" | "homepage";
};

export default function IntakeForm({ source = "queries-intake" }: IntakeFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      enquiry: String(formData.get("enquiry") ?? ""),
      source,
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-sm border border-lavender/30 bg-white p-6 sm:p-8 text-center shadow-sm shadow-indigo/5"
        role="status"
      >
        <p className="text-lg font-semibold text-indigo mb-2">Thank you!</p>
        <p className="text-indigo/70 text-sm sm:text-base">
          We&apos;ve received your details. A specialist will call you back shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-primary hover:text-violet transition-colors"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-sm border border-lavender/30 bg-white p-6 sm:p-8 shadow-sm shadow-indigo/5 space-y-5"
      noValidate
    >
      <div className="absolute -left-[9999px] opacity-0" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-indigo mb-1.5">
          First name <span className="text-primary">*</span>
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
          autoComplete="given-name"
          className="w-full rounded-sm border border-lavender/40 bg-background px-4 py-2.5 text-indigo placeholder:text-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          disabled={status === "submitting"}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-indigo mb-1.5">
          Email address <span className="text-primary">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-sm border border-lavender/40 bg-background px-4 py-2.5 text-indigo placeholder:text-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          disabled={status === "submitting"}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-indigo mb-1.5">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full rounded-sm border border-lavender/40 bg-background px-4 py-2.5 text-indigo placeholder:text-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          disabled={status === "submitting"}
        />
      </div>

      <div>
        <label htmlFor="enquiry" className="block text-sm font-medium text-indigo mb-1.5">
          Enquiry
        </label>
        <textarea
          id="enquiry"
          name="enquiry"
          rows={4}
          placeholder="Tell us briefly about your visa needs"
          className="w-full resize-y min-h-[100px] rounded-sm border border-lavender/40 bg-background px-4 py-2.5 text-indigo placeholder:text-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          disabled={status === "submitting"}
        />
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full flex items-center justify-center gap-2 bg-accent text-indigo font-bold text-sm sm:text-base px-6 py-3 rounded-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Request a free callback"
        )}
      </button>
    </form>
  );
}
