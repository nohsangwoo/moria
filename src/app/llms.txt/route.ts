import { products, services, site, stories } from "@/lib/site";

export function GET() {
  const body = `# ${site.name} · ${site.legalName}

URL: ${site.url}
Brand operator: ${site.legalName}
Business registration: ${site.businessRegistration}

${site.description}

## Primary SEO keywords
${site.keywords.map((keyword) => `- ${keyword}`).join("\n")}

## Services
${services.map((service) => `- ${service.title}: ${service.description}`).join("\n")}

## Products
${products.map((product) => `- ${product.title}: ${product.detail}`).join("\n")}

## Editorial stories
${stories.map((story) => `- ${story.meta}: ${story.text}`).join("\n")}

## Company
- Legal name: ${site.legalName}
- Owner: ${site.owner}
- Opening date: ${site.openingDate}
- Business type: ${site.businessType}
- Business item: ${site.businessItem}
- Business registration: ${site.businessRegistration}
- Address: ${site.address.english}
- Email: ${site.email}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
