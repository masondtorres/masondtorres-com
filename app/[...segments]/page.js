import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogClient } from "@/components/CatalogClient";
import { books, bookBySlug, publishedBookCount } from "@/lib/data";

const baseUrl = "https://masondtorres-com.vercel.app";

function statusClass(status) {
  return `status status-${status.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function BookPage({ book }) {
  return (
    <section className="shell section book-detail">
      <div className="cover large-cover" aria-label={`Text cover for ${book.title}`}>
        <span>{book.category}</span>
        <strong>{book.title}</strong>
        <small>{book.authors.join(" & ")}</small>
      </div>
      <div>
        <span className={statusClass(book.status)}>{book.status}</span>
        <h1>{book.title}</h1>
        <p className="book-meta-line">By {book.authors.join(" & ")}</p>
        {book.series && book.series !== book.category ? <p className="publisher-line">Series: {book.series}</p> : null}

        {book.formats.length ? (
          <>
            <h2 className="format-heading">Available formats</h2>
            <div className="format-list">
              {book.formats.map((format) => (
                <a key={format.asin} className="format-link" href={format.url} target="_blank" rel="noreferrer">
                  <strong>{format.name}</strong>
                  <span>{format.price ? `$${format.price}` : "View on Amazon"}</span>
                </a>
              ))}
            </div>
          </>
        ) : (
          <p className="revision-note">This published title is currently being corrected or revised. A purchase link will return when the updated edition is available.</p>
        )}

        <div className="actions">
          <Link className="button button-secondary" href="/books">Back to all books</Link>
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({ params }) {
  const { segments } = await params;
  const [section, slug] = segments || [];

  if (section === "books" && slug) {
    const book = bookBySlug(slug);
    if (book) {
      return {
        title: book.title,
        description: `${book.title} by ${book.authors.join(" and ")}. ${book.status}.`,
        alternates: { canonical: `${baseUrl}/books/${book.slug}` },
        openGraph: {
          title: book.title,
          description: `${book.status} — ${book.category}`,
          url: `${baseUrl}/books/${book.slug}`,
          type: "book"
        }
      };
    }
  }

  if (section === "books") {
    return {
      title: "Books",
      description: `${publishedBookCount} published books by Mason Torres, House of Torres Publishers, and collaborators.`,
      alternates: { canonical: `${baseUrl}/books` }
    };
  }

  if (section === "about") {
    return {
      title: "About Mason Torres",
      description: `Mason Torres is an author of ${publishedBookCount} published books, entrepreneur, U.S. Air Force veteran, husband, and father of 13.`,
      alternates: { canonical: `${baseUrl}/about` }
    };
  }

  if (section === "privacy") {
    return { title: "Privacy", alternates: { canonical: `${baseUrl}/privacy` } };
  }

  return { title: "Mason Torres" };
}

export default async function CatchAllPage({ params }) {
  const { segments } = await params;
  const [section, slug] = segments || [];

  if (section === "books" && !slug) {
    const available = books.filter((book) => book.status === "Available Now").length;
    const updating = books.length - available;
    return (
      <section className="shell section">
        <p className="eyebrow">Complete published catalog</p>
        <h1>{publishedBookCount} Books</h1>
        <p className="lead compact">{available} titles currently have direct Amazon links. {updating} published titles are being revised or corrected.</p>
        <CatalogClient books={books} />
      </section>
    );
  }

  if (section === "books" && slug) {
    const book = bookBySlug(slug);
    if (!book) notFound();
    return <BookPage book={book} />;
  }

  if (section === "about" && !slug) {
    return (
      <section className="shell section prose-page about-page">
        <p className="eyebrow">About the author</p>
        <h1>Mason Torres</h1>
        <p className="lead compact">Mason Torres is an author of {publishedBookCount} published books, entrepreneur, operator, U.S. Air Force veteran, husband, and father of 13.</p>
        <p>His work comes from lived experience: leading a large family, building businesses, serving veterans, working in sales, navigating financial pressure, and turning practical systems into books people can use.</p>
        <p>The catalog spans faith and family, business, veterans, publishing, artificial intelligence, timeshare, fiction, children’s books, journals, and puzzle books.</p>
        <div className="actions"><Link className="button button-primary" href="/books">Browse all {publishedBookCount} books</Link></div>
      </section>
    );
  }

  if (section === "privacy" && !slug) {
    return (
      <section className="shell section prose-page">
        <h1>Privacy</h1>
        <p>This website does not require an account, accept payments, or collect information through a contact form. The hosting provider may process standard technical logs for security, reliability, and site operation.</p>
        <p>Amazon and other retailer links open third-party websites governed by those retailers’ own privacy policies and terms.</p>
      </section>
    );
  }

  notFound();
}
