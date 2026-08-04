export const publishedBookCount = 84;

export const books = [
  {
    slug: "the-curse-of-the-posted-note",
    title: "The Curse of the Posted Note",
    subtitle: "An Office Horror Story",
    authors: ["Mason Torres"],
    publisher: "Towers Books",
    series: "Fiction",
    status: "Available Now",
    description: "A slow-burn office horror story about silence, buried decisions, and the cost of looking the other way when something is clearly wrong.",
    retailerLabel: "Buy at Walmart",
    retailerUrl: "https://www.walmart.com/ip/20128056276",
    featured: true
  },
  {
    slug: "the-house-that-holds",
    title: "The House That Holds",
    subtitle: "A Man's Daily System for Faith, Family, and a Legacy That Cannot Be Shaken",
    authors: ["Mason Torres"],
    publisher: "Towers Books",
    series: "Faith and Family",
    status: "Available Now",
    description: "A practical daily system for men who want to lead their homes with steadiness, conviction, and habits that last.",
    retailerLabel: "Find on Amazon",
    retailerUrl: "https://www.amazon.com/s?k=%22The+House+That+Holds%22+%22Mason+Torres%22",
    featured: true
  },
  {
    slug: "build-a-family-business-in-20-days",
    title: "Build a Family Business in 20 Days",
    subtitle: "How to Launch, Get Customers, and Make Your First Income with Your Kids",
    authors: ["Mason Torres"],
    publisher: "Towers Books",
    series: "Business",
    status: "Available Now",
    description: "A step-by-step plan for turning a practical idea into a small family business without a large budget, advanced technology, or prior experience.",
    retailerLabel: "Find on Amazon",
    retailerUrl: "https://www.amazon.com/s?k=9798254959960",
    featured: true
  },
  {
    slug: "timeshare-cashflow",
    title: "Timeshare Cashflow",
    subtitle: "The Ultimate Timeshare Rental Secrets Manual for Maximum Profit",
    authors: ["Mason Torres"],
    publisher: "Towers Books",
    series: "Timeshare",
    status: "Available Now",
    description: "A practical guide to renting unused timeshare stays, choosing platforms, pricing bookings, handling guests, and protecting the transaction.",
    retailerLabel: "Find on Amazon",
    retailerUrl: "https://www.amazon.com/s?k=%22Timeshare+Cashflow%22+%22Mason+Torres%22",
    featured: false
  },
  {
    slug: "from-kitchen-table-to-cashflow",
    title: "From Kitchen Table to Cashflow",
    subtitle: "How to Launch Your First AI-Powered Business in 6 Days",
    authors: ["Mason Torres"],
    publisher: "Towers Books",
    series: "AI and Business",
    status: "Available Now",
    description: "A beginner-friendly six-day path for choosing an idea, using AI tools, creating an offer, launching, and finding the first customers.",
    retailerLabel: "Find on Amazon",
    retailerUrl: "https://www.amazon.com/s?k=%22From+Kitchen+Table+to+Cashflow%22+%22Mason+Torres%22",
    featured: false
  },
  {
    slug: "chloe-and-the-secret-meadow",
    title: "Chloe and the Secret Meadow",
    subtitle: "A Heartwarming Children's Story About Friendship, Horses, and Magical Adventures",
    authors: ["Mason Torres", "Boaz Valor"],
    publisher: "Towers Books",
    series: "Children's Fiction",
    status: "Available Now",
    description: "A gentle children's adventure about friendship, courage, horses, and the discovery of a secret meadow.",
    retailerLabel: "Find on Amazon",
    retailerUrl: "https://www.amazon.com/s?k=%22Chloe+and+the+Secret+Meadow%22",
    featured: false
  },
  {
    slug: "surviving-chaos",
    title: "Surviving Chaos",
    subtitle: "Big Family, Wild Laughs, and the Dog That Fought a Bear",
    authors: ["Mason Torres", "Abel Torres"],
    publisher: "Towers Books",
    series: "Family Stories",
    status: "Available Now",
    description: "A family story filled with disorder, humor, hard-earned lessons, and the unforgettable dog at the center of it all.",
    retailerLabel: "Find on Amazon",
    retailerUrl: "https://www.amazon.com/s?k=%22Surviving+Chaos%22+%22Mason+Torres%22",
    featured: false
  }
];

export function bookBySlug(slug) {
  return books.find((book) => book.slug === slug);
}
