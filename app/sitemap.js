import { books } from "@/lib/data";

const base = "https://masondtorres.com";

export default function sitemap() {
  const fixed = ["", "/books", "/projects", "/websites", "/resources", "/about", "/privacy"];
  return [
    ...fixed.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
    ...books.map((book) => ({ url: `${base}/books/${book.slug}`, lastModified: new Date() }))
  ];
}
