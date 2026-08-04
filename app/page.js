import Link from "next/link";
import { books, uniqueSeries, uniqueTopics } from "@/lib/data";
import { BookCard } from "@/components/BookCard";

export default function HomePage() {
  const featured = books.filter((book) => book.featured).slice(0, 6);
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow">House of Torres Publishers</p>
            <h1>Books for faith, family, work and building something real.</h1>
            <p className="lead">Mason Torres writes practical books shaped by conviction, lived work and responsibility. Find the right book by need, topic or series.</p>
            <div className="actions">
              <Link className="button button-primary" href="/books">Browse all {books.length} books</Link>
              <Link className="button button-secondary" href="/start-here">Find where to start</Link>
            </div>
          </div>
          <div className="hero-panel">
            <strong>{books.length}</strong>
            <span>canonical books and active projects</span>
            <strong>{uniqueSeries().length}</strong>
            <span>series and collections</span>
            <strong>{uniqueTopics().length}</strong>
            <span>reader topics</span>
          </div>
        </div>
      </section>
      <section className="section shell">
        <div className="section-heading">
          <div><p className="eyebrow">Featured</p><h2>Start with these books</h2></div>
          <Link className="text-link" href="/books">See the full catalog</Link>
        </div>
        <div className="book-grid">{featured.map((book) => <BookCard key={book.slug} book={book} />)}</div>
      </section>
      <section className="section section-alt">
        <div className="shell">
          <p className="eyebrow">Choose by need</p>
          <h2>Find the shelf that matters now</h2>
          <div className="path-grid">
            <Link href="/topics/faith"><strong>Strengthen faith</strong><span>Prayer, Scripture, discipline and a house that stands.</span></Link>
            <Link href="/topics/family"><strong>Build the family</strong><span>Fatherhood, children, legacy and practical home systems.</span></Link>
            <Link href="/topics/veterans"><strong>Find veteran help</strong><span>Clear first doors for veterans, service members and families.</span></Link>
            <Link href="/topics/ai"><strong>Use AI wisely</strong><span>Human-controlled systems for real work and income.</span></Link>
            <Link href="/topics/publishing"><strong>Write and publish</strong><span>Book ideas, catalog strategy, KDP and advertising.</span></Link>
            <Link href="/topics/business"><strong>Build stronger work</strong><span>Business, sales, dealerships, timeshare and real estate.</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
