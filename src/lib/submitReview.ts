import { reviewSchema, type ReviewResult } from "@/lib/validation/review";
import { business } from "@/lib/business";

/**
 * Sends a review to FormSubmit from the browser.
 *
 * Same route as the quote form, for the same reason: a static build has no
 * server. The important difference is what happens afterwards — a review is
 * only ever an email until the owner chooses to publish it in the studio. That
 * keeps the site's promise that no review it displays was invented, and gives
 * the owner a moderation step by default rather than as an afterthought.
 */
const ENDPOINT = "https://formsubmit.co/ajax/";

export async function submitReview(payload: unknown): Promise<ReviewResult> {
  const parsed = reviewSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, error: "Please check the highlighted fields and try again." };
  }

  const data = parsed.data;

  // Honeypot: accept silently so bots get no signal, but send nothing.
  if (data.company) return { ok: true };

  const target = import.meta.env.VITE_FORMSUBMIT_TOKEN || business.email;
  const fallback = `Sorry — we couldn't send that just now. Please email ${business.email} and we'll add your review.`;

  try {
    const response = await fetch(`${ENDPOINT}${encodeURIComponent(target)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `New review — ${data.rating}/5 from ${data.name}`,
        _template: "table",
        _captcha: "false",
        _replyto: data.email,
        Rating: `${data.rating} out of 5`,
        "Display name": data.name,
        Email: data.email,
        Location: data.location || "—",
        Service: data.service,
        Review: data.quote,
        "Agreed to publication": "Yes",
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) return { ok: false, error: fallback };

    const result = (await response.json()) as {
      success?: string | boolean;
      message?: string;
    };
    const success = result.success === true || result.success === "true";
    if (!success) {
      if (result.message?.toLowerCase().includes("activation")) {
        console.error(
          "[review] FormSubmit needs activation — click the link it emailed to the destination inbox.",
        );
      }
      return { ok: false, error: fallback };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: fallback };
  }
}
