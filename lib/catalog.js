import { books } from "./data";

export async function getBooks() {
  return books;
}

export async function getBookBySlug(slug) {
  return books.find((book) => book.slug === slug);
}
