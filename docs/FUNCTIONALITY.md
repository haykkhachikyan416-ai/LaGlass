# Functionality Requirements

## Navigation

- Responsive header
- Accessible mobile menu
- Active-page indication
- Smooth but standard anchor behavior
- Sticky or fixed behavior only if it improves usability
- Header contrast must remain readable over the hero

## Hero

- Supplied video added later
- Poster fallback
- Muted autoplay loop
- Plays inline
- Readable overlay
- Reduced-motion behavior
- Graceful failure when media cannot load
- No audio dependency
- No large layout shift

## Service cards

- Link to service pages where those pages exist
- Strong image and concise summary
- Keyboard-accessible
- Consistent hover/focus interaction
- No decorative buttons that do nothing

## Gallery

- Filter by confirmed categories
- Preserve keyboard accessibility
- Optimized responsive images
- Lazy loading below the fold
- Optional accessible lightbox
- URL state or project pages only if useful
- No fake projects
- No invented locations

## FAQ

- Accessible accordion
- Correct button semantics
- Keyboard support
- Visible focus
- Smooth height animation without content clipping
- Only approved FAQ answers

## Quote form

### Initial fields

- Full name
- Phone number
- Email
- Project type
- City or ZIP code
- Project description
- Preferred contact method
- Consent/acknowledgment text
- Honeypot field for basic spam reduction

### Optional later field

- Project photo upload

Do not implement photo upload until a secure storage or email-attachment method is chosen.

### Validation

Use React Hook Form and Zod on the client, plus independent Zod validation on the server.

Validate:

- Required fields
- Email format
- Reasonable phone input
- Allowed project types
- Minimum and maximum message length
- Honeypot field
- Allowed attachment type and size, when uploads are added

### Server behavior

Create a Next.js server route or server action that:

1. Accepts validated form data.
2. Rejects invalid or suspicious submissions.
3. Uses server-only environment variables.
4. Sends the request to the configured destination email.
5. Returns a clear success or safe error response.
6. Does not expose provider secrets or raw internal errors.
7. Logs only non-sensitive operational information.

### Suggested email configuration

Use an email provider through server-side code. The recipient must come from an environment variable so it can be changed without editing application code.

Required environment variables:

- `CONTACT_EMAIL`
- `FROM_EMAIL`
- `RESEND_API_KEY`, if Resend is selected

The form is not considered complete until:

- The sender/domain configuration is valid.
- A real submission reaches the intended inbox.
- Error behavior is tested.
- Spam behavior is reviewed.
- The production environment variables are configured.

### Submission states

- Idle
- Validating
- Sending
- Success
- Recoverable error

Prevent duplicate submissions while sending.

### Privacy

- Include a short privacy notice.
- Collect only needed information.
- Do not publish submissions.
- Do not store form data unless storage is intentionally added.
- Do not send uploaded files to an unconfigured destination.

## Social links

Add Instagram and TikTok after the exact URLs are supplied.

Requirements:

- External links open safely.
- Use accessible labels.
- Do not display an icon for an empty link.
- Keep social links editable from one data/config file.

## Analytics

Do not add analytics until the owner selects and approves a provider. When added, respect applicable consent and privacy requirements.

## Error pages

Create:

- Custom not-found page
- Friendly form errors
- Safe fallback when an image or video is missing

## Performance

- Optimize media
- Lazy-load below-the-fold content
- Avoid unnecessary client JavaScript
- Avoid autoplaying multiple videos
- Keep animation transform/opacity based where practical
- Check Core Web Vitals after real assets are added
