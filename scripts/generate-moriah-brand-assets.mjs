import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const brandDir = path.join(root, "public", "brand");
const faviconPath = path.join(root, "src", "app", "favicon.ico");
const pretendardFontPath = path.join(root, "src", "app", "fonts", "PretendardVariable.woff2");
const bundledLogoSourcePath = path.join(brandDir, "motungi-logo-source.png");
const fallbackDownloadLogoPath =
  "C:\\Users\\nsgr1\\Downloads\\ChatGPT Image 2026년 6월 6일 오후 11_37_22.png";

const palette = {
  ink: "#10100f",
  paper: "#fbfaf7",
  line: "#e6e0d7",
  muted: "#4f5b69",
  soft: "#8b8278",
};

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function logoMarkSvg(size) {
  const s = size;
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <defs>
      <linearGradient id="top" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#d8d3ca"/>
        <stop offset="1" stop-color="#bfb8ae"/>
      </linearGradient>
      <linearGradient id="left" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="1" stop-color="#e5ded5"/>
      </linearGradient>
      <linearGradient id="right" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#30302f"/>
        <stop offset="1" stop-color="#111110"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="${s * 0.018}" stdDeviation="${s * 0.022}" flood-color="#000000" flood-opacity="0.16"/>
      </filter>
    </defs>
    <g filter="url(#shadow)" transform="translate(${s * 0.16} ${s * 0.12}) scale(${s / 512})">
      <path d="M28 26 H394 V78 L220 177 C199 189 178 188 158 176 L28 98 Z" fill="url(#top)"/>
      <path d="M28 98 L158 176 C178 188 199 189 220 177 L220 448 H28 Z" fill="url(#left)"/>
      <path d="M244 179 L394 94 V448 H244 Z" fill="url(#right)"/>
      <path d="M28 98 L158 176 C178 188 199 189 220 177 L394 78" fill="none" stroke="#ffffff" stroke-width="16" stroke-linecap="square" stroke-linejoin="round"/>
      <path d="M220 177 C232 171 241 174 244 184 V448" fill="none" stroke="#ffffff" stroke-width="16" stroke-linecap="round"/>
    </g>
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

async function ensureLogoSource() {
  await mkdir(brandDir, { recursive: true });
  if (existsSync(bundledLogoSourcePath)) return;

  const sourcePath = process.env.MOTUNGI_LOGO_SOURCE_PATH ?? fallbackDownloadLogoPath;
  if (!existsSync(sourcePath)) {
    throw new Error(`Logo source image was not found: ${sourcePath}`);
  }

  await copyFile(sourcePath, bundledLogoSourcePath);
}

async function writeLogoIcons() {
  const markSvg = Buffer.from(logoMarkSvg(512));

  await sharp(markSvg).png().toFile(path.join(brandDir, "motungi-logo-mark.png"));
  await sharp(markSvg).resize(180, 180).png().toFile(path.join(brandDir, "apple-touch-icon.png"));
  await sharp(markSvg).resize(192, 192).png().toFile(path.join(brandDir, "icon-192.png"));
  await sharp(markSvg).resize(512, 512).png().toFile(path.join(brandDir, "icon-512.png"));

  const icoImages = await Promise.all(
    [16, 32, 48, 64].map(async (size) => ({
      size,
      buffer: await sharp(markSvg).resize(size, size).png().toBuffer(),
    })),
  );

  await writeFile(faviconPath, makeIco(icoImages));
}

async function pretendardFontFaceCss() {
  if (!existsSync(pretendardFontPath)) return "";

  const fontBase64 = (await readFile(pretendardFontPath)).toString("base64");
  return `
      @font-face {
        font-family: "PretendardVariable";
        src: url("data:font/woff2;base64,${fontBase64}") format("woff2");
        font-weight: 45 920;
        font-style: normal;
      }`;
}

function minimalOgSvg(width, height, fontFaceCss) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <style>
        ${fontFaceCss}
        text {
          font-family: "PretendardVariable", "Pretendard Variable", Pretendard, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
          font-variant-ligatures: contextual;
        }
      </style>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="28" flood-color="#000000" flood-opacity="0.06"/>
      </filter>
    </defs>
    <rect width="${width}" height="${height}" rx="0" fill="${palette.paper}"/>
    <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="none" stroke="${palette.line}" stroke-width="1"/>
    <g filter="url(#softShadow)">
      <rect x="64" y="58" width="1072" height="514" rx="0" fill="#ffffff" opacity="0.58"/>
    </g>
    <g transform="translate(74 122)">
      <text
        x="0"
        y="96"
        fill="${palette.ink}"
        font-size="96"
        font-weight="280"
        letter-spacing="22">${escapeXml("motungi")}</text>
      <text
        x="2"
        y="268"
        fill="${palette.ink}"
        font-size="36"
        font-weight="800">${escapeXml("모퉁이 공식스토어")}</text>
      <text
        x="2"
        y="322"
        fill="${palette.muted}"
        font-size="30"
        font-weight="500">${escapeXml("일상의 모퉁이에 놓이는 감각적인 오브젝트 브랜드, motungi")}</text>
      <text
        x="4"
        y="402"
        fill="${palette.soft}"
        font-size="22"
        font-weight="500"
        letter-spacing="1.8">${escapeXml("www.motungistudio.com")}</text>
    </g>
  </svg>`;
}

async function composeOg(filePath) {
  const width = 1200;
  const height = 630;
  const fontFaceCss = await pretendardFontFaceCss();

  await sharp(Buffer.from(minimalOgSvg(width, height, fontFaceCss)))
    .png()
    .toFile(filePath);
}

async function main() {
  await ensureLogoSource();
  await writeLogoIcons();
  await composeOg(path.join(brandDir, "og-image.png"));
  await composeOg(path.join(brandDir, "twitter-image.png"));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
