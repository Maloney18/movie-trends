import { NextResponse } from "next/server";

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export async function GET(req: Request) {
  const query = new URL(req.url).searchParams.get("q");

  const url = `${BASE_URL}?part=snippet&q=${query}&type=video&key=${process.env.YOUTUBE_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch YouTube video" },
      { status: 500 }
    );
  }

  const data = await res.json();

  if (!data.items?.length) {
    return NextResponse.json(
      { error: "No video found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
