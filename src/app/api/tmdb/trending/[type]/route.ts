// app/api/tmdb/trending/[type]/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ type: string }>}) {
  const {type} = await params
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.SECRET_API_KEY}`,
      }
    }
  );

  return NextResponse.json(await response.json());
}
