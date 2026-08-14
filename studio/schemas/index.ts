import type { SchemaTypeDefinition } from "sanity";

/**
 * Schemas mirror the JSON files in /content one-for-one, using the same field
 * names. That keeps the build-time pull trivial (document -> JSON file) and
 * means the website's rendering code never had to change.
 *
 * Each type below is a singleton: exactly one document of it exists, so the
 * editor sees a simple form rather than a list.
 */


/**
 * A project photograph.
 *
 * Alt text is required: it is what screen-reader users hear and what search
 * engines read, and an empty one is worse than no photo. `hotspot` lets the
 * owner choose what stays in frame when a photo is cropped to a card.
 */
const photo = {
  name: "photo",
  title: "Photo",
  type: "object",
  fields: [
    {
      name: "asset",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "alt",
      title: "Describe the photo",
      type: "string",
      description:
        "Plainly describe what is installed, e.g. \"Frameless corner shower with matte-black hinges\". Used by screen readers and search engines.",
      validation: (Rule: any) => Rule.required().min(10).max(160),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["showers", "railings", "custom"] },
      initialValue: "showers",
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: { select: { title: "alt", subtitle: "category", media: "asset" } },
};

const point = {
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "copy", title: "Text", type: "text", rows: 3 },
  ],
  preview: { select: { title: "title", subtitle: "copy" } },
};

const iconPoint = (options: string[]) => ({
  type: "object",
  fields: [
    {
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: options },
    },
    { name: "title", title: "Title", type: "string" },
    { name: "copy", title: "Text", type: "text", rows: 3 },
  ],
  preview: { select: { title: "title", subtitle: "copy" } },
});

const siteSettings: SchemaTypeDefinition = {
  name: "siteSettings",
  title: "Business details",
  type: "document",
  fields: [
    { name: "name", title: "Business name", type: "string" },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "description", title: "Short description", type: "text", rows: 3 },
    { name: "phoneDisplay", title: "Phone (shown on site)", type: "string" },
    {
      name: "phoneHref",
      title: "Phone link",
      type: "string",
      description: "Format: tel:+18185790569",
    },
    { name: "email", title: "Email (receives quote requests)", type: "string" },
    { name: "instagram", title: "Instagram URL", type: "url" },
    { name: "tiktok", title: "TikTok URL", type: "url" },
    { name: "hoursDays", title: "Open days", type: "string" },
    { name: "hoursTime", title: "Open hours", type: "string" },
    { name: "serviceAreaStatement", title: "Service area line", type: "string" },
    { name: "yearsExperience", title: "Years of experience", type: "string" },
    { name: "completedProjects", title: "Completed projects", type: "string" },
    { name: "insured", title: "Insured", type: "boolean" },
    { name: "freeEstimates", title: "Free estimates", type: "boolean" },
  ],
  preview: { prepare: () => ({ title: "Business details" }) },
};

const homePage: SchemaTypeDefinition = {
  name: "homePage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "services", title: "Services" },
    { name: "featured", title: "Featured" },
    { name: "why", title: "Why us" },
    { name: "process", title: "Process" },
    { name: "expect", title: "What to expect" },
    { name: "rest", title: "Area, FAQ & CTA" },
  ],
  fields: [
    { name: "heroHeading", title: "Hero headline", type: "string", group: "hero" },
    { name: "heroBody", title: "Hero paragraph", type: "text", rows: 3, group: "hero" },
    { name: "heroPrimaryCta", title: "Main button", type: "string", group: "hero" },
    { name: "heroSecondaryCta", title: "Second button", type: "string", group: "hero" },

    { name: "servicesEyebrow", title: "Small label", type: "string", group: "services" },
    { name: "servicesHeading", title: "Heading", type: "string", group: "services" },
    { name: "servicesCopy", title: "Paragraph", type: "text", rows: 3, group: "services" },

    { name: "featuredEyebrow", title: "Small label", type: "string", group: "featured" },
    { name: "featuredHeading", title: "Heading", type: "string", group: "featured" },
    { name: "featuredCopy", title: "Paragraph", type: "text", rows: 2, group: "featured" },
    { name: "socialHeading", title: "Social heading", type: "string", group: "featured" },
    { name: "socialCopy", title: "Social paragraph", type: "string", group: "featured" },

    { name: "whyEyebrow", title: "Small label", type: "string", group: "why" },
    { name: "whyHeading", title: "Heading", type: "string", group: "why" },
    { name: "whyCopy", title: "Paragraph", type: "text", rows: 3, group: "why" },
    {
      name: "whyPoints",
      title: "Points",
      type: "array",
      group: "why",
      of: [iconPoint(["ruler", "wrench", "sparkles", "message", "pin", "images"])],
    },

    { name: "processEyebrow", title: "Small label", type: "string", group: "process" },
    { name: "processHeading", title: "Heading", type: "string", group: "process" },
    { name: "processCopy", title: "Paragraph", type: "string", group: "process" },
    {
      name: "processSteps",
      title: "Steps",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Number (01)", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "copy", title: "Text", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title", subtitle: "copy" } },
        },
      ],
    },

    { name: "expectEyebrow", title: "Small label", type: "string", group: "expect" },
    { name: "expectHeading", title: "Heading", type: "string", group: "expect" },
    { name: "expectCopy", title: "Paragraph", type: "string", group: "expect" },
    { name: "expectPoints", title: "Points", type: "array", group: "expect", of: [point] },

    { name: "areaEyebrow", title: "Service area label", type: "string", group: "rest" },
    { name: "areaHeading", title: "Service area heading", type: "string", group: "rest" },
    { name: "areaCopy", title: "Service area paragraph", type: "text", rows: 3, group: "rest" },
    { name: "faqEyebrow", title: "FAQ label", type: "string", group: "rest" },
    { name: "faqHeading", title: "FAQ heading", type: "string", group: "rest" },
    { name: "ctaEyebrow", title: "Final CTA label", type: "string", group: "rest" },
    { name: "ctaHeading", title: "Final CTA heading", type: "string", group: "rest" },
    { name: "ctaCopy", title: "Final CTA paragraph", type: "text", rows: 3, group: "rest" },
    { name: "ctaButton", title: "Final CTA button", type: "string", group: "rest" },
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
};

const aboutPage: SchemaTypeDefinition = {
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    { name: "introEyebrow", title: "Intro label", type: "string" },
    { name: "introHeading", title: "Intro heading", type: "string" },
    {
      name: "introParagraphs",
      title: "Intro paragraphs",
      type: "array",
      of: [{ type: "text" }],
    },
    { name: "craftEyebrow", title: "Standards label", type: "string" },
    { name: "craftHeading", title: "Standards heading", type: "string" },
    { name: "craftCopy", title: "Standards paragraph", type: "text", rows: 3 },
    { name: "craftPoints", title: "Standards points", type: "array", of: [point] },
    { name: "serveEyebrow", title: "Who we serve label", type: "string" },
    { name: "serveHeading", title: "Who we serve heading", type: "string" },
    { name: "serveCopy", title: "Who we serve paragraph", type: "text", rows: 3 },
    {
      name: "audiences",
      title: "Who we serve list",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: ["home", "hardhat", "compass", "building"] },
            },
            { name: "label", title: "Label", type: "string" },
          ],
          preview: { select: { title: "label" } },
        },
      ],
    },
    { name: "serveFootnote", title: "Footnote", type: "text", rows: 2 },
  ],
  preview: { prepare: () => ({ title: "About page" }) },
};

const pageHeadings: SchemaTypeDefinition = {
  name: "pageHeadings",
  title: "Other page headings",
  type: "document",
  fields: [
    "aboutIntroEyebrow,About label,string",
    "aboutIntroTitle,About title,string",
    "aboutIntroCopy,About intro,text",
    "servicesIntroEyebrow,Services label,string",
    "servicesIntroTitle,Services title,string",
    "servicesIntroCopy,Services intro,text",
    "galleryIntroEyebrow,Gallery label,string",
    "galleryIntroTitle,Gallery title,string",
    "galleryIntroCopy,Gallery intro,text",
    "contactIntroEyebrow,Contact label,string",
    "contactIntroTitle,Contact title,string",
    "contactIntroCopy,Contact intro,text",
    "contactAsideHeading,Contact sidebar heading,string",
    "contactAsideCopy,Contact sidebar text,text",
    "privacyIntroEyebrow,Privacy label,string",
    "privacyIntroTitle,Privacy title,string",
    "privacyIntroCopy,Privacy intro,text",
    "privacyBody,Privacy body,text",
    "privacyFootnote,Privacy footnote,text",
    "notFoundEyebrow,404 label,string",
    "notFoundTitle,404 title,string",
    "notFoundCopy,404 text,text",
  ].map((spec) => {
    const [name, title, type] = spec.split(",");
    return { name, title, type, ...(type === "text" ? { rows: 3 } : {}) };
  }),
  preview: { prepare: () => ({ title: "Other page headings" }) },
};

const servicesList: SchemaTypeDefinition = {
  name: "servicesList",
  title: "Services",
  type: "document",
  fields: [
    {
      name: "items",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "slug",
              title: "Slug",
              type: "string",
              description: "Used in links — do not change once live.",
            },
            { name: "href", title: "Link", type: "string" },
            { name: "title", title: "Title", type: "string" },
            {
              name: "photo",
              title: "Photo",
              type: photo.type,
              fields: photo.fields,
            },
            { name: "summary", title: "Card summary", type: "text", rows: 2 },
            { name: "description", title: "Long description", type: "text", rows: 3 },
            { name: "intro", title: "Detail page intro", type: "text", rows: 4 },
            { name: "details", title: "Detail page points", type: "array", of: [point] },
          ],
          preview: { select: { title: "title", subtitle: "summary" } },
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "Services" }) },
};

const faqList: SchemaTypeDefinition = {
  name: "faqList",
  title: "FAQ",
  type: "document",
  fields: [
    {
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Answer", type: "text", rows: 4 },
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "FAQ" }) },
};


const galleryList: SchemaTypeDefinition = {
  name: "galleryList",
  title: "Photo gallery",
  type: "document",
  fields: [
    {
      name: "items",
      title: "Photos",
      description:
        "Drag to reorder. These appear on the Gallery page and the homepage featured section.",
      type: "array",
      of: [photo],
    },
  ],
  preview: { prepare: () => ({ title: "Photo gallery" }) },
};

/**
 * Customer reviews.
 *
 * Nothing a visitor submits on the website lands here automatically: reviews
 * arrive by email and are typed in — or pasted from Google — only after they
 * have been read. That is deliberate. It is also why there is no field for
 * an overall star average: the site shows the reviews it actually has.
 */
const review = {
  name: "review",
  title: "Review",
  type: "object",
  fields: [
    {
      name: "quote",
      title: "What they said",
      type: "text",
      rows: 5,
      description: "Paste their words. Fix typos if you like, but do not rewrite the meaning.",
      validation: (Rule: any) => Rule.required().min(20).max(1500),
    },
    {
      name: "name",
      title: "Name to show",
      type: "string",
      description: "The name they agreed to be shown by, e.g. \"Jane R.\"",
      validation: (Rule: any) => Rule.required().min(2).max(60),
    },
    {
      name: "rating",
      title: "Rating out of 5",
      type: "number",
      options: { list: [5, 4, 3, 2, 1] },
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    { name: "location", title: "City (optional)", type: "string" },
    { name: "service", title: "Work it was for (optional)", type: "string" },
    {
      name: "source",
      title: "Where it came from",
      type: "string",
      options: { list: ["Website", "Google", "Yelp"] },
      initialValue: "Website",
    },
  ],
  preview: { select: { title: "name", subtitle: "quote" } },
};

const reviewsList: SchemaTypeDefinition = {
  name: "reviewsList",
  title: "Reviews",
  type: "document",
  fields: [
    {
      name: "items",
      title: "Published reviews",
      description:
        "Only add reviews a real customer actually wrote. Drag to reorder — the first ones are read most.",
      type: "array",
      of: [review],
    },
    { name: "introEyebrow", title: "Page label", type: "string" },
    { name: "introTitle", title: "Page heading", type: "string" },
    { name: "introCopy", title: "Page intro", type: "text", rows: 3 },
    { name: "formHeading", title: "Form heading", type: "string" },
    { name: "formCopy", title: "Form intro", type: "text", rows: 3 },
  ],
  preview: { prepare: () => ({ title: "Reviews" }) },
};

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homePage,
  aboutPage,
  pageHeadings,
  servicesList,
  galleryList,
  faqList,
  reviewsList,
];

/** Document types that should exist exactly once. */
export const SINGLETONS = schemaTypes.map((t) => t.name);
