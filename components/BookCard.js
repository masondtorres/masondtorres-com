import Link from "next/link";

function statusClass(status) {
  return `status status-${status.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export function BookCard({ book }) {
  return (
    <article className="book-card">
      <div className="cover" aria-label={`Text cover for ${book.title}`}>
        <span>{book.category}</span>
        <strong>{book.title}</strong>
        <small>{book.authors.join(" & ")}</small>
      </div>
      <div className="card-body">
        <span className={statusClass(book.status)}>{book.status}</span>
        <h2><Link href={`/books/${book.slug}`}>{book.title}</Link></h2>
        <p className="book-meta-line">By {book.authors.join(" & ")}</p>
        <div className="actions">
          <Link className="button button-secondary" href={`/books/${book.slug}`}>Details</Link>
          {book.retailerUrl ? (
            <a className="button button-primary" href={book.retailerUrl} target="_blank" rel="noreferrer">
              {book.retailerLabel}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
