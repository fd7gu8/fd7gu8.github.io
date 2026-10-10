import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    type: z.enum(['article', 'note']),
    published: z.boolean().default(false),
    math: z.boolean().default(false),
    description: z.string().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
