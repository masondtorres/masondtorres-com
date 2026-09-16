import { books } from "./data";
import { dorkBook } from "./dork";

const AUTHOR_ALIASES = {
  "Towers Book": "Towers Books",
  "MD Towers": "M.D. Towers"
};

const slugify = (value = "") => String(value)
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/&/g, " and ")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

function normalizeBook(book) {
  const rawAuthors = Array.isArray(book.authors) ? book.authors : [];
  const authors = rawAuthors.map((name) => AUTHOR_ALIASES[name] || name);
  const searchAliases = rawAuthors.filter((name, index) => name !== authors[index]);

  return {
    ...book,
    authors,
    ...(searchAliases.length ? { searchAliases } : {}),
    language: book.language || "English",
    formats: Array.isArray(book.formats) ? book.formats : []
  };
}

const catalogBooks = [dorkBook, ...books].map(normalizeBook);

export { slugify };

export async function getBooks() {
  return catalogBooks;
}

export async function getBookBySlug(slug) {
  return catalogBooks.find((book) => book.slug === slug);
}

export async function getAuthors() {
  const counts = new Map();
  for (const book of catalogBooks) {
    for (const name of book.authors) {
      const current = counts.get(name) || { name, slug: slugify(name), count: 0 };
      current.count += 1;
      counts.set(name, current);
    }
  }
  return [...counts.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getSeries() {
  const counts = new Map();
  for (const book of catalogBooks) {
    if (!book.series) continue;
    const current = counts.get(book.series) || { name: book.series, slug: slugify(book.series), count: 0 };
    current.count += 1;
    counts.set(book.series, current);
  }
  return [...counts.values()].sort((a, b) => a.name.localeCompare(b.name));
}
