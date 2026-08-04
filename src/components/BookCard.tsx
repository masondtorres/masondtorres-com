import Link from "next/link";
import type { Book } from "@/data/books";
import { BookCover } from "./BookCover";
import { BookStatusBadge } from "./BookStatus";
export function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex flex-col rounded-lg border border-stone-200 bg-white overflow-hidden hover:border-stone-400 transition-colors">
      <Link href={`/books/${book.slug}`} className="block"><BookCover book={book} /></Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2"><BookStatusBadge status={book.status} />{book.series && <span className="text-xs text-stone-500 truncate">{book.series}</span>}</div>
        <h3 className="mt-2 font-semibold leading-snug"><Link href={`/books/${book.slug}`} className="hover:underline">{book.title}</Link></h3>
        {book.subtitle && <p className="mt-1 text-sm text-stone-600 line-clamp-2">{book.subtitle}</p>}
        <p className="mt-2 text-sm text-stone-700">{book.authors.join(", ")}</p>
        <p className="mt-3 text-sm text-stone-600 line-clamp-3 flex-1">{book.shortDescription}</p>
        <div className="mt-4 flex items-center gap-3">
          <Link href={`/books/${book.slug}`} className="text-sm font-medium underline underline-offset-2">Details</Link>
          {book.amazonLinks && book.amazonLinks.length > 0 && <a href={book.amazonLinks[0].url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-stone-700 hover:text-stone-950">View on Amazon</a>}
        </div>
      </div>
    </article>
  );
}
