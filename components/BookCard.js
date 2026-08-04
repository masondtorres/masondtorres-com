import Link from "next/link";

export function BookCard({ book }) {
  return (
    <article className="book-card">
      <div className="cover" aria-label={`Text cover placeholder for ${book.title}`}>
        <span>{book.series}</span>
        <strong>{book.title}</strong>
        <small>{book.authors.join(" & ")}</small>
      </div>
      <div className="card-body">
        <span className={`status status-${book.status.toLowerCase().replaceAll(" ", "-")}`}>{book.status}</span>
        <h2><Link href={`/books/${book.slug}`}>{book.title}</Link></h2>
        <p>{book.description}</p>
        <Link className="text-link" href={`/books/${book.slug}`}>Details</Link>
      </div>
    </article>
  );
}
