import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  metadataBase: new URL("https://masondtorres.com"),
  title: {
    default: "Mason Torres | Books for Faith, Family, Work and Building Something Real",
    template: "%s | Mason Torres"
  },
  description: "The official book platform for Mason Torres and House of Torres Publishers.",
  openGraph: {
    title: "Mason Torres",
    description: "Books for faith, family, work and building something real.",
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
