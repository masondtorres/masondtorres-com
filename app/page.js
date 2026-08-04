import Link from "next/link";
import { books, publishedBookCount } from "@/lib/data";
import { BookCard } from "@/components/BookCard";

export default function HomePage() {
  const featured = books.filter((book) => book.featured).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">Mason Torres · House of Torres Publishers</p>
          <h1>{publishedBookCount} published books built from real life.</h1>
          <p className="lead">
            Mason Torres is an author, entrepreneur, U.S. Air Force veteran, husband, and father of 13. He writes practical books about faith, family, business, AI, and the lessons earned through real work.
          </p>
          <div className="actions">
            <Link className="button button-primary" href="/books">Browse selected books</Link>
            <Link className="button button-secondary" href="/about">About Mason</Link>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <h2>Selected books</h2>
          <Link className="text-link" href="/books">View selected books</Link>
        </div>
        <div className="book-grid">
          {featured.map((book) => <BookCard key={book.slug} book={book} />)}
        </div>
      </section>
    </>
  );
}
