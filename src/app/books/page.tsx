import { getPublicBooks } from "@/data/books";
import { BooksClient } from "./BooksClient";
export const metadata = { title: "Books", description: "Complete catalog of books by Mason Torres and House of Torres Publishers." };
export default function BooksPage() {
  const books = getPublicBooks();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Books</h1>
      <p className="mt-3 text-stone-600 max-w-2xl">All public books from Mason Torres and House of Torres Publishers. Filter by series, topic, or status.</p>
      <BooksClient books={books} />
    </div>
  );
}
