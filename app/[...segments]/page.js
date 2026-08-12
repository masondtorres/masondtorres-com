import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogClient } from "@/components/CatalogClient";
import { books, bookBySlug, publishedBookCount } from "@/lib/data";
import { projects, websites } from "@/lib/projects";
import { BookCover } from "@/components/BookCover";

const baseUrl = "https://masondtorres.com";

function statusClass(status) {
  return `status status-${status.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function displayPrice(price) {
  if (!price) return "View on Amazon";
  const value = String(price);
  return value.startsWith("$") ? value : `$${value}`;
}

function BookPage({ book }) {
  return (
    <section className="shell section book-detail">
      <div className="detail-cover-wrap"><BookCover book={book} large /></div>
      <div>
        <span className={statusClass(book.status)}>{book.status}</span>
        <h1>{book.title}</h1>
        <p className="book-meta-line">By {book.authors.join(" & ")}</p>
        {book.series && book.series !== book.category ? <p className="publisher-line">Series: {book.series}</p> : null}

        {book.formats.length ? (
          <>
            <h2 className="format-heading">Available formats</h2>
            <div className="format-list">
              {book.formats.map((format) => (
                <a key={format.asin} className="format-link" href={format.url} target="_blank" rel="noreferrer">
                  <strong>{format.name}</strong>
                  <span>{displayPrice(format.price)}</span>
                </a>
              ))}
            </div>
          </>
        ) : (
          <p className="revision-note">This published title is currently being corrected or revised. A purchase link will return when the updated edition is available.</p>
        )}

        <div className="actions"><Link className="button button-secondary" href="/books">Back to all books</Link></div>
      </div>
    </section>
  );
}

export async function generateMetadata({ params }) {
  const { segments } = await params;
  const [section, slug] = segments || [];

  if (section === "books" && slug) {
    const book = bookBySlug(slug);
    if (book) return {
      title: book.title,
      description: `${book.title} by ${book.authors.join(" and ")}. ${book.status}.`,
      alternates: { canonical: `${baseUrl}/books/${book.slug}` }
    };
  }

  const pages = {
    books: ["Books", `${publishedBookCount} published books by Mason Torres, House of Torres Publishers, and collaborators.`],
    projects: ["Projects", "Current books, series, family publishing projects, websites, and other work in development."],
    websites: ["Websites", "Public websites connected to Mason Torres projects and House of Torres publishing work."],
    resources: ["Catalog & Free Resources", "Find free resources and request information about the House of Torres book catalog."],
    about: ["About Mason Torres", `Mason Torres is an author of ${publishedBookCount} published books, entrepreneur, operator, U.S. Air Force veteran, husband, and father of 13.`],
    privacy: ["Privacy", "Privacy information for masondtorres.com."]
  };

  if (pages[section]) return {
    title: pages[section][0],
    description: pages[section][1],
    alternates: { canonical: `${baseUrl}/${section}` }
  };

  return { title: "Mason Torres" };
}

export default async function CatchAllPage({ params }) {
  const { segments } = await params;
  const [section, slug] = segments || [];

  if (section === "books" && !slug) {
    const available = books.filter((book) => book.status === "Available Now").length;
    const updating = books.length - available;
    return (
      <section className="shell section">
        <p className="eyebrow">Published catalog</p>
        <h1>{publishedBookCount} Books</h1>
        <p className="lead compact">{available} titles currently have direct Amazon links. {updating} published titles are being revised or corrected.</p>
        <CatalogClient books={books} />
      </section>
    );
  }

  if (section === "books" && slug) {
    const book = bookBySlug(slug);
    if (!book) notFound();
    return <BookPage book={book} />;
  }

  if (section === "projects" && !slug) {
    const familyStart = projects.findIndex((project) => project.slug === "mcgree-kids");
    return (
      <section className="shell section">
        <p className="eyebrow">Current work</p>
        <h1>Projects</h1>
        <p className="lead compact">Some of this work is published. Some is being written, rebuilt, tested, or prepared for release. Working titles can change.</p>
        <div className="project-grid project-grid-page">
          {projects.map((project, index) => (
            <article className="project-card" id={index === familyStart ? "family-publishing" : undefined} key={project.slug}>
              <div className="project-topline"><span>{project.type}</span><span>{project.status}</span></div>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              {project.note ? <p className="project-note">{project.note}</p> : null}
              {project.website ? <a className="text-link" href={project.website} target="_blank" rel="noreferrer">Visit {project.websiteLabel}</a> : null}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section === "websites" && !slug) {
    return (
      <section className="shell section">
        <p className="eyebrow">Public sites</p>
        <h1>Websites</h1>
        <p className="lead compact">These sites carry parts of the work that do not belong on one author page.</p>
        <div className="website-grid website-grid-page">
          {websites.map((site) => (
            <a className="website-card" href={site.url} target="_blank" rel="noreferrer" key={site.url}>
              <span>{site.label}</span><h2>{site.name}</h2><p>{site.description}</p><strong>Visit site →</strong>
            </a>
          ))}
        </div>
      </section>
    );
  }

  if (section === "resources" && !slug) {
    return (
      <section className="shell section resources-page">
        <p className="eyebrow">Catalog & free resources</p>
        <h1>Looking for a book or something useful?</h1>
        <p className="lead">Start with the full book catalog or use the free public resources below. A direct request form for a printed or emailed catalog will be connected here once the public contact destination is approved.</p>

        <div className="resource-grid">
          <article className="resource-card">
            <h2>Book Catalog</h2>
            <p>Browse the full published catalog, search by title, author, series, or subject, and follow direct retailer links where available.</p>
            <Link className="button button-primary" href="/books">Browse the catalog</Link>
          </article>
          <article className="resource-card">
            <h2>Veteran Resources</h2>
            <p>Use Vols4Vets for veteran-focused information, practical next steps, and the growing field-manual project.</p>
            <a className="button button-primary" href="https://vols4vets.com" target="_blank" rel="noreferrer">Go to Vols4Vets</a>
          </article>
          <article className="resource-card">
            <h2>Auto Dealer Resources</h2>
            <p>Follow the Independent Auto Dealer's Playbook project and dealer resources at GT Playbook.</p>
            <a className="button button-primary" href="https://gtplaybook.com" target="_blank" rel="noreferrer">Go to GT Playbook</a>
          </article>
          <article className="resource-card">
            <h2>Smokies Resources</h2>
            <p>Use Smoky Insider for current trip-planning information and resources tied to the Smokies guide project.</p>
            <a className="button button-primary" href="https://smokyinsider.com" target="_blank" rel="noreferrer">Go to Smoky Insider</a>
          </article>
        </div>

        <div className="request-box" id="request">
          <p className="eyebrow">Request a catalog</p>
          <h2>Want the catalog or new free resources when they are available?</h2>
          <p>The request link belongs here. I am not publishing a guessed email address. Once the approved public email or form is connected, this box becomes the request form.</p>
        </div>
      </section>
    );
  }

  if (section === "about" && !slug) {
    return (
      <section className="shell section prose-page about-page">
        <p className="eyebrow">About</p>
        <h1>Mason Torres</h1>
        <p className="lead compact">Mason Torres is an author of {publishedBookCount} published books, entrepreneur, operator, U.S. Air Force veteran, husband, and father of 13.</p>
        <p>Most of the work on this site comes from things I have actually had to do: raise a large family, build businesses, work in sales, serve veterans, publish books, recover from financial pressure, and build systems that make the next job easier.</p>
        <p>The catalog covers faith and family, business, veterans, publishing, artificial intelligence, timeshare, fiction, children's books, journals, and puzzle books. The Projects page also shows work still being built, including books by my kids and family projects that have their own voice and identity.</p>
        <div className="actions"><Link className="button button-primary" href="/books">Browse books</Link><Link className="button button-secondary" href="/projects">See projects</Link></div>
      </section>
    );
  }

  if (section === "privacy" && !slug) {
    return (
      <section className="shell section prose-page">
        <h1>Privacy</h1>
        <p>This website does not require an account or accept payments. If a request form is added later, this page will be updated before that form is made public.</p>
        <p>Amazon and other external links open third-party websites governed by their own privacy policies and terms.</p>
      </section>
    );
  }

  notFound();
}
