import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/">Mason Torres</Link>
        <nav aria-label="Primary navigation">
          <Link href="/books">Books</Link>
          <Link href="/series">Series</Link>
          <Link href="/topics">Topics</Link>
          <Link href="/start-here">Start Here</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
