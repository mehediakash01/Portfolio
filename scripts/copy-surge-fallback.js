import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const distDir = resolve("dist");
const indexPath = resolve(distDir, "index.html");
const fallbackPaths = [resolve(distDir, "200.html"), resolve(distDir, "404.html")];

const syncFallbackPages = async () => {
  const indexHtml = await readFile(indexPath, "utf8");

  await Promise.all(fallbackPaths.map((filePath) => writeFile(filePath, indexHtml)));
};

syncFallbackPages().catch((error) => {
  console.error("Failed to copy Surge fallback pages:", error);
  process.exitCode = 1;
});