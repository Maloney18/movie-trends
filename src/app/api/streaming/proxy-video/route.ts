// app/api/streaming/proxy-video/route.ts
import { NextResponse } from "next/server";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

    // Fetch the embed page HTML
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch embed page" }, { status: res.status });
    }

    const html = await res.text();

    // Parse HTML with cheerio
    const $ = cheerio.load(html);

    // Example: try to extract <source> inside <video>, or .m3u8 URL in JS
    let videoUrl: string | null = null;

    // Look for iframe tags
    const iframeSrc = $("iframe#player_iframe").attr('src');
    
    if (!iframeSrc) {
      return NextResponse.json({ error: "Could not find video iframe" }, { status: 404 });
    }

    const fullIframeSrc = iframeSrc.startsWith("//") ? `https:${iframeSrc}` : iframeSrc;

    // console.log(fullIframeSrc)
    
    return NextResponse.json({ iframe: fullIframeSrc });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
