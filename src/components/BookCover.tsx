import type { Book } from "@/data/books";
export function BookCover({ book, size = "card" }: { book: Book; size?: "card" | "detail" }) {
  const height = size === "detail" ? "h-80" : "h-48";
  return (
    <div className={`${height} bg-gradient-to-br from-stone-800 to-stone-950 flex flex-col items-center justify-center p-4 text-center`} role="img" aria-label={`Cover placeholder for ${book.title}`}>
      <p className="text-xs uppercase tracking-widest text-stone-300">{book.series || "Mason Torres"}</p>
      <p className="mt-3 text-sm font-semibold text-white leading-snug max-w-[12rem]">{book.title}</p>
      <p className="mt-2 text-xs text-stone-300">{book.authors[0]}</p>
    </div>
  );
}
