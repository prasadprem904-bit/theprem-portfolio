import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ids = ["coreai", "shot", "naamsutra", "sarkari", "calcpro", "businessgrowth", "sip"];

const bundled = await bundle({
  entryPoint: path.resolve(__dirname, "../src/index.ts"),
  webpackOverride: (c) => c,
});

const browser = await openBrowser("chrome", {
  browserExecutable: process.env.PUPPETEER_EXECUTABLE_PATH ?? "/bin/chromium",
  chromiumOptions: { args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] },
  chromeMode: "chrome-for-testing",
});

for (const id of ids) {
  const compId = `product-${id}`;
  const composition = await selectComposition({ serveUrl: bundled, id: compId, puppeteerInstance: browser });
  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: `/mnt/documents/theprem-${id}-demo.mp4`,
    puppeteerInstance: browser,
    muted: true,
    concurrency: 2,
  });
  console.log(`Rendered ${id}`);
}

await browser.close({ silent: false });
console.log("All product demos rendered.");