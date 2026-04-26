import fs from "fs";
import path from "path";
import { routes } from "../src/config/routes.js";

const domain = "https://sustainablesolution360.com";

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${domain}${route.path}</loc>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

fs.writeFileSync(path.resolve("public/sitemap.xml"), sitemap);

console.log("Sitemap generated successfully");
