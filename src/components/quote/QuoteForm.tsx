import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import {
  CONTACT_METHODS,
  PROJECT_TYPES,
  quoteSchema,
  type QuoteInput,
} from "@/lib/validation/quote";
import { submitQuote } from "@/lib/submitQuote";
import { business } from "@/lib/business";
import { cn } from "@/lib/cn";

const field =
  "w-full rounded-btn border border-line bg-surface px-4 py-3 text-base text-ink transition-[border-color,box-shadow] duration-200 ease-glass placeholder:text-muted/60 hover:border-brass/50 focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/25 motion-reduce:transition-none";
const labelClass = "block text-sm font-semibold text-ink";
const errorClass = "mt-1.5 flex items-center gap-1.5 text-sm text-red-700";

export function QuoteForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await submitQuote(values);
    if (result.ok) {
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setServerError(result.error);
    }
  });

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-panel border border-line bg-surface p-8 text-center sm:p-12"
      >
        <CheckCircle2 aria-hidden className="mx-auto size-12 text-brass" strokeWidth={1.5} />
        <h2 className="mt-5 font-display text-2xl text-ink sm:text-3xl">
          Request sent
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          Thanks — your project details are on their way to LA Glass. You&apos;ll
          hear back about the next step. Need it sooner? Call{" "}
          <a
            href={business.phone.href}
            className="font-medium text-brass-strong underline-offset-4 hover:underline"
          >
            {business.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-panel border border-line bg-surface p-6 sm:p-10"
    >
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Rivera"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(field, "mt-2", errors.name && "border-red-600")}
            {...register("name")}
          />
          {errors.name ? (
            <p id="name-error" className={errorClass}>
              <TriangleAlert aria-hidden className="size-4 shrink-0" />
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(818) 555-0142"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(field, "mt-2", errors.phone && "border-red-600")}
            {...register("phone")}
          />
          {errors.phone ? (
            <p id="phone-error" className={errorClass}>
              <TriangleAlert aria-hidden className="size-4 shrink-0" />
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="jane@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(field, "mt-2", errors.email && "border-red-600")}
            {...register("email")}
          />
          {errors.email ? (
            <p id="email-error" className={errorClass}>
              <TriangleAlert aria-hidden className="size-4 shrink-0" />
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>
            City or ZIP code
          </label>
          <input
            id="location"
            type="text"
            autoComplete="postal-code"
            placeholder="Sherman Oaks, 91403"
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? "location-error" : undefined}
            className={cn(field, "mt-2", errors.location && "border-red-600")}
            {...register("location")}
          />
          {errors.location ? (
            <p id="location-error" className={errorClass}>
              <TriangleAlert aria-hidden className="size-4 shrink-0" />
              {errors.location.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="projectType" className={labelClass}>
            Project type
          </label>
          <select
            id="projectType"
            defaultValue=""
            aria-invalid={!!errors.projectType}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
            className={cn(field, "mt-2 bg-surface", errors.projectType && "border-red-600")}
            {...register("projectType")}
          >
            <option value="" disabled>
              Choose one…
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType ? (
            <p id="projectType-error" className={errorClass}>
              <TriangleAlert aria-hidden className="size-4 shrink-0" />
              {errors.projectType.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contactMethod" className={labelClass}>
            Preferred contact
          </label>
          <select
            id="contactMethod"
            defaultValue=""
            aria-invalid={!!errors.contactMethod}
            aria-describedby={errors.contactMethod ? "contactMethod-error" : undefined}
            className={cn(field, "mt-2 bg-surface", errors.contactMethod && "border-red-600")}
            {...register("contactMethod")}
          >
            <option value="" disabled>
              Choose one…
            </option>
            {CONTACT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          {errors.contactMethod ? (
            <p id="contactMethod-error" className={errorClass}>
              <TriangleAlert aria-hidden className="size-4 shrink-0" />
              {errors.contactMethod.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>
          Project details
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Rough dimensions, the room, hardware finish you like, and your timing…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(field, "mt-2 resize-y", errors.message && "border-red-600")}
          {...register("message")}
        />
        {errors.message ? (
          <p id="message-error" className={errorClass}>
            <TriangleAlert aria-hidden className="size-4 shrink-0" />
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className="mt-6">
        <label
          htmlFor="consent"
          className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted"
        >
          <input
            id="consent"
            type="checkbox"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 size-6 shrink-0 cursor-pointer accent-brass"
            {...register("consent")}
          />
          <span>
            LA Glass can contact me about this project. Your details are used
            only to prepare your free estimate — never sold or published.
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className={errorClass}>
            <TriangleAlert aria-hidden className="size-4 shrink-0" />
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      {serverError ? (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2 rounded-btn border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-800"
        >
          <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="btn-shine group mt-8 inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-btn bg-ink px-7 text-base font-medium text-cream shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-glass hover:-translate-y-0.5 hover:bg-charcoal hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send project details
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 ease-glass group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </>
        )}
      </button>
    </form>
  );
}
