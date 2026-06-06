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
    {
      title: `${site.name} The Quiet Cross Series`,
      link: `${site.url}/collections`,
      guid: `${site.url}/collections`,
      description: "모퉁이의 첫 컬렉션과 의미 있는 악세사리, 선물 오브제, 착용 장면을 소개합니다.",
    },
    {
      title: `${site.name} Season Letter 2026`,
      link: `${site.url}/news`,
      guid: `${site.url}/news`,
      description: "모퉁이 신제품, 시즌 쇼룸, 선물 굿즈와 파트너 안내를 담은 News 페이지입니다.",
    },
    {
      title: `${site.name} Collaboration`,
      link: `${site.url}/collaboration`,
      guid: `${site.url}/collaboration`,
      description: "교회 굿즈, 소모임 선물, 브랜드 협업, 편집숍 팝업을 위한 모퉁이 협업 안내 페이지입니다.",
    },
    {
      title: `${site.legalName} Business Info`,
      link: `${site.url}/business`,
      guid: `${site.url}/business`,
      description: `아기돌풍 김종란 대표, 사업자등록번호 ${site.businessRegistration}, ${site.businessType}, ${site.businessItem} 공개 사업자 정보 페이지입니다.`,
    },
    {
      title: `${site.name} Contact`,
      link: `${site.url}/contact`,
      guid: `${site.url}/contact`,
      description: "모퉁이 굿즈 제품 문의, 선물 패키지, 협업, 사업자 정보 확인을 위한 공식 문의 페이지입니다.",
    },
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
      link: `${site.url}/collections`,
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
        <title>${escapeXml(`${site.name} · 감각적인 굿즈 공식스토어`)}</title>
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
