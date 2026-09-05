import { books } from "./data";
import { dorkBook } from "./dork";

const catalogBooks = [dorkBook, ...books];

export async function getBooks() {
  return catalogBooks;
}

export async function getBookBySlug(slug) {
  return catalogBooks.find((book) => book.slug === slug);
}
