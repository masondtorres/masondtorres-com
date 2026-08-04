import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Mason Torres
          </Link>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/books" className="hover:text-stone-600">
              Books
            </Link>
            <Link href="/series" className="hover:text-stone-600">
              Series
            </Link>
            <Link href="/start-here" className="hover:text-stone-600">
              Start Here
            </Link>
            <Link href="/about" className="hover:text-stone-600">
              About
            </Link>
            <Link href="/bookops" className="hover:text-stone-600">
              BookOps
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-stone-500">
            House of Torres Publishers
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Books for faith, family, work and building something real.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-stone-600">
            Mason Torres writes from conviction and lived work. Father of 13.
            Author. Operator. The books help people know God, love their
            families, think bigger and build something that lasts.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/books"
              className="rounded bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-stone-800"
            >
              Browse the books
            </Link>
            <Link
              href="/start-here"
              className="rounded border border-stone-300 px-6 py-3 text-sm font-medium hover:bg-stone-100"
            >
              Find the right starting point
            </Link>
          </div>
        </section>

        <section className="border-t border-stone-200 bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-semibold">Where to begin</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/topics/faith-and-family"
                className="rounded border border-stone-200 p-6 hover:border-stone-400"
              >
                <h3 className="font-medium">Faith and Family</h3>
                <p className="mt-2 text-sm text-stone-600">
                  Systems for men who want to lead their house with clarity and
                  conviction.
                </p>
              </Link>
              <Link
                href="/topics/veterans"
                className="rounded border border-stone-200 p-6 hover:border-stone-400"
              >
                <h3 className="font-medium">Veterans</h3>
                <p className="mt-2 text-sm text-stone-600">
                  Practical help and direction for those who served.
                </p>
              </Link>
              <Link
                href="/topics/publishing"
                className="rounded border border-stone-200 p-6 hover:border-stone-400"
              >
                <h3 className="font-medium">Publishing and AI</h3>
                <p className="mt-2 text-sm text-stone-600">
                  How to write, publish and build income with books and tools.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-semibold">Featured books</h2>
            <p className="mt-2 text-stone-600">
              A selection from the catalog. Full list on the books page.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded border border-stone-200 bg-white p-6">
                <p className="text-xs font-medium uppercase text-stone-500">
                  Fiction
                </p>
                <h3 className="mt-2 font-semibold">
                  The Curse of The Posted Note
                </h3>
                <p className="mt-2 text-sm text-stone-600">
                  An office horror story about silence, suppressed truth and
                  what the system remembers.
                </p>
                <Link
                  href="/books/the-curse-of-the-posted-note"
                  className="mt-4 inline-block text-sm font-medium underline"
                >
                  View book
                </Link>
              </div>
              <div className="rounded border border-stone-200 bg-white p-6">
                <p className="text-xs font-medium uppercase text-stone-500">
                  Faith and Family
                </p>
                <h3 className="mt-2 font-semibold">The House That Holds</h3>
                <p className="mt-2 text-sm text-stone-600">
                  A man&apos;s daily system for faith, family and a legacy that
                  cannot be shaken.
                </p>
                <Link
                  href="/books/the-house-that-holds"
                  className="mt-4 inline-block text-sm font-medium underline"
                >
                  View book
                </Link>
              </div>
              <div className="rounded border border-stone-200 bg-white p-6">
                <p className="text-xs font-medium uppercase text-stone-500">
                  Memoir
                </p>
                <h3 className="mt-2 font-semibold">Unshakable</h3>
                <p className="mt-2 text-sm text-stone-600">
                  The vivid vision of the House of Torres. A future memoir from
                  2030.
                </p>
                <Link
                  href="/books/unshakable"
                  className="mt-4 inline-block text-sm font-medium underline"
                >
                  View book
                </Link>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/books"
                className="text-sm font-medium underline"
              >
                See all books →
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-semibold">BookOps Studio</h2>
            <p className="mt-4 max-w-2xl text-stone-600">
              Private publishing operations tools for manuscript audit, KDP
              listing work and project tracking. Separate from the public
              catalog.
            </p>
            <Link
              href="/bookops"
              className="mt-6 inline-block rounded border border-stone-300 px-5 py-2.5 text-sm font-medium hover:bg-stone-50"
            >
              Learn about BookOps Studio
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-stone-100 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
            <div>
              <p className="font-semibold">Mason Torres</p>
              <p className="mt-1 text-sm text-stone-600">
                House of Torres Publishers
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
              <Link href="/accessibility" className="hover:underline">
                Accessibility
              </Link>
            </div>
          </div>
          <p className="mt-8 text-xs text-stone-500">
            © {new Date().getFullYear()} Mason Torres. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
