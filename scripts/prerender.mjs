/*
  Writes real HTML for every route after the client build.

  The production bundle is opened in a headless Chrome, and what it renders is
  stored as <route>/index.html together with the head tags from scripts/routes.mjs,
  so a crawler gets the h1, title, description and canonical of each address in
  the first response. The application replaces that markup when it mounts.

  CHROME_PATH selects the browser. Without it the Chrome already installed on the
  machine or the CI runner is used, so no browser download is needed.
*/
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { site, routes, notFound } from "./routes.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, "..", site.outDir);
const shell = fs.readFileSync(path.join(out, "index.html"), "utf8");
const TYPES = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
};

const escapeHtml = (text) =>
  String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function serve() {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const file = path.join(out, pathname);
    if (path.extname(pathname) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, { "content-type": TYPES[path.extname(pathname)] || "application/octet-stream" });
      res.end(fs.readFileSync(file));
      return;
    }
    res.writeHead(200, { "content-type": "text/html" });
    res.end(shell);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

function jsonLd(route) {
  return (route.jsonLd || [])
    .map((item) => `<script type="application/ld+json">${JSON.stringify(item).replace(/</g, "\\u003c")}</script>`)
    .join("");
}

function headTags(route) {
  const url = site.origin + route.path;
  const image = site.origin + site.image;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}"/>`,
    route.noindex ? `<meta name="robots" content="noindex"/>` : `<link rel="canonical" href="${url}"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}"/>`,
    `<meta property="og:locale" content="${site.locale}"/>`,
    `<meta property="og:title" content="${title}"/>`,
    `<meta property="og:description" content="${description}"/>`,
    route.noindex ? "" : `<meta property="og:url" content="${url}"/>`,
    `<meta property="og:image" content="${image}"/>`,
    `<meta property="og:image:width" content="1200"/>`,
    `<meta property="og:image:height" content="630"/>`,
    `<meta property="og:image:alt" content="${escapeHtml(site.imageAlt)}"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${title}"/>`,
    `<meta name="twitter:description" content="${description}"/>`,
    `<meta name="twitter:image" content="${image}"/>`,
    jsonLd(route),
  ].join("");
}

function render(route, body, css) {
  const stripped = shell
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta[^>]+name=["']description["'][^>]*>/g, "")
    .replace(/<link[^>]+rel=["']canonical["'][^>]*>/g, "")
    .replace(/<meta[^>]+property=["'](?:og|twitter):[^>]*>/g, "")
    .replace(/<meta[^>]+name=["']twitter:[^>]*>/g, "")
    .replace(/<script[^>]+application\/ld\+json[\s\S]*?<\/script>/g, "");
  const style = css ? `<style data-prerender>${css}</style>` : "";
  return stripped
    .replace("</head>", () => `${headTags(route)}${style}</head>`)
    .replace(new RegExp(`(<div id="${site.rootId}">)\\s*(</div>)`), (_, open, close) => open + body + close);
}

async function capture(browser, origin, address) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  await page.route("**/*", (route) =>
    route.request().url().startsWith(origin) ? route.continue() : route.abort(),
  );
  await page.goto(origin + address, { waitUntil: "load" });
  await page.waitForFunction((id) => document.getElementById(id)?.querySelector("h1"), site.rootId, {
    timeout: 20000,
  });
  /* Scrolling once lets content that waits for the viewport render as well. */
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((done) => setTimeout(done, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  const result = await page.evaluate((id) => {
    const root = document.getElementById(id);
    const css = [...document.styleSheets]
      .filter((sheet) => !sheet.href)
      .flatMap((sheet) => [...sheet.cssRules].map((rule) => rule.cssText))
      .join("");
    return { html: root.innerHTML, css, headings: root.querySelectorAll("h1").length };
  }, site.rootId);
  await page.close();
  return result;
}

function sitemap() {
  const entries = routes
    .map((route) => `  <url><loc>${site.origin}${route.path}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

const server = await serve();
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({
  args: ["--no-sandbox"],
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }),
});

let failed = false;
for (const route of routes) {
  const { html, css, headings } = await capture(browser, origin, route.path);
  if (headings !== 1) {
    console.error(`prerender: ${route.path} has ${headings} h1 elements.`);
    failed = true;
  }
  const dir = path.join(out, route.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), render(route, html, css));
}
if (notFound) {
  const { html, css } = await capture(browser, origin, notFound.probe);
  fs.writeFileSync(path.join(out, "404.html"), render({ ...notFound, noindex: true }, html, css));
}
fs.writeFileSync(path.join(out, "sitemap.xml"), sitemap());

await browser.close();
server.close();
if (failed) process.exit(1);
console.log(`prerender: wrote ${routes.length} routes.`);
