import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const out = new URL("../out/", import.meta.url);

test("exports the complete Cocoa Atelier site for GitHub Pages", async () => {
  const html = await readFile(new URL("index.html", out), "utf8");

  assert.match(html, /<title>Cocoa Atelier \| Chocolate Strawberry Bouquets Melbourne<\/title>/i);
  assert.match(html, /A gift, composed/);
  assert.match(html, /The founding collection/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /LocalBusiness/);
  assert.match(html, /FAQPage/);
  assert.match(html, /https:\/\/keny369\.github\.io\/ca/);
  assert.match(html, /\/ca\/_next\/static\//);
  assert.match(html, /\/ca\/images\/signature-bouquet-cropped\.webp/);
  assert.match(html, /https:\/\/formsubmit\.co\/cocoaatelier%40outlook\.com|https:\/\/formsubmit\.co\/cocoaatelier@outlook\.com/);
  assert.match(html, /Blossom Garden/);
  assert.doesNotMatch(html, /The Blooming Atelier|Email this order request|Ordering not yet live/);
  assert.doesNotMatch(html, /chatgpt\.site|workspace-324323|codex-preview/i);
});

test("exports crawl, sitemap and manifest files with the GitHub Pages canonical", async () => {
  const [robots, sitemap, manifestText] = await Promise.all([
    readFile(new URL("robots.txt", out), "utf8"),
    readFile(new URL("sitemap.xml", out), "utf8"),
    readFile(new URL("manifest.webmanifest", out), "utf8"),
  ]);

  assert.match(robots, /Sitemap: https:\/\/keny369\.github\.io\/ca\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/keny369\.github\.io\/ca<\/loc>/);

  const manifest = JSON.parse(manifestText);
  assert.equal(manifest.short_name, "Cocoa Atelier");
  assert.equal(manifest.lang, "en-AU");
  assert.equal(manifest.start_url, "/ca/");
});

test("includes public imagery and browser scripts in the static export", async () => {
  await Promise.all([
    access(new URL("images/hero-atelier-bouquets.webp", out)),
    access(new URL("images/signature-bouquet-cropped.webp", out)),
    access(new URL("images/blooming-atelier-rose-blush.webp", out)),
    access(new URL("og.png", out)),
    access(new URL("privacy/index.html", out)),
    access(new URL("terms/index.html", out)),
    access(new URL("thanks/index.html", out)),
  ]);

  const staticEntries = await readdir(new URL("_next/static/", out), { recursive: true });
  assert.ok(staticEntries.some((entry) => entry.endsWith(".js")));
  assert.ok(staticEntries.some((entry) => entry.endsWith(".css")));
});
