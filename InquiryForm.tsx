import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { InquirySuccess } from './InquirySuccess';
import { budgets, projectTypes, serviceToType, sizes, timelines } from '../../data/inquiry';

type Data = {
  type: string;
  name: string;
  email: string;
  company: string;
  role: string;
  size: string;
  budget: string;
  timeline: string;
  message: string;
  technical: string;
  company_website: string; // honeypot, matches existing /api/contact
};

type Errors = Partial<Record<keyof Data, string>>;

const steps = ['Project', 'You and your company', 'Scope'];

export function InquiryForm() {
  const [params] = useSearchParams();
  const readiness = params.get('readiness');
  const initialType = params.get('type') === 'control' ? 'control' : serviceToType[params.get('service') ?? ''] ?? (readiness ? 'strategy' : '');

  const [data, setData] = useState<Data>({
    type: initialType,
    name: '',
    email: '',
    company: '',
    role: '',
    size: '',
    budget: '',
    timeline: '',
    message: readiness ? `Readiness self-assessment score: ${readiness}/100. ` : '',
    technical: '',
    company_website: '',
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'error' | 'sent'>('idle');
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

  const set = (k: keyof Data, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (s: number): Errors => {
    const e: Errors = {};
    if (s === 0 && !data.type) e.type = 'Choose the closest match. “Something else” is fine.';
    if (s === 1) {
      if (!data.name.trim()) e.name = 'Enter your name.';
      if (!data.email.trim()) e.email = 'Enter your work email.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'That email doesn’t look right. Check for typos.';
      if (!data.company.trim()) e.company = 'Enter your company name.';
    }
    if (s === 2) {
      if (!data.budget) e.budget = 'Choose a range, or “Not sure yet”.';
      if (!data.timeline) e.timeline = 'Choose a timeline.';
      if (data.message.trim().length < 20) e.message = 'A sentence or two about what’s happening (20 characters minimum).';
    }
    return e;
  };

  const focusFirstError = (e: Errors) => {
    const first = Object.keys(e)[0];
    window.setTimeout(() => formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(), 0);
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) return focusFirstError(e);
    setStep((s) => s + 1);
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    if (step < 2) return next();
    const e = validate(2);
    setErrors(e);
    if (Object.keys(e).length) return focusFirstError(e);
    setStatus('sending');
    // MOCK: replace with POST /api/contact (extended payload). See handoff.
    window.setTimeout(() => setStatus(data.email.includes('+fail') ? 'error' : 'sent'), 1100);
  };

  if (status === 'sent') {
    return <InquirySuccess name={data.name} email={data.email} type={projectTypes.find((p) => p.id === data.type)?.label ?? ''} />;
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="rounded-xl border border-line bg-canvas p-6 sm:p-8" aria-labelledby="form-step-title">
      <ol className="flex gap-2" aria-label="Form progress">
        {steps.map((s, i) => (
          <li key={s} className="flex-1">
            <div className={`h-1 rounded-full ${i <= step ? 'bg-brand' : 'bg-line'}`} />
            <span className={`mt-2 block text-[12.5px] ${i === step ? 'font-medium text-ink' : 'text-ink-3'}`}>
              <span className="sr-only">{i < step ? 'Completed: ' : i === step ? 'Current: ' : ''}</span>
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex items-center justify-between gap-4">
        <h2 id="form-step-title" ref={titleRef} tabIndex={-1} className="text-[22px] font-semibold text-ink outline-none">
          {step === 0 && 'What is this about?'}
          {step === 1 && 'Who should we reply to?'}
          {step === 2 && 'Shape of the work'}
        </h2>
        {step > 0 && status !== 'sending' && (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex min-h-[40px] items-center gap-1 text-[14px] font-medium text-ink-2 hover:text-ink">
            <ArrowLeft size={15} aria-hidden="true" /> Back
          </button>
        )}
      </div>

      <div aria-live="assertive">
        {errorCount > 0 && (
          <p className="mt-4 flex items-center gap-2 rounded-md border border-danger/25 bg-danger-subtle px-3.5 py-2.5 text-[14px] text-danger">
            <AlertCircle size={16} aria-hidden="true" />
            {errorCount === 1 ? 'One field needs attention.' : `${errorCount} fields need attention.`}
          </p>
        )}
        {status === 'error' && (
          <div className="mt-4 rounded-md border border-danger/25 bg-danger-subtle px-4 py-3 text-[14px] text-danger">
            <p className="font-medium">We couldn’t send your message.</p>
            <p className="mt-1">
              Nothing you entered was lost. Try again, or email{' '}
              <a href="mailto:aking@arctransformationgroup.com" className="underline">
                aking@arctransformationgroup.com
              </a>
              .
            </p>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6"
        >
          {step === 0 && (
            <fieldset>
              <legend className="sr-only">Project type</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {projectTypes.map((p) => {
                  const on = data.type === p.id;
                  return (
                    <label
                      key={p.id}
                      className={`relative flex min-h-[72px] cursor-pointer flex-col justify-center rounded-lg border px-4 py-3 pr-10 transition-colors duration-150 ${
                        on ? 'border-brand bg-brand-subtle' : errors.type ? 'border-danger/40' : 'border-line hover:border-line-strong'
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={p.id}
                        checked={on}
                        onChange={() => set('type', p.id)}
                        aria-describedby={errors.type ? 'err-type' : undefined}
                        className="peer sr-only"
                      />
                      <span className="text-[15px] font-medium text-ink">{p.label}</span>
                      <span className="mt-0.5 text-[13px] text-ink-2">{p.hint}</span>
                      <span
                        aria-hidden="true"
                        className={`absolute right-3.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2 ${
                          on ? 'border-brand bg-brand text-white' : 'border-line-strong'
                        }`}
                      >
                        {on && <Check size={12} />}
                      </span>
                    </label>
                  );
                })}
              </div>
              <FieldError id="err-type" msg={errors.type} />
            </fieldset>
          )}

          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Full name" name="name" value={data.name} onChange={set} error={errors.name} autoComplete="name" required />
              <TextField label="Work email" name="email" type="email" value={data.email} onChange={set} error={errors.email} autoComplete="email" required />
              <TextField label="Company" name="company" value={data.company} onChange={set} error={errors.company} autoComplete="organization" required />
              <TextField label="Role" name="role" value={data.role} onChange={set} autoComplete="organization-title" placeholder="e.g. CTO, Head of Platform" />
              <div className="sm:col-span-2">
                <ChoiceGroup label="Company size" name="size" options={sizes} value={data.size} onChange={set} optional />
              </div>
              {/* Honeypot — matches existing /api/contact. Hidden from people and assistive tech. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Company website
                  <input tabIndex={-1} autoComplete="off" name="company_website" value={data.company_website} onChange={(e) => set('company_website', e.target.value)} />
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <ChoiceGroup label="Budget range" name="budget" options={budgets} value={data.budget} onChange={set} error={errors.budget} />
              <ChoiceGroup label="Timeline" name="timeline" options={timelines} value={data.timeline} onChange={set} error={errors.timeline} />
              <div>
                <label htmlFor="f-message" className="text-[14px] font-medium text-ink">
                  What’s happening?
                </label>
                <p id="h-message" className="mt-0.5 text-[13px] text-ink-3">The situation, not the solution. What’s in the way?</p>
                <textarea
                  id="f-message"
                  name="message"
                  rows={4}
                  value={data.message}
                  onChange={(e) => set('message', e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={`h-message${errors.message ? ' err-message' : ''}`}
                  maxLength={5000}
                  className={`mt-2 w-full rounded-md border bg-canvas px-3.5 py-3 text-[15px] text-ink focus:outline-none focus:ring-2 ${
                    errors.message ? 'border-danger focus:ring-danger/20' : 'border-line-strong focus:border-brand focus:ring-brand/20'
                  }`}
                />
                <FieldError id="err-message" msg={errors.message} />
              </div>

              <div className="rounded-lg border border-line">
                <button
                  type="button"
                  aria-expanded={showTech}
                  aria-controls="tech-panel"
                  onClick={() => setShowTech((v) => !v)}
                  className="flex min-h-[48px] w-full items-center justify-between px-4 text-left text-[14.5px] font-medium text-ink"
                >
                  Technical requirements <span className="text-[13px] font-normal text-ink-3">{showTech ? 'Hide' : 'Optional'}</span>
                </button>
                {showTech && (
                  <div id="tech-panel" className="border-t border-line px-4 pb-4 pt-3">
                    <label htmlFor="f-technical" className="text-[13px] text-ink-2">
                      Stack, constraints, compliance, systems involved, agents or MCP servers in use
                    </label>
                    <textarea
                      id="f-technical"
                      name="technical"
                      rows={3}
                      value={data.technical}
                      onChange={(e) => set('technical', e.target.value)}
                      maxLength={3000}
                      className="mt-2 w-full rounded-md border border-line-strong bg-canvas px-3.5 py-3 font-mono text-[13.5px] text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="max-w-[300px] text-[12.5px] leading-relaxed text-ink-3">
          Prototype: nothing is sent. Use an email containing “+fail” to preview the error state.
        </p>
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : step < 2 ? (
            'Continue'
          ) : status === 'error' ? (
            'Try again'
          ) : (
            'Send inquiry'
          )}
        </Button>
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
  type = 'text',
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: keyof Data;
  value: string;
  onChange: (k: keyof Data, v: string) => void;
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
        {!required && <span className="ml-1 font-normal text-ink-3">(optional)</span>}
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
        aria-invalid={!!error}
        aria-describedby={error ? `err-${name}` : undefined}
        className={`mt-2 h-12 w-full rounded-md border bg-canvas px-3.5 text-[15px] text-ink placeholder:text-ink-3 focus:outline-none focus:ring-2 ${
          error ? 'border-danger focus:ring-danger/20' : 'border-line-strong focus:border-brand focus:ring-brand/20'
        }`}
      />
      <FieldError id={`err-${name}`} msg={error} />
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
  name: keyof Data;
  options: string[];
  value: string;
  onChange: (k: keyof Data, v: string) => void;
  error?: string;
  optional?: boolean;
}) {
  return (
    <fieldset aria-describedby={error ? `err-${name}` : undefined}>
      <legend className="text-[14px] font-medium text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-ink-3">(optional)</span>}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o;
          return (
            <label
              key={o}
              className={`relative flex min-h-[44px] cursor-pointer items-center rounded-md border px-3.5 text-[14px] transition-colors duration-150 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2 ${
                on ? 'border-brand bg-brand-subtle font-medium text-ink' : error ? 'border-danger/40 text-ink-2' : 'border-line-strong text-ink-2 hover:border-ink'
              }`}
            >
              <input type="radio" name={name} value={o} checked={on} onChange={() => onChange(name, o)} className="sr-only" />
              {o}
            </label>
          );
        })}
      </div>
      <FieldError id={`err-${name}`} msg={error} />
    </fieldset>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-danger">
      <AlertCircle size={13} aria-hidden="true" />
      {msg}
    </p>
  );
}
