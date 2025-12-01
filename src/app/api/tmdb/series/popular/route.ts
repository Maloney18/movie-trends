// app/api/tmdb/movie/popular/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") ?? "1";

    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${encodeURIComponent(
        page
      )}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.SECRET_API_KEY}`,
        },
      }
    );

    if (!tmdbRes.ok) {
      const text = await tmdbRes.text();
      return new NextResponse(
        JSON.stringify({ error: "TMDB error", detail: text }),
        { status: tmdbRes.status }
      );
    }

    const data = await tmdbRes.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("TMDB proxy error:", err);
    return new NextResponse(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
