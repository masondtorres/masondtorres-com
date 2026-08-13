const CATALOG_URL = "https://raw.githubusercontent.com/masondtorres/masondtorres-com/main/lib/data.js";

export async function getBooks() {
  const response = await fetch(CATALOG_URL, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`Catalog fetch failed: ${response.status}`);
  const source = await response.text();
  const match = source.match(/export const books = (\[[\s\S]*?\]);\n\nexport function bookBySlug/);
  if (!match) throw new Error("Catalog parse failed");
  return JSON.parse(match[1]);
}

export async function getBookBySlug(slug) {
  const books = await getBooks();
  return books.find((book) => book.slug === slug);
}
