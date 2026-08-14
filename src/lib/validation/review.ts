import { z } from "zod";

/**
 * Schema for a review left through the website.
 *
 * A review is collected in order to be published, which is the opposite of the
 * quote form — so consent here is permission to publish, and the schema asks
 * for a display name the writer is happy to see on the site rather than their
 * full legal name.
 *
 * Nothing submitted here appears on the site automatically. Submissions are
 * emailed to LA Glass, and only reviews the owner publishes in the studio are
 * ever rendered.
 */
export const REVIEW_SERVICES = [
  "Frameless shower enclosure",
  "Shower door",
  "Glass railing",
  "Custom mirror",
  "Storefront",
  "Other custom glass",
] as const;

/**
 * Ratings are carried as strings because that is what a radio input's `value`
 * attribute is. React Hook Form compares the two literally, so a numeric
 * default would match no radio and the form would open with nothing selected.
 * The schema converts to a number on the way out.
 */
export const RATINGS = ["5", "4", "3", "2", "1"] as const;

export const reviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter the name you'd like shown with your review.")
    .max(60, "That name is too long."),
  email: z.email("Please enter a valid email address.").max(200),
  location: z
    .string()
    .trim()
    .max(100, "That location is too long.")
    .optional()
    .or(z.literal("")),
  service: z.enum(REVIEW_SERVICES, {
    message: "Please choose which work this review is about.",
  }),
  /*
   * Parsed twice on the way out: once by the form's resolver, then again by
   * submitReview as a last line of defence. The first parse turns "4" into 4,
   * so the second one has to accept a number too — hence normalising to a
   * string before the check rather than matching the raw radio value.
   */
  rating: z
    .preprocess(
      (value) => (typeof value === "number" ? String(value) : value),
      z.enum(RATINGS, { message: "Please choose a rating." }),
    )
    .transform(Number),
  quote: z
    .string()
    .trim()
    .min(20, "Please write at least a sentence or two.")
    .max(1500, "Please keep the review under 1500 characters."),
  consent: z.literal(true, {
    message: "Please confirm LA Glass may publish this review.",
  }),
  /**
   * Honeypot — real people never see this field, so anything in it came from a
   * bot. It deliberately accepts any string: rejecting it here would surface a
   * validation error, which tells the bot exactly which field gave it away.
   * submitReview checks it after parsing and silently drops the submission.
   */
  company: z.string().max(200).optional(),
});

export type ReviewInput = z.input<typeof reviewSchema>;
export type ReviewValues = z.output<typeof reviewSchema>;

export type ReviewResult = { ok: true } | { ok: false; error: string };
