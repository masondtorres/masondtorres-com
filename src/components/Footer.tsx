import Link from "next/link";
export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div><p className="font-semibold">Mason Torres</p><p className="mt-1 text-sm text-stone-600">House of Torres Publishers</p><p className="mt-3 text-sm text-stone-600 max-w-xs">Books for faith, family, work and building something real.</p></div>
          <div><p className="text-sm font-semibold">Explore</p><ul className="mt-3 space-y-2 text-sm"><li><Link href="/books">Books</Link></li><li><Link href="/series">Series</Link></li><li><Link href="/authors">Authors</Link></li><li><Link href="/start-here">Start Here</Link></li></ul></div>
          <div><p className="text-sm font-semibold">About</p><ul className="mt-3 space-y-2 text-sm"><li><Link href="/about">About Mason</Link></li><li><Link href="/bookops">BookOps Studio</Link></li><li><Link href="/publishers">Publishers</Link></li></ul></div>
          <div><p className="text-sm font-semibold">Legal</p><ul className="mt-3 space-y-2 text-sm"><li><Link href="/privacy">Privacy</Link></li><li><Link href="/terms">Terms</Link></li><li><Link href="/accessibility">Accessibility</Link></li></ul></div>
        </div>
        <p className="mt-10 text-xs text-stone-500">© {new Date().getFullYear()} Mason Torres / House of Torres Publishers. All rights reserved.</p>
      </div>
    </footer>
  );
}
