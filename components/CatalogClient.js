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
    return a.title.localeCompare(b.title);
  });
}

function options(values) {
  return ["All", ...new Set(values.filter(Boolean))].sort((a, b) => a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b));
}

export function CatalogClient({ books, initialAuthor = "All", initialSeries = "All" }) {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All");
  const [author, setAuthor] = useState(initialAuthor);
  const [series, setSeries] = useState(initialSeries);
  const [language, setLanguage] = useState("All");
  const [format, setFormat] = useState("All");

  const subjectOptions = useMemo(() => options(books.map((book) => book.category)), [books]);
  const authorOptions = useMemo(() => options(books.flatMap((book) => book.authors)), [books]);
  const seriesOptions = useMemo(() => options(books.map((book) => book.series)), [books]);
  const languageOptions = useMemo(() => options(books.map((book) => book.language)), [books]);
  const formatOptions = useMemo(() => options(books.flatMap((book) => book.formats.map((item) => item.name))), [books]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
    if (params.get("subject")) setSubject(params.get("subject"));
    if (params.get("author")) setAuthor(params.get("author"));
    if (params.get("series")) setSeries(params.get("series"));
    if (params.get("language")) setLanguage(params.get("language"));
    if (params.get("format")) setFormat(params.get("format"));
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return sortBooks(books.filter((book) => {
      const haystack = [
        book.title,
        book.category,
        book.series,
        book.language,
        book.status,
        ...book.authors,
        ...(book.searchAliases || []),
        ...book.formats.map((item) => item.name)
      ].filter(Boolean).join(" ").toLowerCase();
      return (subject === "All" || book.category === subject)
        && (author === "All" || book.authors.includes(author))
        && (series === "All" || book.series === series)
        && (language === "All" || book.language === language)
        && (format === "All" || book.formats.some((item) => item.name === format))
        && (!term || haystack.includes(term));
    }));
  }, [books, query, subject, author, series, language, format]);

  const clear = () => {
    setQuery("");
    setSubject("All");
    setAuthor("All");
    setSeries("All");
    setLanguage("All");
    setFormat("All");
    window.history.replaceState({}, "", "/books");
  };

  const active = query || subject !== "All" || author !== "All" || series !== "All" || language !== "All" || format !== "All";

  return (
    <>
      <div className="filters" aria-label="Book catalog filters">
        <label>Search books<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, author, series, or subject" /></label>
        <label>Author<select value={author} onChange={(event) => setAuthor(event.target.value)}>{authorOptions.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Series<select value={series} onChange={(event) => setSeries(event.target.value)}>{seriesOptions.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Subject<select value={subject} onChange={(event) => setSubject(event.target.value)}>{subjectOptions.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Language<select value={language} onChange={(event) => setLanguage(event.target.value)}>{languageOptions.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Format<select value={format} onChange={(event) => setFormat(event.target.value)}>{formatOptions.map((value) => <option key={value}>{value}</option>)}</select></label>
      </div>
      <div className="results-row" aria-live="polite">
        <span><strong>{filtered.length}</strong> of {books.length} published books</span>
        {active ? <button type="button" onClick={clear}>Clear filters</button> : null}
      </div>
      {filtered.length ? (
        <div className="book-grid">{filtered.map((book) => <BookCard key={book.slug} book={book} />)}</div>
      ) : (
        <div className="empty-state"><h2>No books found.</h2><p>Try another title, author, series, subject, language, or format.</p><button className="button button-secondary" type="button" onClick={clear}>Clear filters</button></div>
      )}
    </>
  );
}
