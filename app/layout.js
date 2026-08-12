import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const baseUrl = "https://masondtorres.com";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Mason Torres | Books, Projects & Resources",
    template: "%s | Mason Torres"
  },
  description: "Books, active projects, family publishing work, veteran resources, business tools, websites, and free resources from Mason Torres and House of Torres Publishers.",
  authors: [{ name: "Mason Torres" }],
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Mason Torres | Books, Projects & Resources",
    description: "Books, projects, family publishing, veteran resources, business tools, websites, and free resources.",
    url: baseUrl,
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
