import { getAuthors, getBooks, getSeries } from "@/lib/catalog";

const base = "https://towersbooks.com";

export default async function sitemap() {
  const [books, authors, series] = await Promise.all([getBooks(), getAuthors(), getSeries()]);
  const fixed = ["", "/books", "/authors", "/series", "/house", "/shop", "/about", "/privacy"];
  return [
    ...fixed.map((path) => ({ url: `${base}${path}` })),
    ...books.map((book) => ({ url: `${base}/books/${book.slug}` })),
    ...authors.map((author) => ({ url: `${base}/authors/${author.slug}` })),
    ...series.map((item) => ({ url: `${base}/series/${item.slug}` }))
  ];
}
