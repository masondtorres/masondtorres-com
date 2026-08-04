import Link from "next/link";

export function BookCard({ book }) {
  return (
    <article className="book-card">
      <div className="cover" aria-label={`Designed text cover for ${book.title}`}>
        <span>{book.series}</span>
        <strong>{book.title}</strong>
        <small>{book.authors.join(" & ")}</small>
      </div>
      <div className="card-body">
        <h2><Link href={`/books/${book.slug}`}>{book.title}</Link></h2>
        {book.subtitle ? <p className="subtitle">{book.subtitle}</p> : null}
        <p>{book.description}</p>
        <div className="actions">
          <Link className="button button-secondary" href={`/books/${book.slug}`}>Details</Link>
          <a className="button button-primary" href={book.retailerUrl} target="_blank" rel="noreferrer">
            {book.retailerLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
