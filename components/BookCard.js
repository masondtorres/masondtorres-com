import Link from "next/link";
import { BookCover } from "./BookCover";

function statusClass(status) {
  return `status status-${status.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export function BookCard({ book }) {
  return (
    <article className="book-card">
      <div className="cover-media"><BookCover book={book} linked /></div>
      <div className="card-body">
        <span className={statusClass(book.status)}>{book.status}</span>
        <h3><Link href={`/books/${book.slug}`}>{book.title}</Link></h3>
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
