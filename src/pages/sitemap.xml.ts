import { getCollection } from "astro:content";

export async function GET({ site }: { site: URL }) {
  const posts = await getCollection("blog");
  const postUrls = posts
    .filter((post) => !post.data.draft)
    .map((post) => ({
      loc: new URL(`/blog/${post.slug}/`, site).toString(),
      lastmod: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
    }));

  const urls = [
    {
      loc: new URL("/", site).toString(),
      lastmod: new Date().toISOString(),
    },
    {
      loc: new URL("/blog/", site).toString(),
      lastmod: new Date().toISOString(),
    },
    ...postUrls,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (url) =>
          `  <url>\n` +
          `    <loc>${url.loc}</loc>\n` +
          `    <lastmod>${url.lastmod}</lastmod>\n` +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
