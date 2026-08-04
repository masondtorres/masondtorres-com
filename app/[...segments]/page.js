import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogClient } from "@/components/CatalogClient";
import { books, bookBySlug, publishedBookCount } from "@/lib/data";

const baseUrl = "https://masondtorres-com.vercel.app";

function BookPage({ book }) {
  return (
    <section className="shell section book-detail">
      <div className="cover large-cover" aria-label={`Designed text cover for ${book.title}`}>
        <span>{book.series}</span>
        <strong>{book.title}</strong>
        <small>{book.authors.join(" & ")}</small>
      </div>
      <div>
        <p className="eyebrow">Available now</p>
        <h1>{book.title}</h1>
        {book.subtitle ? <p className="subtitle large">{book.subtitle}</p> : null}
        <p className="book-meta-line">By {book.authors.join(" & ")}</p>
        <p className="lead compact">{book.description}</p>
        <p className="publisher-line">Published by {book.publisher}</p>
        <div className="actions">
          <a className="button button-primary" href={book.retailerUrl} target="_blank" rel="noreferrer">
            {book.retailerLabel}
          </a>
          <Link className="button button-secondary" href="/books">Back to books</Link>
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
        description: book.description,
        alternates: { canonical: `${baseUrl}/books/${book.slug}` },
        openGraph: {
          title: book.title,
          description: book.description,
          url: `${baseUrl}/books/${book.slug}`,
          type: "book"
        }
      };
    }
  }

  if (section === "books") {
    return {
      title: "Books",
      description: `${publishedBookCount} published books by Mason Torres and collaborators.`,
      alternates: { canonical: `${baseUrl}/books` }
    };
  }

  if (section === "about") {
    return {
      title: "About Mason Torres",
      description: "About author, entrepreneur, operator, veteran, husband, and father Mason Torres.",
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
    return (
      <section className="shell section">
        <h1>{publishedBookCount} Published Books</h1>
        <p className="lead compact">This page currently highlights selected titles from Mason Torres's published catalog. It is not the complete 84-book list.</p>
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
        <p>His books grow out of lived work: leading a large family, building businesses, serving veterans, navigating financial pressure, and creating practical systems that people can use immediately.</p>
        <p>He writes about faith, family, business, publishing, artificial intelligence, timeshare, and fiction. House of Torres Publishers is the independent publishing home for this work.</p>
        <div className="actions"><Link className="button button-primary" href="/books">Browse selected books</Link></div>
      </section>
    );
  }

  if (section === "privacy" && !slug) {
    return (
      <section className="shell section prose-page">
        <h1>Privacy</h1>
        <p>This website does not require an account, accept payments, or collect information through a contact form. The hosting provider may process standard technical logs for security, reliability, and site operation.</p>
        <p>Retailer links take visitors to third-party websites governed by those retailers' own privacy policies and terms.</p>
      </section>
    );
  }

  notFound();
}
