"use client";
import Link from "next/link";
import { useState } from "react";
const nav = [{ href: "/books", label: "Books" }, { href: "/series", label: "Series" }, { href: "/authors", label: "Authors" }, { href: "/start-here", label: "Start Here" }, { href: "/about", label: "About" }, { href: "/bookops", label: "BookOps" }];
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">Mason Torres</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {nav.map(item => <Link key={item.href} href={item.href} className="hover:text-stone-600">{item.label}</Link>)}
        </nav>
        <button type="button" className="md:hidden p-2" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">{open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}</svg>
        </button>
      </div>
      {open && <nav className="md:hidden border-t border-stone-200 bg-white px-4 py-4 flex flex-col gap-3">{nav.map(item => <Link key={item.href} href={item.href} className="text-sm font-medium py-2" onClick={() => setOpen(false)}>{item.label}</Link>)}</nav>}
    </header>
  );
}
