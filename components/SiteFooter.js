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
          <Link href="/bookops">BookOps</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/accessibility">Accessibility</Link>
        </nav>
      </div>
      <div className="shell copyright">© {new Date().getFullYear()} Mason Torres. All rights reserved.</div>
    </footer>
  );
}
