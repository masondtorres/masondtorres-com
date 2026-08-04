export type Author = { id: string; slug: string; name: string; role: string; shortBio: string; visibility: "public" | "private"; };
export const authors: Author[] = [
  { id: "a001", slug: "mason-torres", name: "Mason Torres", role: "Author", shortBio: "Mason Torres is an author, entrepreneur, operator, and father of 13. He writes books that help people know God, love their families, think bigger, and build something real. His work spans faith, fatherhood, veterans, AI, publishing, business, sales, real estate, timeshare, and fiction. He publishes under House of Torres Publishers and Towers Books.", visibility: "public" },
  { id: "a002", slug: "eric-gibby", name: "Eric Gibby", role: "Coauthor", shortBio: "Eric Gibby is a coauthor on the Independent Auto Dealer's Playbook series.", visibility: "public" }
];
export function getAuthorBySlug(slug: string) { return authors.find(a => a.slug === slug && a.visibility === "public"); }
export function getPublicAuthors() { return authors.filter(a => a.visibility === "public"); }
