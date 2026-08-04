import Link from "next/link";
import { books, publishedBookCount } from "@/lib/data";
import { BookCard } from "@/components/BookCard";

export default function HomePage() {
  const featured = books.filter((book) => book.featured && book.status === "Available Now").slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">Mason Torres · House of Torres Publishers</p>
          <h1>{publishedBookCount} published books. One simple place to find them.</h1>
          <p className="lead">
            Books about faith, family, business, veterans, publishing, artificial intelligence, timeshare, stories, journals, and puzzles—built from real work and lived experience.
          </p>
          <div className="actions">
            <Link className="button button-primary" href="/books">Browse all books</Link>
            <Link className="button button-secondary" href="/about">About Mason</Link>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start here</p>
            <h2>Featured books</h2>
          </div>
          <Link className="text-link" href="/books">View all {publishedBookCount}</Link>
        </div>
        <div className="book-grid">
          {featured.map((book) => <BookCard key={book.slug} book={book} />)}
        </div>
      </section>
    </>
  );
}
