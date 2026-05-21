"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { budgets } from "@/lib/content";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Use a valid email"),
  company: z.string().optional(),
  budget: z.string().min(1, "Pick a range"),
  message: z.string().min(10, "A sentence or two helps"),
});
type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({ ok: false, error: "Network error" }));
      if (!res.ok || !json.ok) {
        throw new Error(typeof json.error === "string" ? json.error : "Send failed");
      }
      setSent(true);
      reset();
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Send failed. Please email support@codarti.com directly.");
    }
  };

  // Reset sent + error state once the user touches the form again.
  const resetSent = () => {
    if (sent) setSent(false);
    if (serverError) setServerError(null);
  };

  return (
    <section id="contact" className="section-y bg-[var(--ink)] text-[var(--bone)]">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-8 gap-y-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow !text-[var(--bone)]/60">(09) — Contact</div>
          </div>

          <RevealOnScroll className="col-span-12 md:col-span-9">
            <h2 className="font-serif text-[clamp(48px,8vw,140px)] leading-[0.95] mb-16 max-w-4xl">
              Tell us about <br />
              the work.
            </h2>

            <div className="grid grid-cols-12 gap-x-8 gap-y-16">
              <form
                onSubmit={handleSubmit(onSubmit)}
                onChange={resetSent}
                className="col-span-12 lg:col-span-7 space-y-10"
              >
                <Field label="Your name" error={errors.name?.message}>
                  <input
                    {...register("name", { required: "Required" })}
                    className="form-input" data-cursor="write"
                    placeholder="Ada Lovelace"
                  />
                </Field>

                <Field label="Email" error={errors.email?.message}>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Required",
                      pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                    })}
                    className="form-input" data-cursor="write"
                    placeholder="you@studio.com"
                  />
                </Field>

                <Field label="Company (optional)">
                  <input
                    {...register("company")}
                    className="form-input" data-cursor="write"
                    placeholder="Where you build"
                  />
                </Field>

                <Field label="Budget" error={errors.budget?.message}>
                  <select
                    {...register("budget", { required: "Required" })}
                    className="form-input bg-transparent"
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-[var(--ink)]">
                      Select a range
                    </option>
                    {budgets.map((b) => (
                      <option key={b} value={b} className="bg-[var(--ink)]">
                        {b}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="The project" error={errors.message?.message}>
                  <textarea
                    {...register("message", { required: "Required" })}
                    className="form-input min-h-[140px] resize-y"
                    placeholder="What are you building, and what stage are you at?"
                  />
                </Field>

                <div className="space-y-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[var(--bone)] text-[var(--ink)] text-sm font-medium hover:bg-[var(--accent)] hover:text-[var(--ink)] transition-colors disabled:opacity-60 disabled:cursor-wait"
                  >
                    {isSubmitting
                      ? "Sending..."
                      : sent
                        ? "Sent — we'll be in touch"
                        : "Send enquiry"}
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </motion.button>
                  {serverError && (
                    <p className="text-sm text-[var(--accent)] max-w-md">
                      {serverError}
                    </p>
                  )}
                  {sent && !serverError && (
                    <p className="text-sm text-[var(--bone)]/70 max-w-md">
                      Thank you. We&apos;ll reply within one business day.
                    </p>
                  )}
                </div>
              </form>

              <div className="col-span-12 lg:col-span-4 lg:col-start-9 space-y-10">
                <DetailRow
                  icon={<Mail className="w-5 h-5" strokeWidth={1.25} />}
                  label="Email"
                  value="support@codarti.com"
                  href="mailto:support@codarti.com"
                />
                <DetailRow
                  icon={<Phone className="w-5 h-5" strokeWidth={1.25} />}
                  label="Phone"
                  value="+260 970 627 630"
                  href="tel:+260970627630"
                />
                <DetailRow
                  icon={<MapPin className="w-5 h-5" strokeWidth={1.25} />}
                  label="Studio"
                  value={"Lusaka, Zambia"}
                />

                <div className="rule-t pt-8 mt-8 border-[var(--bone)]/15">
                  <div className="eyebrow !text-[var(--bone)]/60 mb-3">
                    Booking
                  </div>
                  <p className="text-[var(--bone)]/80 text-base leading-relaxed">
                    Currently accepting one new engagement per quarter.
                    Next opening: Q3 2026.
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(242, 238, 229, 0.2);
          color: var(--bone);
          font-family: var(--font-sans);
          font-size: 18px;
          padding: 12px 0;
          outline: none;
          transition: border-color 0.3s ease;
        }
        :global(.form-input::placeholder) {
          color: rgba(242, 238, 229, 0.3);
        }
        :global(.form-input:focus) {
          border-bottom-color: var(--accent);
        }
        :global(select.form-input) {
          appearance: none;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block eyebrow !text-[var(--bone)]/60 mb-3">
        {label}
        {error && (
          <span className="text-[var(--accent)] normal-case tracking-normal ml-3">
            — {error}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function DetailRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-5 group">
      <div className="w-11 h-11 rounded-full border border-[var(--bone)]/20 flex items-center justify-center shrink-0 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">
        {icon}
      </div>
      <div>
        <div className="eyebrow !text-[var(--bone)]/60 mb-2">{label}</div>
        <div className="text-base text-[var(--bone)] whitespace-pre-line group-hover:text-[var(--accent)] transition-colors">
          {value}
        </div>
      </div>
    </div>
  );

  return href ? <a href={href}>{content}</a> : <div>{content}</div>;
}
