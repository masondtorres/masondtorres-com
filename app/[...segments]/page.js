import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogClient } from "@/components/CatalogClient";
import { BookCard } from "@/components/BookCard";
import { BookCover } from "@/components/BookCover";
import { getAuthors, getBookBySlug, getBooks, getSeries, slugify } from "@/lib/catalog";

const baseUrl = "https://towersbooks.com";
const houseSites = [
  { name: "MasonDTorres.com", label: "Author", url: "https://masondtorres.com", what: "Mason Torres's author home and current work.", who: "Readers following Mason's books and projects.", why: "Keeps the author story separate from the publishing-house catalog." },
  { name: "GT Playbook", label: "Dealerships", url: "https://gtplaybook.com", what: "Books, tools, and operating systems for independent auto dealers.", who: "Owners, managers, and dealership teams.", why: "Dealer-specific help belongs where the tools and consulting live." },
  { name: "Vols4Vets", label: "Veterans", url: "https://vols4vets.com", what: "Public veteran resources and a companion field-guide project.", who: "Veterans, families, and people helping them find the next step.", why: "Resource navigation needs its own focused public-service home." },
  { name: "Smokies Insider", label: "Travel", url: "https://smokyinsider.com", what: "Smoky Mountains trip planning and local decision support.", who: "Visitors planning Gatlinburg, Pigeon Forge, Sevierville, and park days.", why: "Travel planning is more useful as an interactive destination than a book page." },
  { name: "Volt Pro Services", label: "Family business", url: "https://voltproservices.com", what: "Samuel Torres's electrical-services business.", who: "Customers looking for electrical service in the Sevierville area.", why: "Towers Books can refer family work; quotes and service requests stay on Volt Pro." },
  { name: "Local Trade Garden", label: "Marketplace", url: "https://localtradegarden.com", what: "A local marketplace for selling, trading, and giving items away.", who: "Neighbors who want useful local exchange without fake inventory.", why: "Marketplace activity belongs on the marketplace, not inside the bookstore." }
];

function statusClass(status) {
  return `status status-${status.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function displayPrice(price) {
  if (!price) return "View on Amazon";
  const value = String(price);
  return value.startsWith("$") ? value : `$${value}`;
}

function schemaAuthor(name) {
  const isOrganization = /(books|publishers|publishing|press|media|studio|studios|consulting)$/i.test(name.trim());
  return { "@type": isOrganization ? "Organization" : "Person", name };
}

function bookStructuredData(book) {
  const url = `${baseUrl}/books/${book.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": `${url}#book`,
    name: book.title,
    url,
    author: book.authors.map(schemaAuthor),
    publisher: { "@type": "Organization", name: "Towers Books" },
    genre: book.category,
    inLanguage: book.language,
    ...(book.retailerUrl ? { sameAs: book.retailerUrl } : {})
  };
}

async function BookPage({ book }) {
  const books = await getBooks();
  const related = books.filter((item) => item.slug !== book.slug && ((book.series && item.series === book.series) || item.category === book.category)).slice(0, 3);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookStructuredData(book)) }} />
      <section className="shell section book-detail">
        <div className="detail-cover-wrap"><BookCover book={book} large /></div>
        <div>
          <span className={statusClass(book.status)}>{book.status}</span>
          <h1>{book.title}</h1>
          <p className="book-meta-line">By {book.authors.join(" & ")}</p>
          <p className="publisher-line">{book.category}{book.series ? ` · ${book.series}` : ""} · {book.language}</p>
          {book.audience ? <p className="lead compact">{book.audience}</p> : null}
          {book.formats.length ? (
            <>
              <h2 className="format-heading">Available formats</h2>
              <div className="format-list">
                {book.formats.map((format) => (
                  <a key={format.asin || format.url} className="format-link" href={format.url} target="_blank" rel="noreferrer">
                    <strong>{format.name}</strong><span>{displayPrice(format.price)}</span>
                  </a>
                ))}
              </div>
            </>
          ) : (
            <p className="revision-note">{book.purchaseNote || "This published title is currently being corrected or revised. A purchase link will return when the updated edition is available."}</p>
          )}
          <div className="actions"><Link className="button button-secondary" href="/books">Back to all books</Link></div>
        </div>
      </section>
      {related.length ? (
        <section className="shell section">
          <div className="section-heading"><div><p className="eyebrow">Keep browsing</p><h2>Related titles</h2></div></div>
          <div className="book-grid">{related.map((item) => <BookCard key={item.slug} book={item} />)}</div>
        </section>
      ) : null}
    </>
  );
}

export async function generateMetadata({ params }) {
  const { segments } = await params;
  const [section, slug] = segments || [];
  const books = await getBooks();

  if (section === "books" && slug) {
    const book = books.find((item) => item.slug === slug);
    if (book) {
      const description = `${book.title} by ${book.authors.join(" and ")}. ${book.category}.`;
      const url = `${baseUrl}/books/${book.slug}`;
      return { title: book.title, description, alternates: { canonical: url }, openGraph: { title: book.title, description, url, type: "book" } };
    }
  }

  if (section === "authors" && slug) {
    const author = (await getAuthors()).find((item) => item.slug === slug);
    if (author) return { title: author.name, description: `Published Towers Books titles credited to ${author.name}.`, alternates: { canonical: `${baseUrl}/authors/${slug}` } };
  }

  if (section === "series" && slug) {
    const series = (await getSeries()).find((item) => item.slug === slug);
    if (series) return { title: series.name, description: `Browse ${series.name} titles in the Towers Books catalog.`, alternates: { canonical: `${baseUrl}/series/${slug}` } };
  }

  const pages = {
    books: ["Books", `Browse all ${books.length} published Towers Books titles.`],
    authors: ["Authors", "Browse authors and publishing names represented in the current Towers Books catalog."],
    series: ["Series", "Browse Towers Books series and grouped collections."],
    house: ["From the House of Torres", "The useful sites connected to Towers Books and the House of Torres."],
    shop: ["Shop", "Towers Books merchandise, bundles, and signed-copy storefront status."],
    about: ["About", "Towers Books is the publishing house and catalog front door for books from the House of Torres."],
    privacy: ["Privacy", "Privacy information for TowersBooks.com."]
  };
  if (pages[section]) return { title: pages[section][0], description: pages[section][1], alternates: { canonical: `${baseUrl}/${section}` } };
  return { title: "Towers Books" };
}

export default async function CatchAllPage({ params }) {
  const { segments } = await params;
  const [section, slug] = segments || [];

  if (section === "books" && !slug) {
    const books = await getBooks();
    const linked = books.filter((book) => book.retailerUrl).length;
    return (
      <section className="shell section">
        <p className="eyebrow">Published catalog</p>
        <h1>{books.length} Books</h1>
        <p className="lead compact">Search and filter by title, author, series, subject, language, or format. {linked} titles currently have a direct verified retailer link; titles without one stay browseable without a fake or broken buy button.</p>
        <CatalogClient books={books} />
      </section>
    );
  }

  if (section === "books" && slug) {
    const book = await getBookBySlug(slug);
    if (!book) notFound();
    return <BookPage book={book} />;
  }

  if (section === "authors" && !slug) {
    const authors = await getAuthors();
    return (
      <section className="shell section">
        <p className="eyebrow">Catalog credits</p><h1>Authors</h1>
        <p className="lead compact">These are the author and publishing names actually credited in the current catalog. No invented biographies.</p>
        <div className="website-grid website-grid-page">
          {authors.map((author) => <Link className="website-card" href={`/authors/${author.slug}`} key={author.slug}><span>{author.count} {author.count === 1 ? "title" : "titles"}</span><h2>{author.name}</h2><strong>Browse titles →</strong></Link>)}
        </div>
      </section>
    );
  }

  if (section === "authors" && slug) {
    const author = (await getAuthors()).find((item) => item.slug === slug);
    if (!author) notFound();
    const books = (await getBooks()).filter((book) => book.authors.includes(author.name));
    return (
      <section className="shell section">
        <p className="eyebrow">Author catalog</p><h1>{author.name}</h1>
        <p className="lead compact">{books.length} published {books.length === 1 ? "title is" : "titles are"} currently credited to {author.name} in the Towers Books catalog.</p>
        <div className="book-grid">{books.map((book) => <BookCard key={book.slug} book={book} />)}</div>
      </section>
    );
  }

  if (section === "series" && !slug) {
    const series = await getSeries();
    return (
      <section className="shell section">
        <p className="eyebrow">Read together</p><h1>Series</h1>
        <p className="lead compact">Use series pages to keep related books together without hunting through the full catalog.</p>
        <div className="website-grid website-grid-page">
          {series.map((item) => <Link className="website-card" href={`/series/${item.slug}`} key={item.slug}><span>{item.count} {item.count === 1 ? "title" : "titles"}</span><h2>{item.name}</h2><strong>Open series →</strong></Link>)}
        </div>
      </section>
    );
  }

  if (section === "series" && slug) {
    const item = (await getSeries()).find((entry) => entry.slug === slug);
    if (!item) notFound();
    const books = (await getBooks()).filter((book) => book.series === item.name);
    return (
      <section className="shell section">
        <p className="eyebrow">Series</p><h1>{item.name}</h1>
        <p className="lead compact">{books.length} published {books.length === 1 ? "title" : "titles"} in this catalog series.</p>
        <div className="book-grid">{books.map((book) => <BookCard key={book.slug} book={book} />)}</div>
      </section>
    );
  }

  if (section === "house" && !slug) {
    return (
      <section className="shell section">
        <p className="eyebrow">Connected work</p><h1>From the House of Torres</h1>
        <p className="lead compact">Towers Books is the publishing front door. These sites have separate jobs, so each stays focused instead of being folded into one giant hub.</p>
        <div className="website-grid website-grid-page">
          {houseSites.map((site) => (
            <a className="website-card" href={site.url} target="_blank" rel="noreferrer" key={site.url}>
              <span>{site.label}</span><h2>{site.name}</h2><p><strong>What:</strong> {site.what}</p><p><strong>Who:</strong> {site.who}</p><p><strong>Why:</strong> {site.why}</p><strong>Visit site →</strong>
            </a>
          ))}
        </div>
      </section>
    );
  }

  if (section === "shop" && !slug) {
    return (
      <section className="shell section prose-page">
        <p className="eyebrow">Coming soon</p><h1>Towers Books Shop</h1>
        <p className="lead compact">Planned: shirts, hats, mugs, book goods, bundles, and signed copies.</p>
        <p>Nothing is listed for sale here until the product, price, fulfillment path, and checkout are real. For books available now, use the verified purchase links in the catalog.</p>
        <div className="actions"><Link className="button button-primary" href="/books">Browse books</Link></div>
      </section>
    );
  }

  if (section === "about" && !slug) {
    const books = await getBooks();
    return (
      <section className="shell section prose-page">
        <p className="eyebrow">Publishing house</p><h1>Towers Books</h1>
        <p className="lead compact">Towers Books is the publishing house and catalog front door for {books.length} published titles from the House of Torres.</p>
        <p>The catalog spans practical nonfiction, family publishing, fiction, children's books, journals, puzzles, and specialized series. Individual authors and projects keep their own identities; this site makes the books easier to find without pretending every project is the same brand.</p>
        <p>Purchase links are shown only when a durable retailer path is verified. Connected businesses and public-service sites keep their own transactions and responsibilities.</p>
      </section>
    );
  }

  if (section === "privacy" && !slug) {
    return (
      <section className="shell section prose-page">
        <h1>Privacy</h1>
        <p>TowersBooks.com does not require an account or accept payments on this site today.</p>
        <p>Amazon and other external links open third-party websites governed by their own privacy policies and terms.</p>
      </section>
    );
  }

  notFound();
}
