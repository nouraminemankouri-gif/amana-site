import { signOut } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await signOut({ redirect: false }).catch(() => null);
  const url = new URL("/", req.url);
  return NextResponse.redirect(url);
}
