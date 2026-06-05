import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const API_ROOT = "https://api.openai.com/v1/images";
const outputDir = path.join(process.cwd(), "public", "images", "moriah", "collection");
const referencePhotoPath = "D:/youtube/source/youtube_profile.png";

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

function mimeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}

async function imagePartFromFile(filePath) {
  const buffer = await readFile(filePath);
  return {
    blob: new Blob([buffer], { type: mimeFor(filePath) }),
    filename: path.basename(filePath),
  };
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
Moriah modern Christian accessory collection editorial photography.
Quiet Korean design brand, warm white negative space, black and white film accents,
soft daylight, brushed silver, pale sky-blue enamel, muted terracotta, charcoal,
minimal cross jewelry, prayer bracelet, gift packaging.
No visible text, no logo, no watermark, no UI, no border.
Avoid copying any existing Mosery products or collection scenes.
`;

const directorStyle = `
Use the reference only as loose mood guidance for a NEW fictional Korean male creative director character:
late 20s to early 30s, wavy black hair, calm focused eyes, navy work jacket over a white tee,
quiet confidence, warm studio desk lighting. Do not recreate the exact person or identity.
Keep this same fictional character consistent across the image.
`;

const assets = [
  {
    name: "director-reference.webp",
    mode: "edit-source",
    size: "1024x1024",
    quality: "high",
    prompt: `${sharedStyle}
${directorStyle}
Square character reference portrait in a calm accessory studio, direct but gentle gaze,
camera at eye level, shallow depth of field, product sketches and a small silver cross pendant blurred in the background.`,
  },
  {
    name: "hero-studio.webp",
    mode: "edit-director",
    size: "1536x1024",
    quality: "high",
    prompt: `${sharedStyle}
${directorStyle}
Landscape opening image: the fictional director stands beside a warm white worktable,
arranging a brushed silver cross pendant, a prayer bracelet, and blank paper sketches.
Editorial museum-catalog feeling, generous white space, natural morning light, face visible but not overly close.`,
  },
  {
    name: "director-table.webp",
    mode: "edit-director",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
${directorStyle}
Portrait image: the same fictional director seated at a clean studio table, holding a fine chain and looking down thoughtfully.
The cross pendant sits near his hands, soft black and white film mood with one restrained sky-blue accent.`,
  },
  {
    name: "hands-polish.webp",
    mode: "edit-director",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
${directorStyle}
Close editorial detail: the same fictional director's hands polishing a brushed silver cross pendant with a cloth.
Only a partial blurred face or shoulder may appear, warm studio light, cinematic craft documentary style.`,
  },
  {
    name: "wear-daily.webp",
    mode: "edit-director",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
${directorStyle}
Portrait lifestyle crop: the same fictional director wearing a minimal cross bracelet and navy jacket,
holding a plain ceramic cup near a window. Calm daily devotion mood, wearable contemporary accessory focus.`,
  },
  {
    name: "wall-cross.webp",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
Portrait product environment: a minimal brushed silver cross pendant with one pale sky-blue enamel square
hanging on a quiet warm-white wall corner. Architectural shadow, no people, refined sacred object mood.`,
  },
  {
    name: "material-board.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape still life: a designer material board with brushed silver pieces, fine gold chain, leather cord,
tiny cross charms, pale blue enamel samples, linen pouch, and blank folded paper. No readable text.`,
  },
  {
    name: "sketch-desk.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape design desk: blank geometric sketches for cross jewelry, calipers, tracing paper,
small enamel chips, and a half-finished pendant. Clean white table, warm daylight, no readable writing.`,
  },
  {
    name: "prayer-room.webp",
    size: "1024x1536",
    quality: "medium",
    prompt: `${sharedStyle}
Portrait quiet room image: a cross pendant resting on a stone stand beside a candle, folded linen,
and an unmarked small book with a plain cover. Morning curtain light, contemplative, modern interior.`,
  },
  {
    name: "gift-fold.webp",
    size: "1536x1024",
    quality: "medium",
    prompt: `${sharedStyle}
Landscape closing image in soft black and white: hands folding a blank cream gift card and wrapping a minimal jewelry box
with linen ribbon. A small silver cross pendant lies nearby. Premium editorial ending image, no text.`,
  },
];

async function generateAsset(asset, apiKey) {
  const outputPath = path.join(outputDir, asset.name);
  if (await fileExists(outputPath)) {
    console.log(`skip ${asset.name}`);
    return outputPath;
  }

  let inputImages = [];
  if (asset.mode === "edit-source") {
    inputImages = [await imagePartFromFile(referencePhotoPath)];
  } else if (asset.mode === "edit-director") {
    const directorPath = path.join(outputDir, "director-reference.webp");
    if (!(await fileExists(directorPath))) {
      throw new Error("director-reference.webp must be generated before director edit assets.");
    }
    inputImages = [await imagePartFromWebpAsPng(directorPath, "moriah-director-reference.png")];
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
