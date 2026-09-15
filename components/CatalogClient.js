"use client";
import { useEffect, useMemo, useState } from "react";
import { BookCard } from "./BookCard";

function sortBooks(books) {
  const statusRank = { "Available Now": 0, "Being Revised": 1, "Major Revision": 2, "Temporarily Unavailable": 3 };
  return [...books].sort((a, b) => {
    const featured = Number(!a.featured) - Number(!b.featured);
    if (featured) return featured;
    const status = (statusRank[a.status] ?? 9) - (statusRank[b.status] ?? 9);
    if (status) return status;
    const mason = Number(!a.authors.includes("Mason Torres")) - Number(!b.authors.includes("Mason Torres"));
    if (mason) return mason;
    const puzzle = Number(a.category === "Puzzle Books") - Number(b.category === "Puzzle Books");
    if (puzzle) return puzzle;
    return a.title.localeCompare(b.title);
  });
}

export function CatalogClient({ books }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categoryOptions = useMemo(() => ["All", ...new Set(books.map((book) => book.category))].sort((a, b) => a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)), [books]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextQuery = params.get("q") || "";
    const nextSubject = params.get("subject") || "All";
    if (nextQuery) setQuery(nextQuery);
    if (nextSubject && (nextSubject === "All" || books.some((book) => book.category === nextSubject))) {
      setCategory(nextSubject);
    }
  }, [books]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const matches = books.filter((book) => {
      const matchesCategory = category === "All" || book.category === category;
      const haystack = [book.title, book.category, book.series, book.status, ...book.authors].join(" ").toLowerCase();
      return matchesCategory && (!term || haystack.includes(term));
    });
    return sortBooks(matches);
  }, [books, query, category]);

  const clear = () => {
    setQuery("");
    setCategory("All");
    if (typeof window !== "undefined" && window.history) {
      window.history.replaceState({}, "", "/books");
    }
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
