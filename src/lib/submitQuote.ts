import { quoteSchema, type QuoteResult } from "@/lib/validation/quote";
import { business } from "@/lib/business";

/**
 * Sends a quote request to FormSubmit from the browser.
 *
 * A static build has no server, so this call can no longer be made server-side
 * as it was under Next.js. Two consequences worth knowing:
 *
 *  - Validation here is the only validation. It still runs (same Zod schema),
 *    but a determined sender could post to FormSubmit directly.
 *  - The destination is exposed in the bundle. Set VITE_FORMSUBMIT_TOKEN to
 *    FormSubmit's random endpoint code (available in its dashboard once the
 *    inbox is activated) and the email address stays out of the shipped code.
 */
const ENDPOINT = "https://formsubmit.co/ajax/";

export async function submitQuote(payload: unknown): Promise<QuoteResult> {
  const parsed = quoteSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, error: "Please check the highlighted fields and try again." };
  }

  const data = parsed.data;

  // Honeypot: accept silently so bots get no signal, but send nothing.
  if (data.company) return { ok: true };

  const target = import.meta.env.VITE_FORMSUBMIT_TOKEN || business.email;
  const fallback = `Sorry — we couldn't send that just now. Please call ${business.phone.display} or email ${business.email} and we'll get right back to you.`;

  try {
    const response = await fetch(`${ENDPOINT}${encodeURIComponent(target)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `New quote request — ${data.projectType} (${data.location})`,
        _template: "table",
        _captcha: "false",
        _replyto: data.email,
        Name: data.name,
        Phone: data.phone,
        Email: data.email,
        "Project type": data.projectType,
        "City / ZIP": data.location,
        "Preferred contact": data.contactMethod,
        Details: data.message,
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
          "[quote] FormSubmit needs activation — click the link it emailed to the destination inbox.",
        );
      }
      return { ok: false, error: fallback };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: fallback };
  }
}
