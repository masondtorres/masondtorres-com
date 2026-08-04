import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const baseUrl = "https://masondtorres-com.vercel.app";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Mason Torres | Practical Books Built from Real Life",
    template: "%s | Mason Torres"
  },
  description: "Published books by Mason Torres about faith, family, business, artificial intelligence, timeshare, and fiction.",
  authors: [{ name: "Mason Torres" }],
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Mason Torres",
    description: "Practical books built from real life.",
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
