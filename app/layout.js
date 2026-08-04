import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const baseUrl = "https://masondtorres-com.vercel.app";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Mason Torres | 84 Published Books",
    template: "%s | Mason Torres"
  },
  description: "The complete published catalog of Mason Torres and House of Torres Publishers: 84 books with direct retailer links and current availability.",
  authors: [{ name: "Mason Torres" }],
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Mason Torres | 84 Published Books",
    description: "Faith, family, business, veterans, publishing, AI, timeshare, stories, journals, and puzzle books.",
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
