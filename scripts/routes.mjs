/*
  The route table the prerender step works from. Titles and descriptions live in
  src/routes-meta.json, because the application needs them for client navigation too.
*/
import fs from "node:fs";

const meta = JSON.parse(fs.readFileSync(new URL("../src/routes-meta.json", import.meta.url), "utf8"));

const origin = "https://fitnessgym.dawidolko.pl";
const author = { "@type": "Person", name: "Dawid Olko", url: "https://dawidolko.pl" };

export const site = {
  origin,
  name: "FitnessGym",
  locale: "en_US",
  image: "/og-image.jpg",
  imageAlt: "FitnessGym website home page",
  outDir: "build",
  rootId: "root",
};

function crumbs(route) {
  const parts = route.path.split("/").filter(Boolean);
  const items = [{ name: "Home", path: "/" }];
  if (parts[0] === "blog" && parts[1]) items.push({ name: "Blog", path: "/blog/" });
  items.push({ name: route.title.split(" | ")[0], path: route.path });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: origin + item.path,
    })),
  };
}

function structuredData(route) {
  if (route.path === "/") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "FitnessGym",
        url: `${origin}/`,
        description: route.description,
        author,
      },
    ];
  }
  const items = [crumbs(route)];
  if (route.path.startsWith("/blog/") && route.path !== "/blog/") {
    items.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: route.title.split(" | ")[0],
      description: route.description,
      url: origin + route.path,
      image: origin + site.image,
      author,
    });
  }
  return items;
}

export const routes = meta.map((route) => ({ ...route, jsonLd: structuredData(route) }));

export const notFound = {
  probe: "/this-page-does-not-exist/",
  title: "Page Not Found | FitnessGym Gym Website",
  description: "This address does not match any FitnessGym page. Go back to the home page to find classes, trainers, the shop and the blog.",
};
