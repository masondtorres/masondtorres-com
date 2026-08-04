"use client";
import { useMemo, useState } from "react";
import { BookCard } from "./BookCard";

export function CatalogClient({ books }) {
  const [query, setQuery] = useState("");
  const [series, setSeries] = useState("All");
  const seriesOptions = ["All", ...new Set(books.map((book) => book.series))];

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return books.filter((book) => {
      const haystack = [book.title, book.subtitle || "", book.series, ...book.authors].join(" ").toLowerCase();
      return (!term || haystack.includes(term)) && (series === "All" || book.series === series);
    });
  }, [books, query, series]);

  const hasFilters = query || series !== "All";

  return (
    <>
      <div className="filters" aria-label="Book search">
        <label>
          Search books
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Title, author or series"
          />
        </label>
        <label>
          Series
          <select value={series} onChange={(event) => setSeries(event.target.value)}>
            {seriesOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <div className="results-row">
        <span><strong>{filtered.length}</strong> books</span>
        {hasFilters ? (
          <button type="button" onClick={() => { setQuery(""); setSeries("All"); }}>
            Clear
          </button>
        ) : null}
      </div>

      {filtered.length ? (
        <div className="book-grid">{filtered.map((book) => <BookCard key={book.slug} book={book} />)}</div>
      ) : (
        <div className="empty-state"><h2>No books found.</h2><p>Try another title, author or series.</p></div>
      )}
    </>
  );
}
