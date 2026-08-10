import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes, SINGLETONS } from "./schemas";

/**
 * LA Glass content studio.
 *
 * Lives in its own folder with its own dependencies so the (large) Studio
 * bundle never enters the website build — the marketing site stays lean.
 *
 * Every document type is a singleton, so the editor opens straight into a
 * form instead of an empty "create document" list.
 */
export default defineConfig({
  name: "laglass",
  title: "LA Glass",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Website content")
          .items(
            schemaTypes.map((type) =>
              S.listItem()
                .title(type.title ?? type.name)
                .id(type.name)
                .child(
                  S.document()
                    .schemaType(type.name)
                    // Fixed id => one document per type, never duplicates.
                    .documentId(type.name)
                    .title(type.title ?? type.name),
                ),
            ),
          ),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Hide the global "create new" action for singletons.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },

  document: {
    actions: (input, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? input.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? ""),
          )
        : input,
  },
});
