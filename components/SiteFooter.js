import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <strong>Towers Books</strong>
          <p>Books from the House of Torres.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/books">Books</Link>
          <Link href="/authors">Authors</Link>
          <Link href="/series">Series</Link>
          <Link href="/house">House</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
      <div className="shell copyright">© {new Date().getFullYear()} Towers Books. All rights reserved.</div>
    </footer>
  );
}
