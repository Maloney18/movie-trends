import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const quality = searchParams.get("quality");
    const uid = searchParams.get("uid");

    const res = await fetch(
      `https://jericoder-m3u8-movie-downloader-middleware.hf.space/download/${id}/${quality}/${uid}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return new NextResponse(
        JSON.stringify({ error: "Download error", detail: text }),
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Download error:", err);
    return new NextResponse(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
