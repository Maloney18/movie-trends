import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ endpoint: string; id: string }> }
) {
  const { endpoint, id } = await params;

  // console.log(params.endpoint, params.id)

  const extra = new URL(req.url).searchParams.get("extra");
  const path = extra ? `/${extra}` : "";

  const url = `https://api.themoviedb.org/3/${endpoint}/${id}${path}?language=en-US`;

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.SECRET_API_KEY}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Failed to fetch details for ${endpoint}/${id}` },
      { status: 500 }
    );
  }

  return NextResponse.json(await res.json());
}
