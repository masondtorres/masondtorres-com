import "./globals.css";
import "./hub.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const baseUrl = "https://towersbooks.com";
const defaultTitle = "Towers Books | Books from the House of Torres";
const defaultDescription = "Browse the Towers Books catalog by title, author, series, subject, language, and format. Practical nonfiction, family publishing, fiction, journals, puzzles, and connected House of Torres projects.";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultTitle,
    template: "%s | Towers Books"
  },
  description: defaultDescription,
  creator: "Towers Books",
  publisher: "Towers Books",
  alternates: { canonical: baseUrl },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: baseUrl,
    siteName: "Towers Books",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Towers Books" }]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/opengraph-image"]
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#publisher`,
      name: "Towers Books",
      url: baseUrl
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Towers Books",
      description: defaultDescription,
      publisher: { "@id": `${baseUrl}/#publisher` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${baseUrl}/books?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
