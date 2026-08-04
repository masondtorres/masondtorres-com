import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <strong>Mason Torres</strong>
          <p>House of Torres Publishers</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/books">Books</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
      <div className="shell copyright">© {new Date().getFullYear()} Mason Torres. All rights reserved.</div>
    </footer>
  );
}
