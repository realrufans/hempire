import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function GET() {
  console.log('hello from server')
  const txRef = `txref-${uuidv4()}`;
  return NextResponse.json({ txRef });
}
