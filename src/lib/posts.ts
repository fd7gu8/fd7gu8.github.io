import { getCollection } from 'astro:content';

export async function getPosts({ publishedOnly = false } = {}) {
  const posts = await getCollection('blog', ({ data }) =>
    data.published || (import.meta.env.DEV && !publishedOnly),
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id));
}

export const postUrl = (id: string) => `/blog/${id}/`;
export const formatDate = (date: Date) => date.toISOString().slice(0, 10);
