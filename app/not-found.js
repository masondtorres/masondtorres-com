import Link from "next/link";
export default function NotFound() {
  return <section className="shell section centered"><p className="eyebrow">404</p><h1>That page is not in the catalog.</h1><p>Use the complete book index to find the right title.</p><Link className="button button-primary" href="/books">Browse books</Link></section>;
}
