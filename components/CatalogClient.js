"use client";
import { useMemo, useState } from "react";
import { BookCard } from "./BookCard";

export function CatalogClient({ books }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categoryOptions = useMemo(() => ["All", ...new Set(books.map((book) => book.category))].sort((a, b) => a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)), [books]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return books.filter((book) => {
      const matchesCategory = category === "All" || book.category === category;
      const haystack = [book.title, book.category, book.series, book.status, ...book.authors].join(" ").toLowerCase();
      return matchesCategory && (!term || haystack.includes(term));
    });
  }, [books, query, category]);

  const clear = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <>
      <div className="filters" aria-label="Book catalog filters">
        <label>
          Search books
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, byline, or subject" />
        </label>
        <label>
          Subject
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      </div>

      <div className="results-row">
        <span><strong>{filtered.length}</strong> of {books.length} published books</span>
        {query || category !== "All" ? <button type="button" onClick={clear}>Clear</button> : null}
      </div>

      {filtered.length ? (
        <div className="book-grid">{filtered.map((book) => <BookCard key={book.slug} book={book} />)}</div>
      ) : (
        <div className="empty-state"><h2>No books found.</h2><p>Try another title, byline, or subject.</p></div>
      )}
    </>
  );
}
