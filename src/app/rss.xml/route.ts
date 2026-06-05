import { products, services, site, stories } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const updated = new Date().toUTCString();
  const feedItems = [
    ...services.map((service) => ({
      title: `${site.name} ${service.title}`,
      link: `${site.url}/#services`,
      guid: `${site.url}/#service-${service.label}`,
      description: service.description,
    })),
    ...products.map((product) => ({
      title: `${site.name} ${product.title}`,
      link: `${site.url}/#products`,
      guid: `${site.url}/#product-${encodeURIComponent(product.title)}`,
      description: product.detail,
    })),
    ...stories.map((story) => ({
      title: `${site.name} ${story.text}`,
      link: `${site.url}/#collection`,
      guid: `${site.url}/#story-${encodeURIComponent(story.meta)}`,
      description: story.alt,
    })),
  ];

  const items = feedItems
    .map(
      (item) => `
        <item>
          <title>${escapeXml(item.title)}</title>
          <link>${item.link}</link>
          <guid>${item.guid}</guid>
          <description>${escapeXml(item.description)}</description>
          <pubDate>${updated}</pubDate>
        </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${escapeXml(`${site.name} · 모던 크리스찬 악세사리`)}</title>
        <link>${site.url}</link>
        <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
        <description>${escapeXml(site.description)}</description>
        <language>ko-KR</language>
        <lastBuildDate>${updated}</lastBuildDate>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
