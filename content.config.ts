import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        image: z.string(),
        tags: z.string().optional(),
        title: z.string(),
        description: z.string(),
        color: z.union([z.string(), z.number()]).default("000000"),
      }),
    }),
  },
});
