import { NextResponse } from "next/server";

export async function GET(
  req: Request,
) {

  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.SECRET_API_KEY}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Failed to fetch top rated movies` },
      { status: 500 }
    );
  }

  return NextResponse.json(await res.json());
}
