import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2, Star, TriangleAlert } from "lucide-react";
import {
  RATINGS,
  REVIEW_SERVICES,
  reviewSchema,
  type ReviewInput,
  type ReviewValues,
} from "@/lib/validation/review";
import { submitReview } from "@/lib/submitReview";
import { business } from "@/lib/business";
import { cn } from "@/lib/cn";

const field =
  "w-full rounded-btn border border-line bg-surface px-4 py-3 text-base text-ink transition-[border-color,box-shadow] duration-200 ease-glass placeholder:text-muted/60 hover:border-brass/50 focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/25 motion-reduce:transition-none";
const labelClass = "block text-sm font-semibold text-ink";
const errorClass = "mt-1.5 flex items-center gap-1.5 text-sm text-red-700";

export function ReviewForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // The schema turns the rating string into a number, so the values the
    // submit handler receives are not the values the fields hold. The third
    // generic is what tells React Hook Form about that.
  } = useForm<ReviewInput, unknown, ReviewValues>({
    resolver: zodResolver(reviewSchema),
    mode: "onBlur",
    defaultValues: { rating: "5" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await submitReview(values);
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
        <h2 className="mt-5 font-display text-2xl text-ink sm:text-3xl">Thank you</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          Your review is on its way to LA Glass. Every review is read before it
          goes on the site, so it may be a little while before it appears here.
          Anything else you need? Call{" "}
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
        <label htmlFor="review-company">Company</label>
        <input
          id="review-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      {/*
        Radio buttons rather than a select: the rating is the one answer worth
        making a single tap, and radios keep it keyboard- and screen-reader
        friendly without any custom widget code. The stars are decorative — the
        label text is what is announced.
      */}
      <fieldset>
        <legend className={labelClass}>Your rating</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {/*
            The selected state is styled from the checked input with `has-`
            rather than from React state. Watching the field would re-render
            the whole form on every keystroke elsewhere, and the browser
            already knows which radio is checked.
          */}
          {RATINGS.map((value) => (
            <label
              key={value}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-btn border px-4 text-sm font-medium",
                "border-line bg-surface text-ink hover:border-brass/50",
                "transition-[background-color,border-color,color] duration-200 ease-glass",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brass",
                "has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-cream",
                "[&:has(:checked)_svg]:text-brass-soft",
              )}
            >
              <input
                type="radio"
                value={value}
                className="sr-only"
                {...register("rating")}
              />
              <span className="flex" aria-hidden>
                {Array.from({ length: Number(value) }, (_, i) => (
                  <Star key={i} className="size-4 text-brass" fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              {value} out of 5
            </label>
          ))}
        </div>
        {errors.rating ? (
          <p className={errorClass}>
            <TriangleAlert aria-hidden className="size-4 shrink-0" />
            {errors.rating.message}
          </p>
        ) : null}
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="review-name" className={labelClass}>
            Name to show
          </label>
          <input
            id="review-name"
            type="text"
            autoComplete="name"
            placeholder="Jane R."
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "review-name-error" : "review-name-hint"}
            className={cn(field, "mt-2", errors.name && "border-red-600")}
            {...register("name")}
          />
          {errors.name ? (
            <p id="review-name-error" className={errorClass}>
              <TriangleAlert aria-hidden className="size-4 shrink-0" />
              {errors.name.message}
            </p>
          ) : (
            <p id="review-name-hint" className="mt-1.5 text-sm text-muted">
              A first name and last initial is plenty.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="review-email" className={labelClass}>
            Email
          </label>
          <input
            id="review-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="jane@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "review-email-error" : "review-email-hint"}
            className={cn(field, "mt-2", errors.email && "border-red-600")}
            {...register("email")}
          />
          {errors.email ? (
            <p id="review-email-error" className={errorClass}>
              <TriangleAlert aria-hidden className="size-4 shrink-0" />
              {errors.email.message}
            </p>
          ) : (
            <p id="review-email-hint" className="mt-1.5 text-sm text-muted">
              Never published — it is only so LA Glass can reach you.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="review-service" className={labelClass}>
            What was the work?
          </label>
          <select
            id="review-service"
            defaultValue=""
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "review-service-error" : undefined}
            className={cn(field, "mt-2 bg-surface", errors.service && "border-red-600")}
            {...register("service")}
          >
            <option value="" disabled>
              Choose one…
            </option>
            {REVIEW_SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service ? (
            <p id="review-service-error" className={errorClass}>
              <TriangleAlert aria-hidden className="size-4 shrink-0" />
              {errors.service.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="review-location" className={labelClass}>
            City <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="review-location"
            type="text"
            autoComplete="address-level2"
            placeholder="Sherman Oaks"
            aria-invalid={!!errors.location}
            className={cn(field, "mt-2", errors.location && "border-red-600")}
            {...register("location")}
          />
          {errors.location ? (
            <p className={errorClass}>
              <TriangleAlert aria-hidden className="size-4 shrink-0" />
              {errors.location.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="review-quote" className={labelClass}>
          Your review
        </label>
        <textarea
          id="review-quote"
          rows={6}
          placeholder="How the project went, how the finished glass looks, anything another customer would want to know…"
          aria-invalid={!!errors.quote}
          aria-describedby={errors.quote ? "review-quote-error" : undefined}
          className={cn(field, "mt-2 resize-y", errors.quote && "border-red-600")}
          {...register("quote")}
        />
        {errors.quote ? (
          <p id="review-quote-error" className={errorClass}>
            <TriangleAlert aria-hidden className="size-4 shrink-0" />
            {errors.quote.message}
          </p>
        ) : null}
      </div>

      <div className="mt-6">
        <label
          htmlFor="review-consent"
          className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted"
        >
          <input
            id="review-consent"
            type="checkbox"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "review-consent-error" : undefined}
            className="mt-0.5 size-6 shrink-0 cursor-pointer accent-brass"
            {...register("consent")}
          />
          <span>
            LA Glass may publish this review on its website, shown with the name
            and city above. Your email address is never published.
          </span>
        </label>
        {errors.consent ? (
          <p id="review-consent-error" className={errorClass}>
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
            Submit review
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
