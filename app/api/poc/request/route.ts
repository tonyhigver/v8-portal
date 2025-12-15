import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // TODO: forward to backend
  console.log("POC request:", body);

  return NextResponse.json({ ok: true });
}
