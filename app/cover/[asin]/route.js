const CACHE_SECONDS = 60 * 60 * 24 * 7;
const RETRY_SECONDS = 60 * 5;
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function imageSources(asin) {
  const encoded = encodeURIComponent(asin);
  return [
    `https://m.media-amazon.com/images/P/${encoded}.01.LZZZZZZZ.jpg`,
    `https://images-na.ssl-images-amazon.com/images/P/${encoded}.01.LZZZZZZZ.jpg`,
    `https://images.amazon.com/images/P/${encoded}.01.LZZZZZZZ.jpg`,
    `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${encoded}&Format=_SL600_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822`
  ];
}

function requestHeaders(accept) {
  return {
    "User-Agent": USER_AGENT,
    Accept: accept,
    "Accept-Language": "en-US,en;q=0.9",
    Referer: "https://www.amazon.com/"
  };
}

async function fetchImage(url) {
  try {
    const response = await fetch(url, {
      headers: requestHeaders("image/avif,image/webp,image/apng,image/*,*/*;q=0.8"),
      redirect: "follow",
      cache: "no-store"
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

function imageResponse(image) {
  return new Response(image.bytes, {
    headers: {
      "Content-Type": image.contentType,
      "Cache-Control": `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`,
      "X-Content-Type-Options": "nosniff"
    }
  });
}

export async function GET(_request, { params }) {
  const { asin: rawAsin } = await params;
  const asin = String(rawAsin || "").toUpperCase();
  if (!/^[A-Z0-9]{10}$/.test(asin)) {
    return new Response("Invalid ASIN", { status: 400 });
  }

  for (const source of imageSources(asin)) {
    const image = await fetchImage(source);
    if (image) return imageResponse(image);
  }

  try {
    const page = await fetch(`https://www.amazon.com/dp/${asin}`, {
      headers: requestHeaders("text/html,application/xhtml+xml"),
      redirect: "follow",
      cache: "no-store"
    });
    if (page.ok) {
      const imageUrl = extractAmazonImage(await page.text());
      if (imageUrl) {
        const image = await fetchImage(imageUrl);
        if (image) return imageResponse(image);
      }
    }
  } catch {
    // BookCover renders a title-based fallback when Amazon blocks image retrieval.
  }

  return new Response("Cover unavailable", {
    status: 404,
    headers: {
      "Cache-Control": `public, max-age=${RETRY_SECONDS}, s-maxage=${RETRY_SECONDS}`,
      "X-Content-Type-Options": "nosniff"
    }
  });
}
