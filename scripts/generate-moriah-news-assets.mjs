import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const API_URL = "https://api.openai.com/v1/images/generations";
const outputDir = path.join(process.cwd(), "public", "images", "moriah", "news");

async function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  const text = await readFile(envPath, "utf8");

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;

    const [key, ...rest] = line.split("=");
    const value = rest.join("=").trim().replace(/^["']|["']$/g, "");
    if (!process.env[key.trim()]) {
      process.env[key.trim()] = value;
    }
  }
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

const sharedStyle = `
Moriah modern Christian accessory news and showroom editorial photography.
Quiet Korean design brand, clean white exhibition-like space, soft stone wall,
brushed silver cross jewelry, pale sky-blue enamel, muted terracotta accent,
linen, warm daylight, calm premium product announcement mood.
No visible text, no readable words, no logo, no watermark, no UI, no border.
Do not imitate existing fair graphics, legacy product pages, clocks, calendars, or lamps.
`;

const assets = [
  {
    name: "hero-showroom.webp",
    size: "1536x1024",
    quality: "high",
    prompt: `${sharedStyle}
Landscape hero image for a brand news page: a serene white showroom wall with a large minimal silver cross pendant display,
hands placing a pale blue card and a tiny prayer bracelet on separate wall hooks, warm light across stone texture,
editorial announcement composition with generous negative space.`,
  },
  {
    name: "showroom-view.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape image: small moriah seasonal showroom corner, stone plinths, silver cross pendants,
prayer bracelets, blank cream cards, linen pouches, pale blue ribbons, quiet gallery layout.`,
  },
  {
    name: "visitor-wear.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape lifestyle image: a fictional Korean visitor in soft cream clothing gently trying on a minimal cross necklace
near a bright white wall, only natural face profile, calm and respectful, no readable signs.`,
  },
  {
    name: "new-pendant.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape product scene: a new brushed silver cross pendant with pale sky-blue enamel detail hanging from a simple wall peg,
soft shadow on white plaster, quiet announcement image, no people.`,
  },
  {
    name: "prayer-bracelet-news.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape product-use image: a prayer bracelet placed beside a blank folded card, small candle,
stone tray, linen pouch, warm morning light, season letter feeling.`,
  },
  {
    name: "partner-note.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape editorial image: hands arranging blank invitation cards, gift samples, cross pendant,
and prayer bracelet on a long white table for a seasonal partner meeting. No readable text.`,
  },
  {
    name: "map-card.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape minimal information image: abstract floor-plan-like paper shapes, pale blue path marker,
small cross pendant and blank schedule cards on a white desk. Looks like a showroom guide without readable text.`,
  },
];

async function generateImage(asset, apiKey) {
  const outputPath = path.join(outputDir, asset.name);
  if (await fileExists(outputPath)) {
    console.log(`skip ${asset.name}`);
    return;
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-2",
      prompt: asset.prompt,
      size: asset.size,
      quality: asset.quality,
      n: 1,
      output_format: "webp",
      output_compression: 92,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI image generation failed for ${asset.name}: ${response.status} ${detail}`);
  }

  const result = await response.json();
  const encoded = result.data?.[0]?.b64_json;
  if (!encoded) {
    throw new Error(`OpenAI image generation returned no image data for ${asset.name}`);
  }

  await writeFile(outputPath, Buffer.from(encoded, "base64"));
  console.log(`wrote ${outputPath}`);
}

async function main() {
  await loadEnv();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing from .env");
  }

  await mkdir(outputDir, { recursive: true });

  for (const asset of assets) {
    await generateImage(asset, apiKey);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
