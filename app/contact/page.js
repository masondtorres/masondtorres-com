export const metadata = {
  title: "Contact",
  description: "Contact Mason Torres for public and business inquiries.",
  alternates: { canonical: "https://masondtorres.com/contact" },
  openGraph: {
    title: "Contact Mason Torres",
    description: "Contact Mason Torres for public and business inquiries.",
    url: "https://masondtorres.com/contact"
  }
};

export default function ContactPage() {
  return (
    <section className="shell section prose-page">
      <p className="eyebrow">Contact</p>
      <h1>Contact Mason Torres</h1>
      <p className="lead compact">
        For public and business inquiries, email <a href="mailto:masondtorres@duck.com">masondtorres@duck.com</a>.
      </p>
    </section>
  );
}
