import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") === "ar" ? "ar" : "en";

  try {
    const rssUrl =
      lang === "ar"
        ? "https://news.google.com/rss/search?q=قطر+اقتصاد+OR+أخبار+قطر&hl=ar&gl=QA&ceid=QA:ar"
        : "https://news.google.com/rss/search?q=Qatar+News+OR+Business+OR+Economy&hl=en-QA&gl=QA&ceid=QA:en";

    const response = await fetch(rssUrl, { next: { revalidate: 3600 } });
    const xmlText = await response.text();

    const titleMatches = [...xmlText.matchAll(/<item>[\s\S]*?<title>(.*?)<\/title>/g)];

    const articles = titleMatches.slice(0, 10).map((match, index) => {
      const cleanTitle = match[1]
        .replace(/<!\[CDATA\[|\]\]>/g, "")
        .split(" - ")[0]
        .trim();

      return {
        id: `news-${lang}-${index}`,
        text: cleanTitle,
        type: "news",
      };
    });

    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ articles: [] }, { status: 500 });
  }
}