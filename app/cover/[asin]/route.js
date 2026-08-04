const CACHE_SECONDS = 60 * 60 * 24 * 7;
const USER_AGENT = "Mozilla/5.0 (compatible; MasonTorresBooks/1.0; +https://masondtorres-com.vercel.app)";

function imageSources(asin) {
  const encoded = encodeURIComponent(asin);
  return [
    `https://images.amazon.com/images/P/${encoded}.01.LZZZZZZZ.jpg`,
    `https://images-na.ssl-images-amazon.com/images/P/${encoded}.01.LZZZZZZZ.jpg`,
    `https://m.media-amazon.com/images/P/${encoded}.01.LZZZZZZZ.jpg`,
    `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${encoded}&Format=_SL600_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822`
  ];
}

async function fetchImage(url) {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8" },
      redirect: "follow",
      next: { revalidate: CACHE_SECONDS }
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.startsWith("image/")) return null;
    const bytes = await response.arrayBuffer();
    if (bytes.byteLength < 500) return null;
    return { bytes, contentType };
  } catch {
    return null;
  }
}

function extractAmazonImage(html) {
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /"hiRes"\s*:\s*"([^"]+)"/i,
    /"large"\s*:\s*"([^"]+)"/i,
    /id=["']landingImage["'][^>]+data-old-hires=["']([^"']+)["']/i,
    /id=["']landingImage["'][^>]+src=["']([^"']+)["']/i
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1].replace(/\\u0026/g, "&").replace(/\\\//g, "/");
  }
  return null;
}

export async function GET(_request, { params }) {
  const { asin: rawAsin } = await params;
  const asin = String(rawAsin || "").toUpperCase();
  if (!/^[A-Z0-9]{10}$/.test(asin)) {
    return new Response("Invalid ASIN", { status: 400 });
  }

  for (const source of imageSources(asin)) {
    const image = await fetchImage(source);
    if (image) {
      return new Response(image.bytes, {
        headers: {
          "Content-Type": image.contentType,
          "Cache-Control": `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`,
          "X-Content-Type-Options": "nosniff"
        }
      });
    }
  }

  try {
    const page = await fetch(`https://www.amazon.com/dp/${asin}`, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml" },
      redirect: "follow",
      next: { revalidate: CACHE_SECONDS }
    });
    if (page.ok) {
      const imageUrl = extractAmazonImage(await page.text());
      if (imageUrl) {
        const image = await fetchImage(imageUrl);
        if (image) {
          return new Response(image.bytes, {
            headers: {
              "Content-Type": image.contentType,
              "Cache-Control": `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`,
              "X-Content-Type-Options": "nosniff"
            }
          });
        }
      }
    }
  } catch {
    // The visible title fallback remains available when Amazon blocks image retrieval.
  }

  return new Response("Cover unavailable", {
    status: 404,
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" }
  });
}
