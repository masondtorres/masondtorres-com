import Link from "next/link";

const links = [
  ["Books", "/books"],
  ["Authors", "/authors"],
  ["Series", "/series"],
  ["House", "/house"],
  ["Shop", "/shop"],
  ["About", "/about"]
];

function NavLinks() {
  return links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>);
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/">Towers Books</Link>
        <nav className="nav-desktop" aria-label="Primary navigation"><NavLinks /></nav>
        <details className="nav-menu">
          <summary>Menu</summary>
          <nav aria-label="Primary navigation"><NavLinks /></nav>
        </details>
      </div>
    </header>
  );
}
