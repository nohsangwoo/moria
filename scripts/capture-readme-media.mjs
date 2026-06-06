import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

function loadPlaywright() {
  try {
    return require("playwright");
  } catch {
    const roots = [
      process.env.PLAYWRIGHT_NODE_PATH,
      process.env.NODE_PATH,
    ]
      .filter(Boolean)
      .flatMap((value) => value.split(path.delimiter))
      .filter(Boolean);

    for (const root of roots) {
      try {
        return require(path.join(root, "playwright"));
      } catch {
        // Try the next configured module root.
      }
    }
  }

  throw new Error(
    "Playwright is not available. Install it locally or set PLAYWRIGHT_NODE_PATH to a node_modules directory containing playwright.",
  );
}

const { chromium } = loadPlaywright();

const baseUrl = process.env.README_CAPTURE_BASE_URL ?? "http://127.0.0.1:3000";
const mediaDir = path.join(process.cwd(), "docs", "media");
const screenshotDir = path.join(mediaDir, "screenshots");
const videoTempDir = path.join(mediaDir, ".video-temp");
const finalVideoPath = path.join(mediaDir, "moriah-walkthrough.webm");
const reportPath = path.join(mediaDir, "verification-report.json");
const initialPauseMs = Number(process.env.README_CAPTURE_INITIAL_PAUSE_MS ?? 800);
const contactPauseMs = Number(process.env.README_CAPTURE_CONTACT_PAUSE_MS ?? 650);
const scrollPixelsPerSecond = Number(process.env.README_CAPTURE_SCROLL_PX_PER_SECOND ?? 520);
const minScrollDurationMs = Number(process.env.README_CAPTURE_MIN_SCROLL_DURATION_MS ?? 5000);
const maxScrollDurationMs = Number(process.env.README_CAPTURE_MAX_SCROLL_DURATION_MS ?? 11000);
const finalPauseMs = Number(process.env.README_CAPTURE_FINAL_PAUSE_MS ?? 1200);

const routes = [
  { name: "home", label: "Home", path: "/" },
  { name: "collections", label: "Collections", path: "/collections" },
  { name: "collaboration", label: "Collaboration", path: "/collaboration" },
  { name: "news", label: "News", path: "/news" },
  { name: "business", label: "Business", path: "/business" },
  { name: "contact", label: "Contact", path: "/contact" },
];

async function waitForImages(page) {
  await Promise.race([
    page.evaluate(async () => {
      const images = Array.from(document.images).filter((image) => {
        const rect = image.getBoundingClientRect();
        return rect.top < window.innerHeight * 1.5;
      });
      await Promise.all(
        images.map((image) => {
          if (image.complete) return undefined;
          return new Promise((resolve) => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          });
        }),
      );
    }),
    page.waitForTimeout(1600),
  ]);
}

async function smoothScrollToBottom(page, maxScroll, durationMs) {
  await page.evaluate(
    ({ scrollTarget, scrollDuration }) =>
      new Promise((resolve) => {
        const start = performance.now();
        const easeInOut = (progress) =>
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        function step(now) {
          const progress = Math.min(1, (now - start) / scrollDuration);
          window.scrollTo(0, Math.round(scrollTarget * easeInOut(progress)));

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        }

        requestAnimationFrame(step);
      }),
    { scrollTarget: maxScroll, scrollDuration: durationMs },
  );
}

async function capture() {
  await mkdir(screenshotDir, { recursive: true });
  await rm(videoTempDir, { recursive: true, force: true });
  await mkdir(videoTempDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: videoTempDir,
      size: { width: 1440, height: 900 },
    },
  });

  const page = await context.newPage();
  page.setDefaultTimeout(12_000);
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  const report = [];

  for (const route of routes) {
    console.log(`Checking ${route.path}`);
    await page.goto(`${baseUrl}${route.path}`, { waitUntil: "load", timeout: 20_000 });
    await page.addStyleTag({
      content: `
        nextjs-portal,
        [data-nextjs-toast],
        [data-nextjs-dialog],
        [data-nextjs-dev-tools-button],
        [data-nextjs-terminal-button] {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `,
    });
    await waitForImages(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(initialPauseMs);

    await page.screenshot({
      path: path.join(screenshotDir, `${route.name}.jpg`),
      type: "jpeg",
      quality: 86,
      fullPage: false,
    });

    const initial = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim() ?? null,
      images: document.images.length,
      links: document.links.length,
      hasPrivateAddress: /한글비석|신동아|노원구|Nowon|생년|birth|사업장 소재지|주소/.test(
        document.documentElement.textContent ?? "",
      ),
      hasLegacyReference: /images\/mosery|Maison|Objet|Paris|Time : A day/.test(
        document.documentElement.textContent ?? "",
      ),
    }));

    if (route.path === "/contact") {
      await page.selectOption("select", "선물 패키지");
      await page.fill('input[placeholder="예: 김종란 / 모퉁이"]', "포트폴리오 검증");
      await page.fill('input[placeholder="이메일 또는 전화번호"]', "hello@example.com");
      await page.fill("textarea", "README 데모 캡처를 위한 문의 폼 동작 확인입니다.");
      await page.waitForTimeout(contactPauseMs);
    }

    const maxScroll = await page.evaluate(() =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
    );
    const scrollDurationMs = Math.max(
      minScrollDurationMs,
      Math.min(maxScrollDurationMs, Math.round((maxScroll / scrollPixelsPerSecond) * 1000)),
    );
    await smoothScrollToBottom(page, maxScroll, scrollDurationMs);
    await page.waitForTimeout(450);

    console.log(`Done ${route.path}`);

    report.push({
      route: route.path,
      label: route.label,
      screenshot: `docs/media/screenshots/${route.name}.jpg`,
      ...initial,
      scrollHeight: await page.evaluate(() => document.documentElement.scrollHeight),
      scrollDurationMs,
      checkedAt: new Date().toISOString(),
    });
  }

  await page.waitForTimeout(finalPauseMs);
  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const tempVideoPath = await video.path();
    await copyFile(tempVideoPath, finalVideoPath);
  }

  await writeFile(
    reportPath,
    JSON.stringify(
      {
        baseUrl,
        generatedAt: new Date().toISOString(),
        routes: report,
        consoleErrors,
        pageErrors,
        pacing: {
          initialPauseMs,
          contactPauseMs,
          scrollPixelsPerSecond,
          minScrollDurationMs,
          maxScrollDurationMs,
          finalPauseMs,
        },
        video: "docs/media/moriah-walkthrough.webm",
        gif: "docs/media/moriah-walkthrough.gif",
      },
      null,
      2,
    ),
  );

  console.log(`Captured ${routes.length} routes.`);
  console.log(`Video: ${finalVideoPath}`);
  console.log(`Report: ${reportPath}`);
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
