import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const API_URL = "https://api.openai.com/v1/images/generations";
const outputDir = path.join(process.cwd(), "public", "images", "moriah", "collaboration");

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
Moriah modern Christian accessory collaboration editorial photography.
Quiet Korean design brand, premium but restrained, warm white negative space,
charcoal, pale sky blue, muted terracotta, brushed silver, linen, blank paper,
minimal cross jewelry, prayer bracelets, gift packaging, soft daylight.
No visible text, no readable words, no logo, no watermark, no UI, no border.
Do not reuse or imitate any Mosery product, clock, calendar, or existing collection scene.
`;

const assets = [
  {
    name: "hero-partnership.webp",
    size: "1536x1024",
    quality: "high",
    prompt: `${sharedStyle}
Landscape opening image: a calm collaboration meeting table for a Christian accessory brand.
Two fictional Korean creative partners are only partially visible from shoulders and hands,
reviewing cross pendant samples, prayer bracelets, blank gift cards, and linen packaging.
Warm morning studio light, refined editorial proposal mood, generous white space.`,
  },
  {
    name: "gift-table.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape still life: a long warm-white table prepared for church group gifts,
minimal jewelry boxes, linen pouches, silver cross pendants, prayer bracelets,
blank cream cards, and pale blue ribbons arranged in precise rows.`,
  },
  {
    name: "partner-review.webp",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
Portrait editorial image: two fictional Korean collaborators at a bright studio counter,
faces calm and natural but not close-up, reviewing blank packaging mockups and cross jewelry samples.
Quiet professional collaboration mood, navy and cream clothing, soft window light.`,
  },
  {
    name: "custom-kit.webp",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
Portrait product image: a custom collaboration kit for a Christian event,
minimal cross necklace, prayer bracelet, blank folded card, linen pouch,
small matte box, pale blue wax-like accent, no readable text, premium gift set feeling.`,
  },
  {
    name: "retail-display.webp",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
Portrait image: a quiet boutique display shelf for moriah-style Christian accessories,
stone stands, silver cross pendants, leather prayer bracelets, blank placards,
soft shadows and museum-store arrangement, no readable text.`,
  },
  {
    name: "workshop-hands.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape documentary detail: several hands around a table assembling gift pouches,
tying linen ribbon, placing tiny cross pendants and prayer bracelets into boxes.
Collaborative workshop feeling, warm studio daylight, no faces necessary.`,
  },
  {
    name: "closing-bundles.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape closing image: finished collaboration gift bundles stacked neatly on a warm white table,
linen pouches, pale blue ribbon, blank cards, a few silver cross pendants visible,
quiet premium order-ready mood, soft black and white accents.`,
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
