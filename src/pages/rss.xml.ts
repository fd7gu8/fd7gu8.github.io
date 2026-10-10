import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../lib/posts';
import { site } from '../site';

export async function GET(context: APIContext) {
  const posts = await getPosts({ publishedOnly: true });
  return rss({
    title: site.title,
    description: site.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? site.description,
      link: postUrl(post.id),
    })),
    customData: '<language>ko</language>',
  });
}
