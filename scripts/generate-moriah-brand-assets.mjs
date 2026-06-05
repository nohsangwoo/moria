import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const brandDir = path.join(root, "public", "brand");
const faviconPath = path.join(root, "src", "app", "favicon.ico");
const heroPath = path.join(root, "public", "images", "moriah", "hero.webp");

const palette = {
  ink: "#050505",
  paper: "#f7f5f1",
  clay: "#c47a55",
  sky: "#b9d8ef",
  gold: "#d8ad50",
  line: "#d8d1c7",
  muted: "#5e5750",
};

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function iconSvg(size) {
  const stroke = Math.round(size * 0.072);
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="${palette.ink}"/>
    <circle cx="${size * 0.68}" cy="${size * 0.29}" r="${size * 0.18}" fill="${palette.sky}"/>
    <path d="M${size * 0.5} ${size * 0.2} V${size * 0.74} M${size * 0.32} ${size * 0.39} H${size * 0.68}" fill="none" stroke="#ffffff" stroke-width="${stroke}" stroke-linecap="round"/>
    <circle cx="${size * 0.35}" cy="${size * 0.73}" r="${size * 0.07}" fill="${palette.gold}"/>
    <path d="M${size * 0.61} ${size * 0.68} L${size * 0.75} ${size * 0.82}" stroke="${palette.clay}" stroke-width="${Math.round(size * 0.045)}" stroke-linecap="round"/>
  </svg>`;
}

function ogTextSvg(width, height) {
  const title = "The Quiet Cross Series";
  const subtitle = "모던 크리스찬 악세사리";
  const description = "십자가 목걸이 · 기도 팔찌 · 기독교 선물";
  const operator = "사업자 아기돌풍 · 435-50-01307";

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${palette.paper}"/>
    <path d="M0 476 C 160 410, 290 540, 525 464 C 590 444, 645 442, 710 470 L710 630 L0 630 Z" fill="#ebe4db"/>
    <g opacity="0.52" stroke="${palette.line}" stroke-width="1">
      ${Array.from({ length: 9 }, (_, index) => `<path d="M${index * 72} 0 V${height}"/>`).join("")}
      ${Array.from({ length: 6 }, (_, index) => `<path d="M0 ${index * 96} H720"/>`).join("")}
    </g>
    <text x="76" y="112" fill="${palette.ink}" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" letter-spacing="14">moriah</text>
    <path d="M80 166 H220" stroke="${palette.ink}" stroke-width="2"/>
    <text x="76" y="250" fill="${palette.ink}" font-family="Arial, Helvetica, sans-serif" font-size="49" font-weight="800">${escapeXml(title)}</text>
    <text x="78" y="314" fill="${palette.ink}" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="800">${escapeXml(subtitle)}</text>
    <text x="80" y="374" fill="${palette.muted}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700">${escapeXml(description)}</text>
    <g transform="translate(80 456)">
      <rect width="292" height="46" rx="23" fill="${palette.ink}"/>
      <text x="28" y="30" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="800">${escapeXml(operator)}</text>
    </g>
    <g transform="translate(480 456)">
      <path d="M55 0 V88 M18 33 H92" fill="none" stroke="${palette.ink}" stroke-width="11" stroke-linecap="round"/>
      <circle cx="98" cy="18" r="24" fill="${palette.sky}"/>
      <circle cx="10" cy="82" r="13" fill="${palette.gold}"/>
    </g>
  </svg>`;
}

function rightOverlaySvg(width, height) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stop-color="#f7f5f1" stop-opacity="0.35"/>
        <stop offset="0.38" stop-color="#050505" stop-opacity="0"/>
        <stop offset="1" stop-color="#050505" stop-opacity="0.12"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#fade)"/>
    <rect x="0" y="0" width="1" height="${height}" fill="#f7f5f1" opacity="0.7"/>
  </svg>`;
}

function makeIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + images.length * 16;

  for (const image of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(image.size === 256 ? 0 : image.size, 0);
    entry.writeUInt8(image.size === 256 ? 0 : image.size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(image.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += image.buffer.length;
    entries.push(entry);
  }

  return Buffer.concat([header, ...entries, ...images.map((image) => image.buffer)]);
}

async function writePng(filePath, svg, size) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(filePath);
}

async function writeOg(filePath) {
  const width = 1200;
  const height = 630;
  const hero = await sharp(heroPath)
    .resize(560, height, { fit: "cover", position: "center" })
    .modulate({ brightness: 0.98, saturation: 0.88 })
    .png()
    .toBuffer();

  await sharp(Buffer.from(ogTextSvg(width, height)))
    .composite([
      { input: hero, left: 640, top: 0 },
      { input: Buffer.from(rightOverlaySvg(560, height)), left: 640, top: 0 },
    ])
    .png()
    .toFile(filePath);
}

async function main() {
  await mkdir(brandDir, { recursive: true });

  const icon = iconSvg(512);
  await writePng(path.join(brandDir, "apple-touch-icon.png"), icon, 180);
  await writePng(path.join(brandDir, "icon-192.png"), icon, 192);
  await writePng(path.join(brandDir, "icon-512.png"), icon, 512);
  await writeOg(path.join(brandDir, "og-image.png"));
  await writeOg(path.join(brandDir, "twitter-image.png"));

  const icoImages = await Promise.all(
    [16, 32, 48].map(async (size) => ({
      size,
      buffer: await sharp(Buffer.from(icon)).resize(size, size).png().toBuffer(),
    })),
  );

  await writeFile(faviconPath, makeIco(icoImages));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
