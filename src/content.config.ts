import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    order: z.number(),
    titleZh: z.string(),
    titleEn: z.string(),
    descZh: z.string(),
    descEn: z.string(),
    image: z.string(),
    links: z.array(z.object({
      labelZh: z.string(),
      labelEn: z.string(),
      url: z.string(),
    })),
  }),
});

export const collections = { projects };
