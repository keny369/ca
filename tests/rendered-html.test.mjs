import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished Cocoa Atelier concept", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Cocoa Atelier \| Chocolate Strawberry Bouquets Melbourne<\/title>/i);
  assert.match(html, /A gift, composed/);
  assert.match(html, /to be remembered\./);
  assert.match(html, /The founding collection/);
  assert.match(html, /Orders are not yet live/);
  assert.match(html, /og\.png/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /LocalBusiness/);
  assert.match(html, /FAQPage/);
  assert.match(html, /geo\.region/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /manifest\.webmanifest/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("publishes crawl, sitemap and manifest metadata routes", async () => {
  const [robotsResponse, sitemapResponse, manifestResponse] = await Promise.all([
    render("/robots.txt"),
    render("/sitemap.xml"),
    render("/manifest.webmanifest"),
  ]);

  assert.equal(robotsResponse.status, 200);
  assert.match(await robotsResponse.text(), /Sitemap: https:\/\/cocoa-atelier-melbourne\.workspace-324323\.chatgpt\.site\/sitemap\.xml/);

  assert.equal(sitemapResponse.status, 200);
  assert.match(await sitemapResponse.text(), /<loc>https:\/\/cocoa-atelier-melbourne\.workspace-324323\.chatgpt\.site<\/loc>/);

  assert.equal(manifestResponse.status, 200);
  const manifest = await manifestResponse.json();
  assert.equal(manifest.short_name, "Cocoa Atelier");
  assert.equal(manifest.lang, "en-AU");
});

test("keeps the final site free of starter preview dependencies", async () => {
  const [page, layout, packageJson, publicImages] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readdir(new URL("../public/images/", import.meta.url)),
  ]);

  assert.match(page, /Cocoa Atelier/);
  assert.match(page, /submitOrderRequest/);
  assert.match(layout, /Cormorant_Garamond/);
  assert.match(layout, /summary_large_image/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.ok(publicImages.includes("hero-atelier-bouquets.png"));
  assert.ok(publicImages.includes("signature-bouquet.png"));
});
