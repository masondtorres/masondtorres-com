import { books, authors, publishers, uniqueSeries, uniqueTopics, slugify } from "@/lib/data";
const base = "https://masondtorres.com";
export default function sitemap() {
  const fixed = ["","/books","/authors","/series","/topics","/publishers","/start-here","/about","/bookops","/privacy","/terms","/accessibility"];
  return [
    ...fixed.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
    ...books.map((book) => ({ url: `${base}/books/${book.slug}`, lastModified: new Date() })),
    ...authors.map((author) => ({ url: `${base}/authors/${author.slug}`, lastModified: new Date() })),
    ...publishers.map((publisher) => ({ url: `${base}/publishers/${publisher.slug}`, lastModified: new Date() })),
    ...uniqueSeries().map((series) => ({ url: `${base}/series/${slugify(series)}`, lastModified: new Date() })),
    ...uniqueTopics().map((topic) => ({ url: `${base}/topics/${slugify(topic)}`, lastModified: new Date() }))
  ];
}
