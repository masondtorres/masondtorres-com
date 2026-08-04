"use client";
import { useMemo, useState } from "react";
import { BookCard } from "./BookCard";

export function CatalogClient({ books }) {
  const [query, setQuery] = useState("");
  const [series, setSeries] = useState("All");
  const [topic, setTopic] = useState("All");
  const [status, setStatus] = useState("All");

  const seriesOptions = ["All", ...new Set(books.map((book) => book.series))];
  const topicOptions = ["All", ...new Set(books.flatMap((book) => book.topics))];
  const statusOptions = ["All", ...new Set(books.map((book) => book.status))];

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return books.filter((book) => {
      const haystack = [book.title, book.subtitle || "", book.series, book.publisher, ...book.authors, ...book.topics].join(" ").toLowerCase();
      return (!term || haystack.includes(term))
        && (series === "All" || book.series === series)
        && (topic === "All" || book.topics.includes(topic))
        && (status === "All" || book.status === status);
    });
  }, [books, query, series, topic, status]);

  return (
    <>
      <div className="filters" aria-label="Book filters">
        <label>Search
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, author, series or topic" />
        </label>
        <label>Series
          <select value={series} onChange={(event) => setSeries(event.target.value)}>
            {seriesOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>Topic
          <select value={topic} onChange={(event) => setTopic(event.target.value)}>
            {topicOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>Status
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {statusOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <div className="results-row">
        <strong>{filtered.length}</strong> books
        <button type="button" onClick={() => { setQuery(""); setSeries("All"); setTopic("All"); setStatus("All"); }}>Clear filters</button>
      </div>
      {filtered.length ? <div className="book-grid">{filtered.map((book) => <BookCard key={book.slug} book={book} />)}</div>
        : <div className="empty-state"><h2>No books match those filters.</h2><p>Clear the filters and try another search.</p></div>}
    </>
  );
}
