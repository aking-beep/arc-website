"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, ArrowLeft, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { arcSite } from "@/lib/arc/site";
import {
  budgets,
  initialProjectType,
  projectTypes,
  sizes,
  timelines,
} from "@/lib/arc/inquiry";
import {
  INQUIRY_STEPS,
  LAST_STEP,
  validateInquiryStep,
  type InquiryErrors,
  type InquiryPayload,
} from "@/lib/arc/contact-payload";
import { ArcButton } from "@/components/arc/ui/button";
import { InquirySuccess } from "@/components/arc/contact/inquiry-success";

/**
 * Three-step inquiry form, ported from the prototype's `contact/InquiryForm`.
 *
 * The prototype's submit was a mock with a note to wire it to POST
 * /api/contact with an extended payload. It now does exactly that: the route
 * accepts the six extra fields, clamps them server-side and includes them in
 * the notification email. The `company_website` honeypot keeps its name, which
 * the prototype had already matched.
 *
 * Deep links supported: ?type=control, ?service=<solution slug>,
 * ?readiness=<score>, ?topic=<value> (the form that existed before this one
 * used ?topic, and pages across the site still link that way).
 *
 * The step transition is a CSS keyframe (`.arc-step`) rather than
 * framer-motion. This is the most conversion-critical page on the site and
 * the animation is a 180ms fade and slide, so it is not worth ~35 kB of
 * JavaScript. Keyed on `step`, React remounts the panel and the animation
 * replays; prefers-reduced-motion in globals.css switches it off.
 */
export function InquiryForm() {
  const params = useSearchParams();
  const readiness = params.get("readiness");
  const demo = params.get("demo");
  const topic = params.get("topic");

  const initialType = initialProjectType({
    type: params.get("type"),
    service: params.get("service"),
    topic,
    readiness,
  });

  const [data, setData] = useState<InquiryPayload>({
    type: initialType,
    name: "",
    email: "",
    company: "",
    role: "",
    size: "",
    budget: "",
    timeline: "",
    message: [
      readiness ? `Readiness self-assessment score: ${readiness}/100.` : "",
      demo ? "Requesting an ARC Control demonstration." : "",
      topic && !readiness && !demo ? `Came from: ${topic}.` : "",
    ]
      .filter(Boolean)
      .join(" "),
    technical: "",
    company_website: "",
  });

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "sent">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [showTech, setShowTech] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    titleRef.current?.focus();
  }, [step, status]);

  const set = (key: keyof InquiryPayload, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const focusFirstError = (e: InquiryErrors) => {
    const first = Object.keys(e)[0];
    window.setTimeout(
      () => formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(),
      0,
    );
  };

  const next = () => {
    const e = validateInquiryStep(step, data);
    setErrors(e);
    if (Object.keys(e).length) {
      focusFirstError(e);
      return;
    }
    setStep((s) => s + 1);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (step < LAST_STEP) {
      next();
      return;
    }

    const e = validateInquiryStep(LAST_STEP, data);
    setErrors(e);
    if (Object.keys(e).length) {
      focusFirstError(e);
      return;
    }

    setStatus("sending");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topic: data.type }),
      });
      const payload = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setServerError(payload.error ?? null);
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setServerError("Network error. Nothing you entered was lost.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <InquirySuccess
        name={data.name}
        email={data.email}
        type={projectTypes.find((p) => p.id === data.type)?.label ?? "General inquiry"}
      />
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      className="rounded-xl border border-line bg-canvas p-6 sm:p-8"
      aria-labelledby="form-step-title"
    >
      <ol className="flex gap-2" aria-label="Form progress">
        {INQUIRY_STEPS.map((s, i) => (
          <li key={s} className="flex-1">
            <div className={cn("h-1 rounded-full", i <= step ? "bg-brand" : "bg-line")} />
            <span
              className={cn(
                "mt-2 block text-[12.5px]",
                i === step ? "font-medium text-ink" : "text-ink-3",
              )}
            >
              <span className="sr-only">
                {i < step ? "Completed: " : i === step ? "Current: " : ""}
              </span>
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex items-center justify-between gap-4">
        <h2
          id="form-step-title"
          ref={titleRef}
          tabIndex={-1}
          className="text-[22px] font-semibold text-ink outline-none"
        >
          {step === 0 ? "What is this about?" : null}
          {step === 1 ? "Who should we reply to?" : null}
          {step === 2 ? "Shape of the work" : null}
        </h2>
        {step > 0 && status !== "sending" ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex min-h-[40px] items-center gap-1 text-[14px] font-medium text-ink-2 hover:text-ink"
          >
            <ArrowLeft size={15} aria-hidden="true" /> Back
          </button>
        ) : null}
      </div>

      <div aria-live="assertive">
        {errorCount > 0 ? (
          <p className="mt-4 flex items-center gap-2 rounded-md border border-danger/25 bg-danger-subtle px-3.5 py-2.5 text-[14px] text-danger">
            <AlertCircle size={16} aria-hidden="true" />
            {errorCount === 1 ? "One field needs attention." : `${errorCount} fields need attention.`}
          </p>
        ) : null}
        {status === "error" ? (
          <div className="mt-4 rounded-md border border-danger/25 bg-danger-subtle px-4 py-3 text-[14px] text-danger">
            <p className="font-medium">We couldn’t send your message.</p>
            <p className="mt-1">
              {serverError ? `${serverError} ` : null}Nothing you entered was lost. Try again, or
              email{" "}
              <a href={`mailto:${arcSite.email}`} className="underline">
                {arcSite.email}
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>

      <div key={step} className="arc-step mt-6">
          {step === 0 ? (
            <fieldset>
              <legend className="sr-only">Project type</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {projectTypes.map((p) => {
                  const on = data.type === p.id;
                  return (
                    <label
                      key={p.id}
                      className={cn(
                        "relative flex min-h-[72px] cursor-pointer flex-col justify-center rounded-lg border px-4 py-3 pr-10 transition-colors duration-150",
                        on
                          ? "border-brand bg-brand-subtle"
                          : errors.type
                            ? "border-danger/40"
                            : "border-line hover:border-line-strong",
                      )}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={p.id}
                        checked={on}
                        onChange={() => set("type", p.id)}
                        aria-describedby={errors.type ? "err-type" : undefined}
                        className="peer sr-only"
                      />
                      <span className="text-[15px] font-medium text-ink">{p.label}</span>
                      <span className="mt-0.5 text-[13px] text-ink-2">{p.hint}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute right-3.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2",
                          on ? "border-brand bg-brand text-canvas" : "border-line-strong",
                        )}
                      >
                        {on ? <Check size={12} /> : null}
                      </span>
                    </label>
                  );
                })}
              </div>
              <FieldError id="err-type" message={errors.type} />
            </fieldset>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                label="Full name"
                name="name"
                value={data.name}
                onChange={set}
                error={errors.name}
                autoComplete="name"
                required
              />
              <TextField
                label="Work email"
                name="email"
                type="email"
                value={data.email}
                onChange={set}
                error={errors.email}
                autoComplete="email"
                required
              />
              <TextField
                label="Company"
                name="company"
                value={data.company}
                onChange={set}
                error={errors.company}
                autoComplete="organization"
                required
              />
              <TextField
                label="Role"
                name="role"
                value={data.role}
                onChange={set}
                autoComplete="organization-title"
                placeholder="e.g. CTO, Head of Platform"
              />
              <div className="sm:col-span-2">
                <ChoiceGroup
                  label="Company size"
                  name="size"
                  options={sizes}
                  value={data.size}
                  onChange={set}
                  optional
                />
              </div>
              {/* Honeypot. Hidden from people and from assistive technology;
                  the route accepts-and-drops anything that fills it so bots
                  get no signal that they were caught. */}
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
              >
                <label>
                  Company website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    name="company_website"
                    value={data.company_website}
                    onChange={(e) => set("company_website", e.target.value)}
                  />
                </label>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-6">
              <ChoiceGroup
                label="Budget range"
                name="budget"
                options={budgets}
                value={data.budget}
                onChange={set}
                error={errors.budget}
              />
              <ChoiceGroup
                label="Timeline"
                name="timeline"
                options={timelines}
                value={data.timeline}
                onChange={set}
                error={errors.timeline}
              />
              <div>
                <label htmlFor="f-message" className="text-[14px] font-medium text-ink">
                  What’s happening?
                </label>
                <p id="h-message" className="mt-0.5 text-[13px] text-ink-3">
                  The situation, not the solution. What’s in the way?
                </p>
                <textarea
                  id="f-message"
                  name="message"
                  rows={4}
                  value={data.message}
                  onChange={(e) => set("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={`h-message${errors.message ? " err-message" : ""}`}
                  maxLength={5000}
                  className={cn(
                    "mt-2 w-full rounded-md border bg-canvas px-3.5 py-3 text-[15px] text-ink focus:outline-none focus:ring-2",
                    errors.message
                      ? "border-danger focus:ring-danger/20"
                      : "border-line-strong focus:border-brand focus:ring-brand/20",
                  )}
                />
                <FieldError id="err-message" message={errors.message} />
              </div>

              <div className="rounded-lg border border-line">
                <button
                  type="button"
                  aria-expanded={showTech}
                  aria-controls="tech-panel"
                  onClick={() => setShowTech((v) => !v)}
                  className="flex min-h-[48px] w-full items-center justify-between px-4 text-left text-[14.5px] font-medium text-ink"
                >
                  Technical requirements
                  <span className="text-[13px] font-normal text-ink-3">
                    {showTech ? "Hide" : "Optional"}
                  </span>
                </button>
                {showTech ? (
                  <div id="tech-panel" className="border-t border-line px-4 pb-4 pt-3">
                    <label htmlFor="f-technical" className="text-[13px] text-ink-2">
                      Stack, constraints, compliance, systems involved, agents or MCP servers in use
                    </label>
                    <textarea
                      id="f-technical"
                      name="technical"
                      rows={3}
                      value={data.technical}
                      onChange={(e) => set("technical", e.target.value)}
                      maxLength={3000}
                      className="mt-2 w-full rounded-md border border-line-strong bg-canvas px-3.5 py-3 font-mono text-[13.5px] text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                ) : null}
              </div>
            </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="max-w-[320px] text-[12.5px] leading-relaxed text-ink-3">
          A person reads this and replies. No marketing list, no drip campaign.
        </p>
        <ArcButton type="submit" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : step < LAST_STEP ? (
            "Continue"
          ) : status === "error" ? (
            "Try again"
          ) : (
            "Send inquiry"
          )}
        </ArcButton>
      </div>
    </form>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: keyof InquiryPayload;
  value: string;
  onChange: (k: keyof InquiryPayload, v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className="text-[14px] font-medium text-ink">
        {label}
        {!required ? <span className="ml-1 font-normal text-ink-3">(optional)</span> : null}
      </label>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `err-${name}` : undefined}
        className={cn(
          "mt-2 h-12 w-full rounded-md border bg-canvas px-3.5 text-[15px] text-ink placeholder:text-ink-3 focus:outline-none focus:ring-2",
          error
            ? "border-danger focus:ring-danger/20"
            : "border-line-strong focus:border-brand focus:ring-brand/20",
        )}
      />
      <FieldError id={`err-${name}`} message={error} />
    </div>
  );
}

function ChoiceGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  optional,
}: {
  label: string;
  name: keyof InquiryPayload;
  options: string[];
  value: string;
  onChange: (k: keyof InquiryPayload, v: string) => void;
  error?: string;
  optional?: boolean;
}) {
  return (
    <fieldset aria-describedby={error ? `err-${name}` : undefined}>
      <legend className="text-[14px] font-medium text-ink">
        {label}
        {optional ? <span className="ml-1 font-normal text-ink-3">(optional)</span> : null}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const on = value === option;
          return (
            <label
              key={option}
              className={cn(
                "relative flex min-h-[44px] cursor-pointer items-center rounded-md border px-3.5 text-[14px] transition-colors duration-150",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2",
                on
                  ? "border-brand bg-brand-subtle font-medium text-ink"
                  : error
                    ? "border-danger/40 text-ink-2"
                    : "border-line-strong text-ink-2 hover:border-ink",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={on}
                onChange={() => onChange(name, option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
      <FieldError id={`err-${name}`} message={error} />
    </fieldset>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-danger">
      <AlertCircle size={13} aria-hidden="true" />
      {message}
    </p>
  );
}
