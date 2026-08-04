"use client";
import { useMemo, useState } from "react";
import { BookCard } from "./BookCard";

export function CatalogClient({ books }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return books;
    return books.filter((book) => {
      const haystack = [book.title, book.subtitle || "", book.series, ...book.authors].join(" ").toLowerCase();
      return haystack.includes(term);
    });
  }, [books, query]);

  return (
    <>
      <div className="filters" style={{ gridTemplateColumns: "1fr", maxWidth: "680px" }} aria-label="Book search">
        <label>
          Search selected books
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Title, author, or subject"
          />
        </label>
      </div>

      <div className="results-row">
        <span><strong>{filtered.length}</strong> selected books shown</span>
        {query ? <button type="button" onClick={() => setQuery("")}>Clear</button> : null}
      </div>

      {filtered.length ? (
        <div className="book-grid">{filtered.map((book) => <BookCard key={book.slug} book={book} />)}</div>
      ) : (
        <div className="empty-state"><h2>No selected books found.</h2><p>Try another title, author, or subject.</p></div>
      )}
    </>
  );
}
