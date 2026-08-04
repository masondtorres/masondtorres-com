"use client";
import { useMemo, useState } from "react";
import type { Book } from "@/data/books";
import { BookCard } from "@/components/BookCard";
export function BooksClient({ books }: { books: Book[] }) {
  const [query, setQuery] = useState("");
  const [series, setSeries] = useState("");
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("");
  const seriesOptions = useMemo(() => Array.from(new Set(books.map(b => b.series).filter(Boolean))) as string[], [books]);
  const topicOptions = useMemo(() => Array.from(new Set(books.flatMap(b => b.topics))), [books]);
  const statusOptions = useMemo(() => Array.from(new Set(books.map(b => b.status))), [books]);
  const filtered = useMemo(() => books.filter(b => {
    const q = query.toLowerCase();
    const matchesQuery = !q || b.title.toLowerCase().includes(q) || b.subtitle?.toLowerCase().includes(q) || b.authors.some(a => a.toLowerCase().includes(q)) || b.publisher.toLowerCase().includes(q) || b.series?.toLowerCase().includes(q);
    return matchesQuery && (!series || b.series === series) && (!topic || b.topics.includes(topic)) && (!status || b.status === status);
  }), [books, query, series, topic, status]);
  return (
    <div className="mt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="flex-1 min-w-[200px]"><label htmlFor="search" className="block text-sm font-medium">Search</label><input id="search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Title, author, publisher..." className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm" /></div>
        <div><label htmlFor="series" className="block text-sm font-medium">Series</label><select id="series" value={series} onChange={e => setSeries(e.target.value)} className="mt-1 rounded border border-stone-300 px-3 py-2 text-sm"><option value="">All</option>{seriesOptions.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
        <div><label htmlFor="topic" className="block text-sm font-medium">Topic</label><select id="topic" value={topic} onChange={e => setTopic(e.target.value)} className="mt-1 rounded border border-stone-300 px-3 py-2 text-sm"><option value="">All</option>{topicOptions.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
        <div><label htmlFor="status" className="block text-sm font-medium">Status</label><select id="status" value={status} onChange={e => setStatus(e.target.value)} className="mt-1 rounded border border-stone-300 px-3 py-2 text-sm"><option value="">All</option>{statusOptions.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
        {(query || series || topic || status) && <button type="button" onClick={() => { setQuery(""); setSeries(""); setTopic(""); setStatus(""); }} className="text-sm underline">Clear</button>}
      </div>
      <p className="mt-4 text-sm text-stone-600">{filtered.length} book{filtered.length !== 1 ? "s" : ""}</p>
      {filtered.length === 0 ? <div className="mt-12 text-center text-stone-600"><p>No books match the current filters.</p><button type="button" onClick={() => { setQuery(""); setSeries(""); setTopic(""); setStatus(""); }} className="mt-2 text-sm underline">Clear filters</button></div> : <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(book => <BookCard key={book.id} book={book} />)}</div>}
    </div>
  );
}
