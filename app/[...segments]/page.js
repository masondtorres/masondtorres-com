import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogClient } from "@/components/CatalogClient";
import { BookCard } from "@/components/BookCard";
import {
  books, authors, publishers, bookBySlug, uniqueSeries, uniqueTopics,
  booksBySeries, booksByTopic, booksByAuthor, slugify
} from "@/lib/data";

const staticPages = {
  "start-here": {
    title: "Start Here",
    body: "Choose the problem you need to solve now. The site routes you to the most relevant books without making you understand the whole catalog first."
  },
  "about": {
    title: "About Mason Torres",
    body: "Mason Torres is an author, entrepreneur, operator and father of 13. His work focuses on faith, family, veterans, publishing, artificial intelligence, business, sales, real estate and practical systems. House of Torres Publishers is the publishing home for this work."
  },
  "bookops": {
    title: "BookOps Studio",
    body: "BookOps Studio is a separate publishing operations tool for manuscript audits, catalog work and production systems. It remains separate from the public author catalog."
  },
  "privacy": {
    title: "Privacy",
    body: "This public catalog does not currently require accounts, accept payments or collect information through a contact form. Standard hosting logs may be processed by the hosting provider for security and site operation."
  },
  "terms": {
    title: "Terms",
    body: "Book descriptions and availability information are provided for general information. Retailer availability, formats and pricing may change. No page on this site creates professional, legal, financial or medical advice."
  },
  "accessibility": {
    title: "Accessibility",
    body: "This site is designed for keyboard access, readable contrast, clear headings and responsive use. Accessibility corrections are treated as operating work, not optional polish."
  }
};

function IndexPage({ title, intro, items, basePath }) {
  return (
    <section className="shell section">
      <p className="eyebrow">Browse</p>
      <h1>{title}</h1>
      <p className="lead compact">{intro}</p>
      <div className="index-grid">
        {items.map((item) => (
          <Link key={item.slug} href={`${basePath}/${item.slug}`}>
            <strong>{item.name}</strong>
            {item.count !== undefined ? <span>{item.count} books</span> : null}
            {item.description ? <span>{item.description}</span> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}

function CollectionPage({ label, title, description, selectedBooks }) {
  return (
    <section className="shell section">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="lead compact">{description}</p>
      <div className="book-grid">{selectedBooks.map((book) => <BookCard key={book.slug} book={book} />)}</div>
    </section>
  );
}

function BookPage({ book }) {
  const related = books.filter((candidate) => candidate.slug !== book.slug && (candidate.series === book.series || candidate.topics.some((topic) => book.topics.includes(topic)))).slice(0, 3);
  return (
    <>
      <section className="shell section book-detail">
        <div className="cover large-cover">
          <span>{book.series}</span><strong>{book.title}</strong><small>{book.authors.join(" & ")}</small>
        </div>
        <div>
          <p className="eyebrow">{book.series}</p>
          <h1>{book.title}</h1>
          {book.subtitle ? <p className="subtitle large">{book.subtitle}</p> : null}
          <span className={`status status-${book.status.toLowerCase().replaceAll(" ","-")}`}>{book.status}</span>
          <p className="lead compact">{book.description}</p>
          <dl className="book-facts">
            <div><dt>Author</dt><dd>{book.authors.join(" & ")}</dd></div>
            <div><dt>Publisher</dt><dd>{book.publisher}</dd></div>
            <div><dt>Formats</dt><dd>{book.formats.join(", ")}</dd></div>
            <div><dt>Topics</dt><dd>{book.topics.join(", ")}</dd></div>
          </dl>
          <div className="actions">
            {book.amazon ? <a className="button button-primary" href={book.amazon}>View on Amazon</a> : <Link className="button button-secondary" href="/books">Return to catalog</Link>}
          </div>
        </div>
      </section>
      {related.length ? <section className="section section-alt"><div className="shell"><h2>Related books</h2><div className="book-grid">{related.map((item) => <BookCard key={item.slug} book={item} />)}</div></div></section> : null}
    </>
  );
}

export async function generateMetadata({ params }) {
  const { segments } = await params;
  if (segments?.[0] === "books" && segments[1]) {
    const book = bookBySlug(segments[1]);
    if (book) return { title: book.title, description: book.description };
  }
  return { title: segments?.map((item) => item.replaceAll("-", " ")).join(" · ") || "Catalog" };
}

export default async function CatchAllPage({ params }) {
  const { segments } = await params;
  const [section, slug] = segments || [];

  if (section === "books" && !slug) {
    return <section className="shell section"><p className="eyebrow">Complete catalog</p><h1>Books</h1><p className="lead compact">Search all {books.length} canonical books and active book projects.</p><CatalogClient books={books} /></section>;
  }
  if (section === "books" && slug) {
    const book = bookBySlug(slug);
    if (!book) notFound();
    return <BookPage book={book} />;
  }

  if (section === "series" && !slug) {
    const items = uniqueSeries().map((name) => ({ name, slug: slugify(name), count: booksBySeries(name).length }));
    return <IndexPage title="Series" intro="Browse complete reading paths and subject collections." items={items} basePath="/series" />;
  }
  if (section === "series" && slug) {
    const name = uniqueSeries().find((item) => slugify(item) === slug);
    if (!name) notFound();
    return <CollectionPage label="Series" title={name} description={`All public books in the ${name} collection.`} selectedBooks={booksBySeries(name)} />;
  }

  if (section === "topics" && !slug) {
    const items = uniqueTopics().map((name) => ({ name: name.replace(/\b\w/g, (c) => c.toUpperCase()), slug: slugify(name), count: booksByTopic(name).length }));
    return <IndexPage title="Topics" intro="Enter the catalog through the problem, interest or work that matters now." items={items} basePath="/topics" />;
  }
  if (section === "topics" && slug) {
    const name = uniqueTopics().find((item) => slugify(item) === slug);
    if (!name) notFound();
    return <CollectionPage label="Topic" title={name.replace(/\b\w/g, (c) => c.toUpperCase())} description={`Books connected to ${name}.`} selectedBooks={booksByTopic(name)} />;
  }

  if (section === "authors" && !slug) {
    const items = authors.map((author) => ({ ...author, count: booksByAuthor(author.name).length }));
    return <IndexPage title="Authors" intro="Public author and contributor records represented in the catalog." items={items} basePath="/authors" />;
  }
  if (section === "authors" && slug) {
    const author = authors.find((item) => item.slug === slug);
    if (!author) notFound();
    return <CollectionPage label="Author" title={author.name} description={author.bio} selectedBooks={booksByAuthor(author.name)} />;
  }

  if (section === "publishers" && !slug) {
    const items = publishers.map((publisher) => ({ ...publisher, count: books.filter((book) => book.publisher === publisher.name).length }));
    return <IndexPage title="Publishers" intro="Verified publishing identities used across the catalog." items={items} basePath="/publishers" />;
  }
  if (section === "publishers" && slug) {
    const publisher = publishers.find((item) => item.slug === slug);
    if (!publisher) notFound();
    return <CollectionPage label="Publisher" title={publisher.name} description={publisher.description} selectedBooks={books.filter((book) => book.publisher === publisher.name)} />;
  }

  if (staticPages[section] && !slug) {
    const page = staticPages[section];
    if (section === "start-here") {
      return (
        <section className="shell section">
          <p className="eyebrow">Decision guide</p><h1>{page.title}</h1><p className="lead compact">{page.body}</p>
          <div className="path-grid">
            <Link href="/topics/faith"><strong>Know God and strengthen faith</strong><span>Prayer, Bible study and Christian discipline.</span></Link>
            <Link href="/topics/family"><strong>Build the family</strong><span>Fatherhood, children, food, home and legacy.</span></Link>
            <Link href="/topics/veterans"><strong>Find veteran resources</strong><span>Start with the right first door.</span></Link>
            <Link href="/topics/ai"><strong>Use AI without losing control</strong><span>Judgment-first systems for work and income.</span></Link>
            <Link href="/topics/publishing"><strong>Write and sell books</strong><span>Ideas, KDP, catalogs and advertising.</span></Link>
            <Link href="/topics/fiction"><strong>Read fiction</strong><span>Office horror, family stories and children's fiction.</span></Link>
          </div>
        </section>
      );
    }
    return <section className="shell section prose-page"><p className="eyebrow">MasonDTorres.com</p><h1>{page.title}</h1><p className="lead compact">{page.body}</p></section>;
  }

  notFound();
}
