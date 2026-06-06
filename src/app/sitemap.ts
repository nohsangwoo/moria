import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const image = (src: string) => `${site.url}${src}`;

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        image("/images/motungi/hero.webp"),
        image("/images/motungi/product-cross-necklace.webp"),
        image("/brand/og-image.png"),
      ],
    },
    {
      url: `${site.url}/collections`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.86,
      images: [
        image("/images/motungi/collection/hero-studio.webp"),
        image("/images/motungi/collection/wear-daily.webp"),
        image("/images/motungi/collection/gift-fold.webp"),
      ],
    },
    {
      url: `${site.url}/news`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [
        image("/images/motungi/news/hero-showroom.webp"),
        image("/images/motungi/news/new-pendant.webp"),
      ],
    },
    {
      url: `${site.url}/collaboration`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      images: [
        image("/images/motungi/collaboration/hero-partnership.webp"),
        image("/images/motungi/collaboration/gift-table.webp"),
      ],
    },
    {
      url: `${site.url}/business`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.68,
      images: [
        image("/images/motungi/business/hero-desk.webp"),
        image("/images/motungi/business/documents-desk.webp"),
      ],
    },
    {
      url: `${site.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.66,
      images: [
        image("/images/motungi/business/packing-hands.webp"),
        image("/images/motungi/collaboration/gift-table.webp"),
      ],
    },
    {
      url: `${site.url}/rss.xml`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4,
    },
  ];
}
