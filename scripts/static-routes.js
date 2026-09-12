/**
 * GitHub Pages serves files, not routes. The application uses BrowserRouter,
 * so /about existed only once React had already loaded — a direct hit
 * answered with GitHub's own 404 page and search engines saw nothing.
 *
 * After the build this script writes build/<route>/index.html for every
 * static route, so each address answers 200 with the application shell and
 * the router takes over from there. build/404.html covers whatever is left
 * (the blog post pages, which are generated from data at runtime).
 */
const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "..", "build");
const routes = ["about", "shop", "faq", "blog", "contact", "cart"];

const indexPath = path.join(buildDir, "index.html");
if (!fs.existsSync(indexPath)) {
  console.error("No build/index.html — run the build first.");
  process.exit(1);
}

const shell = fs.readFileSync(indexPath);

for (const route of routes) {
  const dir = path.join(buildDir, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), shell);
}

fs.writeFileSync(path.join(buildDir, "404.html"), shell);

console.log(`Static entries written for ${routes.length} routes plus 404.html.`);
