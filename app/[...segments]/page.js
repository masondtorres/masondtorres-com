import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogClient } from "@/components/CatalogClient";
import { BookCard } from "@/components/BookCard";
import {
  books,
  authors,
  publishers,
  bookBySlug,
  uniqueSeries,
  uniqueTopics,
  booksBySeries,
  booksByTopic,
  booksByAuthor,
  slugify
} from "@/lib/data";

const staticPages = {
  about: {
    title: "About Mason Torres",
    body: "Mason Torres is an author, entrepreneur, operator and father of 13. He writes practical books about faith, family, veterans, business, publishing, artificial intelligence and fiction."
  },
  bookops: {
    title: "BookOps Studio",
    body: "BookOps Studio is a separate publishing operations tool for manuscript audits, catalog work and production systems."
  },
  privacy: {
    title: "Privacy",
    body: "This public catalog does not require accounts, accept payments or collect information through a contact form. Standard hosting logs may be processed for security and site operation."
  },
  terms: {
    title: "Terms",
    body: "Book descriptions and availability are provided for general information. Retailer availability, formats and pricing may change."
  },
  accessibility: {
    title: "Accessibility",
    body: "This site is designed for keyboard access, readable contrast, clear headings and responsive use."
  }
};

function IndexPage({ title, items, basePath }) {
  return (
    <section className="shell section">
      <h1>{title}</h1>
      <div className="index-grid">
        {items.map((item) => (
          <Link key={item.slug} href={`${basePath}/${item.slug}`}>
            <strong>{item.name}</strong>
            {item.count !== undefined ? <span>{item.count} books</span> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}

function CollectionPage({ title, selectedBooks }) {
  return (
    <section className="shell section">
      <h1>{title}</h1>
      <div className="book-grid">
        {selectedBooks.map((book) => <BookCard key={book.slug} book={book} />)}
      </div>
    </section>
  );
}

function BookPage({ book }) {
  return (
    <section className="shell section book-detail">
      <div className="cover large-cover">
        <span>{book.series}</span>
        <strong>{book.title}</strong>
        <small>{book.authors.join(" & ")}</small>
      </div>
      <div>
        <p className="eyebrow">{book.series}</p>
        <h1>{book.title}</h1>
        {book.subtitle ? <p className="subtitle large">{book.subtitle}</p> : null}
        <p className="book-meta-line">By {book.authors.join(" & ")}</p>
        <span className={`status status-${book.status.toLowerCase().replaceAll(" ", "-")}`}>{book.status}</span>
        <p className="lead compact">{book.description}</p>
        <div className="actions">
          {book.amazon ? (
            <a className="button button-primary" href={book.amazon}>View on Amazon</a>
          ) : (
            <Link className="button button-secondary" href="/books">Back to books</Link>
          )}
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({ params }) {
  const { segments } = await params;
  if (segments?.[0] === "books" && segments[1]) {
    const book = bookBySlug(segments[1]);
    if (book) return { title: book.title, description: book.description };
  }
  return { title: segments?.map((item) => item.replaceAll("-", " ")).join(" · ") || "Books" };
}

export default async function CatchAllPage({ params }) {
  const { segments } = await params;
  const [section, slug] = segments || [];

  if (section === "books" && !slug) {
    return (
      <section className="shell section">
        <h1>Books</h1>
        <p className="lead compact">Search by title, author or series.</p>
        <CatalogClient books={books} />
      </section>
    );
  }

  if (section === "books" && slug) {
    const book = bookBySlug(slug);
    if (!book) notFound();
    return <BookPage book={book} />;
  }

  if (section === "series" && !slug) {
    const items = uniqueSeries().map((name) => ({ name, slug: slugify(name), count: booksBySeries(name).length }));
    return <IndexPage title="Series" items={items} basePath="/series" />;
  }

  if (section === "series" && slug) {
    const name = uniqueSeries().find((item) => slugify(item) === slug);
    if (!name) notFound();
    return <CollectionPage title={name} selectedBooks={booksBySeries(name)} />;
  }

  if (section === "topics" && !slug) {
    const items = uniqueTopics().map((name) => ({
      name: name.replace(/\b\w/g, (character) => character.toUpperCase()),
      slug: slugify(name),
      count: booksByTopic(name).length
    }));
    return <IndexPage title="Topics" items={items} basePath="/topics" />;
  }

  if (section === "topics" && slug) {
    const name = uniqueTopics().find((item) => slugify(item) === slug);
    if (!name) notFound();
    return <CollectionPage title={name.replace(/\b\w/g, (character) => character.toUpperCase())} selectedBooks={booksByTopic(name)} />;
  }

  if (section === "authors" && !slug) {
    const items = authors.map((author) => ({ ...author, count: booksByAuthor(author.name).length }));
    return <IndexPage title="Authors" items={items} basePath="/authors" />;
  }

  if (section === "authors" && slug) {
    const author = authors.find((item) => item.slug === slug);
    if (!author) notFound();
    return <CollectionPage title={author.name} selectedBooks={booksByAuthor(author.name)} />;
  }

  if (section === "publishers" && !slug) {
    const items = publishers.map((publisher) => ({
      ...publisher,
      count: books.filter((book) => book.publisher === publisher.name).length
    }));
    return <IndexPage title="Publishers" items={items} basePath="/publishers" />;
  }

  if (section === "publishers" && slug) {
    const publisher = publishers.find((item) => item.slug === slug);
    if (!publisher) notFound();
    return <CollectionPage title={publisher.name} selectedBooks={books.filter((book) => book.publisher === publisher.name)} />;
  }

  if (section === "start-here" && !slug) {
    return (
      <section className="shell section centered prose-page">
        <h1>Start with the books.</h1>
        <p className="lead compact">Search the catalog by title, author or series.</p>
        <div className="actions centered-actions">
          <Link className="button button-primary" href="/books">Browse books</Link>
        </div>
      </section>
    );
  }

  if (staticPages[section] && !slug) {
    const page = staticPages[section];
    return (
      <section className="shell section prose-page">
        <h1>{page.title}</h1>
        <p className="lead compact">{page.body}</p>
      </section>
    );
  }

  notFound();
}
