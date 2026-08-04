import { books } from "@/lib/data";

const base = "https://masondtorres-com.vercel.app";

export default function sitemap() {
  const fixed = ["", "/books", "/about", "/privacy"];
  return [
    ...fixed.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
    ...books.map((book) => ({ url: `${base}/books/${book.slug}`, lastModified: new Date() }))
  ];
}
