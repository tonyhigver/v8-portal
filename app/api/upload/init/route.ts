import { NextResponse } from "next/server";

export async function POST() {
  // TODO: request signed URL from backend
  return NextResponse.json({
    uploadUrl: "https://example.com",
  });
}
