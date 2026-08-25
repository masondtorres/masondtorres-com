import "./globals.css";
import "./hub.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const baseUrl = "https://masondtorres.com";
const defaultTitle = "Mason Torres | Books, Projects & Resources";
const defaultDescription = "Books, active projects, family publishing work, veteran resources, business tools, websites, and free resources from Mason Torres and House of Torres Publishers.";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultTitle,
    template: "%s | Mason Torres"
  },
  description: defaultDescription,
  authors: [{ name: "Mason Torres" }],
  alternates: { canonical: baseUrl },
  openGraph: {
    title: defaultTitle,
    description: "Books, projects, family publishing, veteran resources, business tools, websites, and free resources.",
    url: baseUrl,
    siteName: "Mason Torres",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mason Torres — Books, Projects & Resources"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: "Books, projects, family publishing, veteran resources, business tools, websites, and free resources.",
    images: ["/opengraph-image"]
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Mason Torres",
      url: baseUrl,
      description: "Author, entrepreneur, operator and U.S. Air Force veteran."
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Mason Torres",
      description: defaultDescription,
      publisher: { "@id": `${baseUrl}/#person` }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
