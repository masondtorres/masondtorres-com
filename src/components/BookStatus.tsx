import type { BookStatus } from "@/data/books";
const styles: Record<BookStatus, string> = { "Available Now": "bg-green-100 text-green-800", "Coming Soon": "bg-blue-100 text-blue-800", "In Development": "bg-amber-100 text-amber-800", "Being Revised": "bg-orange-100 text-orange-800", "Temporarily Unavailable": "bg-stone-100 text-stone-600", "Previously Published": "bg-purple-100 text-purple-800" };
export function BookStatusBadge({ status }: { status: BookStatus }) {
  return <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${styles[status]}`}>{status}</span>;
}
