"use client";

import { useMemo, useState } from "react";

function preferredAsin(book) {
  if (!book?.formats?.length) return null;
  const paperback = book.formats.find((format) => /paperback/i.test(format.name));
  const hardcover = book.formats.find((format) => /hardcover/i.test(format.name));
  return (paperback || hardcover || book.formats[0])?.asin || null;
}

export function BookCover({ book, large = false, linked = false }) {
  const asin = useMemo(() => preferredAsin(book), [book]);
  const [failed, setFailed] = useState(false);
  const image = asin && !failed ? (
    <img
      className={large ? "book-cover-image book-cover-image-large" : "book-cover-image"}
      src={`/cover/${asin}`}
      alt={`${book.title} cover`}
      loading={large ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  ) : (
    <span className={large ? "cover text-cover large-cover" : "cover text-cover"} role="img" aria-label={`Cover placeholder for ${book.title}`}>
      <span>{book.category}</span>
      <strong>{book.title}</strong>
      <small>{book.authors.join(" & ")}</small>
    </span>
  );

  if (linked) {
    return <a className="cover-link" href={`/books/${book.slug}`} aria-label={`View ${book.title}`}>{image}</a>;
  }

  return image;
}
