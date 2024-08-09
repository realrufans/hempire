import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function GET() {


  const txRef = `txref-${uuidv4()}`;

  const response = NextResponse.json({ txRef });

  // Add cache-control headers to prevent caching
  response.headers.set("Cache-Control", "no-store");

  return response;
}
