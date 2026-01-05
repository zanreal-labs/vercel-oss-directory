import {
  defineCollections,
  defineConfig,
  defineDocs,
} from "fumadocs-mdx/config";
import { z } from "zod";

export const { docs, meta } = defineDocs({
  dir: "content/projects",
  docs: defineCollections({
    dir: "content/projects",
    type: "doc",
    schema: z.object({
      title: z.string(),
      name: z.string(),
      description: z.string(),
      cohort: z.string(),
      url: z.string(),
      docsUrl: z.string().optional(),
      stars: z.number().optional(),
      category: z.string(),
    }),
  }),
});

export default defineConfig();
