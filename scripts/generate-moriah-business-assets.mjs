import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const API_ROOT = "https://api.openai.com/v1/images";
const outputDir = path.join(process.cwd(), "public", "images", "moriah", "business");

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

async function imagePartFromWebpAsPng(filePath, filename) {
  const buffer = await sharp(await readFile(filePath)).png().toBuffer();
  return {
    blob: new Blob([buffer], { type: "image/png" }),
    filename,
  };
}

async function requestImage({ prompt, size, quality = "medium", inputImages = [] }, apiKey) {
  let response;

  if (inputImages.length > 0) {
    const form = new FormData();
    form.append("model", "gpt-image-2");
    form.append("prompt", prompt);
    form.append("size", size);
    form.append("quality", quality);
    form.append("n", "1");
    form.append("output_format", "webp");
    form.append("output_compression", "92");

    for (const image of inputImages) {
      form.append("image[]", image.blob, image.filename);
    }

    response = await fetch(`${API_ROOT}/edits`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: form,
    });
  } else {
    response = await fetch(`${API_ROOT}/generations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt,
        size,
        quality,
        n: 1,
        output_format: "webp",
        output_compression: 92,
      }),
    });
  }

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI image request failed: ${response.status} ${detail}`);
  }

  const result = await response.json();
  const encoded = result.data?.[0]?.b64_json;
  if (!encoded) {
    throw new Error("OpenAI image response did not include b64_json.");
  }

  return Buffer.from(encoded, "base64");
}

const sharedStyle = `
Moriah modern Christian accessories business editorial photography.
Korean small brand founder mood, quiet confidence, warm white studio, brushed silver cross jewelry,
prayer bracelet, linen packaging, pale sky-blue accent, charcoal, cream, soft daylight, premium but modest.
No visible text, no readable words, no logo, no watermark, no UI, no border.
Avoid old Mosery products, clocks, calendars, lamps, exhibition booth graphics, or copied layouts.
`;

const founderStyle = `
Create a NEW fictional Korean woman entrepreneur character for a symbolic brand-story image,
late 40s to early 50s, neat short dark hair, calm eyes, natural makeup, ivory blouse with a charcoal cardigan,
gentle but decisive expression. She is not a real public figure or celebrity and not a literal portrait.
Keep her consistent across images that include the founder.
`;

const assets = [
  {
    name: "founder-reference.webp",
    size: "1024x1536",
    quality: "high",
    prompt: `${sharedStyle}
${founderStyle}
Portrait image: the fictional woman founder seated at a clean white worktable, a small brushed silver cross pendant
and blank linen pouch near her hands, eye-level camera, warm studio background, calm and trustworthy.`,
  },
  {
    name: "hero-desk.webp",
    mode: "edit-founder",
    size: "1536x1024",
    quality: "high",
    prompt: `${sharedStyle}
${founderStyle}
Landscape hero image: the same fictional founder reviewing a curated table of Christian accessories,
blank business papers, linen gift pouches, a prayer bracelet, and a minimal cross pendant.
Generous negative space, editorial landing page composition, trustworthy small business tone.`,
  },
  {
    name: "office-window.webp",
    mode: "edit-founder",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
${founderStyle}
Portrait editorial image: the same fictional founder standing near a bright window, checking a small cross necklace
and a blank order card, soft morning light, quiet preparation before shipping, face visible and natural.`,
  },
  {
    name: "documents-desk.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape still life: a clean desk with blank official-looking papers, a simple pen, linen pouch,
brushed silver cross charm, and neutral folder. Business registration mood, but absolutely no readable text or numbers.`,
  },
  {
    name: "curation-table.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape curation table: selected Christian accessory samples, cross pendants, prayer bracelets,
muted enamel color chips, linen, blank cards, and careful arrangement marks. Calm wholesale and retail preparation mood.`,
  },
  {
    name: "packing-hands.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape close detail: mature woman's hands wrapping a small jewelry box with linen ribbon,
blank cream card, brushed silver cross pendant, and soft paper texture. Warm trustworthy packaging scene.`,
  },
];

async function generateAsset(asset, apiKey) {
  const outputPath = path.join(outputDir, asset.name);
  if (await fileExists(outputPath)) {
    console.log(`skip ${asset.name}`);
    return outputPath;
  }

  let inputImages = [];
  if (asset.mode === "edit-founder") {
    const founderPath = path.join(outputDir, "founder-reference.webp");
    if (!(await fileExists(founderPath))) {
      throw new Error("founder-reference.webp must be generated before founder edit assets.");
    }
    inputImages = [await imagePartFromWebpAsPng(founderPath, "moriah-founder-reference.png")];
  }

  const image = await requestImage(
    {
      prompt: asset.prompt,
      size: asset.size,
      quality: asset.quality,
      inputImages,
    },
    apiKey,
  );

  await writeFile(outputPath, image);
  console.log(`wrote ${outputPath}`);
  return outputPath;
}

async function run() {
  await loadEnv();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing from .env");
  }

  await mkdir(outputDir, { recursive: true });

  for (const asset of assets) {
    await generateAsset(asset, apiKey);
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
