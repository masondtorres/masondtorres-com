import Link from "next/link";
import { getBooks } from "@/lib/catalog";
import { featuredProjects, websites } from "@/lib/projects";
import { BookCard } from "@/components/BookCard";

export default async function HomePage() {
  const books = await getBooks();
  const publishedBookCount = books.length;
  const featured = books.filter((book) => book.featured && book.status === "Available Now").slice(0, 3);

  return (
    <>
      <section className="hero hero-home">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow">Mason Torres · House of Torres Publishers</p>
            <h1>Books, businesses, websites, and projects built to do real work.</h1>
            <p className="lead">
              This is the home base for the books I publish, the projects I am building, the sites connected to that work, and the books my family is creating with me.
            </p>
            <div className="actions">
              <Link className="button button-primary" href="/books">Browse books</Link>
              <Link className="button button-secondary" href="/projects">See current projects</Link>
              <Link className="button button-secondary" href="/websites">Visit the sites</Link>
            </div>
          </div>
          <div className="hero-panel" aria-label="Current work at a glance">
            <strong>{publishedBookCount}</strong>
            <span>published books in the catalog</span>
            <hr />
            <strong>{featuredProjects.length}+</strong>
            <span>current books and project lanes featured here</span>
            <hr />
            <strong>{websites.length}</strong>
            <span>public project websites connected now</span>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Published catalog</p>
            <h2>Featured books</h2>
          </div>
          <Link className="text-link" href="/books">View all {publishedBookCount}</Link>
        </div>
        <div className="book-grid">
          {featured.map((book) => <BookCard key={book.slug} book={book} />)}
        </div>
      </section>

      <section className="section section-contrast">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Updated August 13, 2026</p>
              <h2>Newest books & projects</h2>
            </div>
            <Link className="text-link" href="/projects">View all projects</Link>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <article className="project-card" key={project.slug}>
                <div className="project-topline">
                  <span>{project.type}</span>
                  <span>{project.status}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {project.note ? <p className="project-note">{project.note}</p> : null}
                {project.website ? <a className="text-link" href={project.website} target="_blank" rel="noreferrer">Visit {project.websiteLabel}</a> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Connected work</p>
            <h2>Websites</h2>
          </div>
          <Link className="text-link" href="/websites">See all websites</Link>
        </div>
        <div className="website-grid">
          {websites.map((site) => (
            <a className="website-card" href={site.url} target="_blank" rel="noreferrer" key={site.url}>
              <span>{site.label}</span>
              <h3>{site.name}</h3>
              <p>{site.description}</p>
              <strong>Visit site →</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="section family-band">
        <div className="shell family-band-inner">
          <div>
            <p className="eyebrow">Family publishing</p>
            <h2>The work is bigger than one author.</h2>
            <p className="lead compact">McGree Kids, McKenzie's Books, Amalia's Books, Callista Fiction, Abel Fiction, and other family projects have their own place in the larger publishing work.</p>
          </div>
          <Link className="button button-primary" href="/projects#family-publishing">See family projects</Link>
        </div>
      </section>
    </>
  );
}
