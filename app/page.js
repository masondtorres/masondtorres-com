import Link from "next/link";
import { books } from "@/lib/data";
import { BookCard } from "@/components/BookCard";

export default function HomePage() {
  const featured = books.filter((book) => book.featured).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">House of Torres Publishers</p>
          <h1>Books by Mason Torres.</h1>
          <p className="lead">
            Practical books about faith, family, veterans, business, publishing, AI and fiction.
          </p>
          <div className="actions">
            <Link className="button button-primary" href="/books">Browse the books</Link>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <h2>Featured books</h2>
          <Link className="text-link" href="/books">See all books</Link>
        </div>
        <div className="book-grid">
          {featured.map((book) => <BookCard key={book.slug} book={book} />)}
        </div>
      </section>
    </>
  );
}
