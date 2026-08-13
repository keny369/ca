import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished Cocoa Atelier concept", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Cocoa Atelier \| Handcrafted Chocolate Gifts in Melbourne<\/title>/i);
  assert.match(html, /A gift, composed/);
  assert.match(html, /to be remembered\./);
  assert.match(html, /The founding collection/);
  assert.match(html, /Orders are not yet live/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
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
