import Link from "next/link";
import { getAuthors, getBooks, getSeries } from "@/lib/catalog";
import { BookCard } from "@/components/BookCard";

const houseSites = [
  { name: "MasonDTorres.com", label: "Author", url: "https://masondtorres.com", description: "Mason Torres's author home, current work, and personal projects." },
  { name: "GT Playbook", label: "Dealerships", url: "https://gtplaybook.com", description: "Books, tools, and practical systems for independent auto dealers." },
  { name: "Vols4Vets", label: "Veterans", url: "https://vols4vets.com", description: "Public veteran resources and the companion field-guide project." },
  { name: "Smokies Insider", label: "Travel", url: "https://smokyinsider.com", description: "Smoky Mountains trip planning built around useful local decisions." },
  { name: "Volt Pro Services", label: "Family business", url: "https://voltproservices.com", description: "Samuel Torres's electrical-services business. Quotes and service requests stay on Volt Pro." },
  { name: "Local Trade Garden", label: "Marketplace", url: "https://localtradegarden.com", description: "A local marketplace for selling, trading, and giving useful things a second life." }
];

export default async function HomePage() {
  const books = await getBooks();
  const authors = await getAuthors();
  const series = await getSeries();
  const featured = books.filter((book) => book.featured).slice(0, 6);

  return (
    <>
      <section className="hero hero-home">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow">Towers Books · House of Torres</p>
            <h1>Find the book. Follow the work.</h1>
            <p className="lead">Towers Books is the publishing house and front door for a growing catalog of practical nonfiction, family books, fiction, journals, puzzles, and connected projects.</p>
            <div className="actions">
              <Link className="button button-primary" href="/books">Browse all {books.length} books</Link>
              <Link className="button button-secondary" href="/authors">Browse authors</Link>
            </div>
          </div>
          <nav className="hero-panel start-paths" aria-label="Browse Towers Books">
            <Link href="/books"><strong>{books.length} published titles</strong><span>Search and filter the full catalog.</span></Link>
            <Link href="/authors"><strong>{authors.length} credited authors & imprints</strong><span>Go straight to the name on the book.</span></Link>
            <Link href="/series"><strong>{series.length} series</strong><span>Keep related books together.</span></Link>
            <Link href="/house"><strong>From the House of Torres</strong><span>Books connect to useful sites without turning this into a link dump.</span></Link>
          </nav>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div><p className="eyebrow">Start here</p><h2>Featured books</h2></div>
          <Link className="text-link" href="/books">View full catalog</Link>
        </div>
        <div className="book-grid">{featured.map((book) => <BookCard key={book.slug} book={book} />)}</div>
      </section>

      <section className="section section-contrast">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow">The larger house</p><h2>From the House of Torres</h2></div>
            <Link className="text-link" href="/house">See how the sites fit together</Link>
          </div>
          <div className="website-grid">
            {houseSites.map((site) => (
              <a className="website-card" href={site.url} target="_blank" rel="noreferrer" key={site.url}>
                <span>{site.label}</span><h3>{site.name}</h3><p>{site.description}</p><strong>Visit site →</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section family-band">
        <div className="shell family-band-inner">
          <div>
            <p className="eyebrow">Storefront discipline</p>
            <h2>Only real books and real products.</h2>
            <p className="lead compact">Books link out only when a durable purchase path is verified. The Towers Books shop will stay closed until the products behind it are real.</p>
          </div>
          <Link className="button button-primary" href="/shop">Shop status</Link>
        </div>
      </section>
    </>
  );
}
