import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const API_URL = "https://api.openai.com/v1/images/generations";
const outputDir = path.join(process.cwd(), "public", "images", "moriah");

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

const sharedStyle = `
Modern Christian accessory brand photography for a refined Korean landing page.
Quiet luxury, clean editorial composition, sculptural negative space, warm daylight,
soft stone white, charcoal, pale sky blue, muted terracotta, brushed silver, 18k gold accents.
Product should feel contemporary and wearable, not ornate or church-souvenir-like.
No visible text, no letters, no logo, no watermark, no UI, no border.
`;

const assets = [
  {
    name: "hero.webp",
    size: "1536x1024",
    quality: "high",
    prompt: `${sharedStyle}
Hero image: an extreme close-up of a brushed silver cross pendant and a thin gold chain resting across a hand and warm sandstone surface.
One small sky-blue enamel detail on the pendant, subtle shadow, cinematic crop, premium product launch feeling.`,
  },
  {
    name: "arrival-1.webp",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
Portrait product still life: a small red enamel cross stud earring beside white wildflowers and a matte yellow ceramic vessel on a white windowsill.
Bright morning light, crisp shadow, gallery-store editorial mood.`,
  },
  {
    name: "arrival-2.webp",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
Portrait product still life: a pale blue enamel cross pendant necklace laid on a ribbed terracotta tray.
Minimal styling, strong diagonal shadow, contemporary design museum catalog feeling.`,
  },
  {
    name: "arrival-3.webp",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
Portrait product still life: a minimal gold ichthys ring and tiny cross charm balanced near fresh lemons in a transparent glass bowl.
A hand enters from above as if gently arranging the piece, elegant and modern.`,
  },
  {
    name: "arrival-4.webp",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
Portrait product still life: a blush-pink prayer bracelet with a tiny cross charm hanging near pale pink flowers and white linen.
Soft devotional mood, modern feminine accessory photography.`,
  },
  {
    name: "brand-film.webp",
    size: "1536x1024",
    quality: "high",
    prompt: `${sharedStyle}
Wide black and white editorial image: close-up of artisan hands polishing a small cross pendant at a quiet jewelry workbench.
Soft window light, refined craft documentary mood, no readable marks or text, cinematic horizontal frame.`,
  },
  {
    name: "product-cross-necklace.webp",
    size: "1024x1536",
    quality: "high",
    prompt: `${sharedStyle}
Clean ecommerce portrait image: a minimal brushed silver cross pendant necklace suspended against warm white plaster.
Precise shadow, centered composition, premium accessory product photography.`,
  },
  {
    name: "product-seed-ring.webp",
    size: "1024x1536",
    quality: "high",
    prompt: `${sharedStyle}
Clean ecommerce portrait image: a modern gold signet ring with a tiny mustard seed sealed under clear resin, beside a small cross detail.
Warm white background, refined shadow, luxury accessory catalog image.`,
  },
  {
    name: "product-prayer-bracelet.webp",
    size: "1024x1536",
    quality: "high",
    prompt: `${sharedStyle}
Clean ecommerce portrait image: a slim leather and silver prayer bracelet with one minimal cross charm, placed vertically on pale stone.
Modern unisex styling, calm premium lighting.`,
  },
  {
    name: "social-packaging.webp",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
Lifestyle portrait image: tall minimal gift boxes for Christian accessories, no text, with deep violet and emerald side panels.
Soft studio light, premium packaging reveal, modern sacred object feeling.`,
  },
  {
    name: "social-interior.webp",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
Lifestyle portrait image: calm apartment shelf with plants, a small candle, a silver cross pendant displayed on a stone stand, and warm blinds light.
Quiet daily devotion, modern interior styling.`,
  },
  {
    name: "social-wear.webp",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
Lifestyle portrait image: cropped hands holding a ceramic cup while wearing a minimal cross bracelet and delicate ring.
Warm beige room, soft curtain light, wearable contemporary Christian accessory mood.`,
  },
];

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function generateImage(asset, apiKey) {
  const outputPath = path.join(outputDir, asset.name);
  if (await fileExists(outputPath)) {
    console.log(`skip ${outputPath}`);
    return outputPath;
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
      quality: asset.quality ?? "medium",
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
  return outputPath;
}

async function runWithConcurrency(items, limit, task) {
  const results = [];
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await task(items[index]);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

async function main() {
  await loadEnv();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing from .env");
  }

  await mkdir(outputDir, { recursive: true });

  await runWithConcurrency(assets, 2, async (asset) => {
    const outputPath = await generateImage(asset, apiKey);
    console.log(outputPath);
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
